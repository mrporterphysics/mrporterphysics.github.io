#!/usr/bin/env python3
"""
Site health checker for mrporterphysics.github.io.

Three checks:
  1. LINK    - every internal link resolves to something that will actually be served.
  2. STALE   - a linked deck has a newer year-suffixed sibling on disk (e.g. links
               APEnergy2025.html while APEnergy2026.html exists).
  3. UNBUILT - a Marp source (*.md with `marp: true`) has no exported .html sibling.

Runs in two modes:
  --site _site   check a built Jekyll site (what CI does)
  (default)      check the source tree, emulating Jekyll's output mapping.
                 Lets you run it locally without Ruby/Jekyll installed.

Exit codes: 0 = clean (or warnings only), 1 = LINK failures and --strict given.

Usage:
  python3 scripts/check-site.py                 # source mode, warnings only
  python3 scripts/check-site.py --strict        # fail on dead links
  python3 scripts/check-site.py --site _site --strict
"""
import argparse, os, re, sys
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse

# Paths whose .md files are Marp sources: _config.yml sets `published: false`
# for these, so a .md here does NOT produce a page. Only real .html is served.
MARP_TREES = ("Presentations", "Daily Plan")

SKIP_DIRS = {".git", "_site", "node_modules", ".jekyll-cache", "worktrees", ".claude"}


class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for attr in ("href", "src"):
            if attr in d and d[attr]:
                self.links.append(d[attr])


def walk(root, exts):
    for dirpath, dirnames, filenames in os.walk(root):
        # Skip dot-dirs and Jekyll's underscore dirs (_includes/_layouts hold raw
        # Liquid templates, not served pages -- their {{ }} would read as dead links).
        dirnames[:] = [d for d in dirnames
                       if d not in SKIP_DIRS
                       and not d.startswith(".")
                       and not (d.startswith("_") and d != "_site")]
        for fn in filenames:
            if fn.lower().endswith(exts):
                yield os.path.join(dirpath, fn)


def is_internal(url):
    if not url or url.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return False
    p = urlparse(url)
    return not p.scheme and not p.netloc


def in_marp_tree(rel):
    rel = rel.replace(os.sep, "/")
    return any(rel == t or rel.startswith(t + "/") for t in MARP_TREES)


def resolve(root, target, source_mode):
    """Return True if `target` (repo-relative, decoded, no leading /) will be served."""
    cands = [target]
    if target.endswith("/") or target == "":
        cands = [target + "index.html", target + "index.md"]
    elif not os.path.splitext(target)[1]:
        cands = [target, target + ".html", target + ".md", target + "/index.html", target + "/index.md"]
    elif target.endswith(".html"):
        # Jekyll also serves foo.html generated from foo.md
        cands = [target, target[:-5] + ".md"]

    for c in cands:
        full = os.path.join(root, c)
        if not os.path.exists(full):
            continue
        if source_mode and c.endswith(".md") and in_marp_tree(c):
            # published:false - this source does not become a page
            continue
        if os.path.isdir(full):
            continue
        return True
    return False


YEAR_RE = re.compile(r"^(.*?)(\d{4})(-\d{2})?$")


def check_stale(repo, linked_html):
    """linked_html: set of repo-relative .html paths that pages link to."""
    out = []
    for rel in sorted(linked_html):
        d, fn = os.path.split(rel)
        stem = os.path.splitext(fn)[0]
        m = YEAR_RE.match(stem)
        if not m:
            continue
        prefix, year = m.group(1), int(m.group(2))
        if not prefix or year < 2000 or year > 2100:
            continue
        srcdir = os.path.join(repo, d)
        if not os.path.isdir(srcdir):
            continue
        best, best_name = year, None
        for sib in os.listdir(srcdir):
            if not sib.lower().endswith(".html"):
                continue
            sm = YEAR_RE.match(os.path.splitext(sib)[0])
            if not sm or sm.group(1) != prefix:
                continue
            y = int(sm.group(2))
            if y > best:
                best, best_name = y, sib
        if best_name:
            out.append((rel, best_name))
    return out


def check_unbuilt(repo):
    out = []
    for md in walk(repo, (".md",)):
        rel = os.path.relpath(md, repo)
        if not in_marp_tree(rel):
            continue
        try:
            with open(md, encoding="utf-8", errors="replace") as fh:
                head = fh.read(400)
        except OSError:
            continue
        if not re.search(r"^marp:\s*true\s*$", head, re.M):
            continue
        if not os.path.exists(os.path.splitext(md)[0] + ".html"):
            out.append(rel)
    return out



MD_LINK_RE = re.compile(r"\]\(\s*([^)]+?)\s*\)")
HTML_HREF_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.I)
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)


def split_commented(text):
    """Return (live_text, commented_text). presindex.md hides not-yet-taught units
    in HTML comments; those links still need checking before they are revealed."""
    commented = "".join(COMMENT_RE.findall(text))
    live = COMMENT_RE.sub(" ", text)
    return live, commented


def links_from_markdown(text):
    out = []
    for m in MD_LINK_RE.finditer(text):
        raw = m.group(1)
        # strip an optional kramdown title:  ](/path "Title")
        if '"' in raw:
            raw = raw.split('"')[0].strip()
        out.append(raw)
    out.extend(HTML_HREF_RE.findall(text))
    return out


def norm_target(path, pagedir):
    if not path:
        return None
    if path.startswith("/"):
        target = path.lstrip("/")
    else:
        target = os.path.normpath(os.path.join(pagedir, path))
    if target.startswith(".."):
        return None
    # GitHub Pages strips a leading /<repo>/ on user sites
    if target.startswith("mrporterphysics.github.io/"):
        target = target[len("mrporterphysics.github.io/"):]
    return target


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", help="path to built _site (CI mode)")
    ap.add_argument("--repo", default=".", help="repo root")
    ap.add_argument("--strict", action="store_true", help="exit 1 on dead links")
    a = ap.parse_args()

    repo = os.path.abspath(a.repo)
    scan_root = os.path.abspath(a.site) if a.site else repo
    source_mode = a.site is None

    dead, linked_html = [], set()

    commented_dead = []

    exts = (".html", ".htm") if not source_mode else (".html", ".htm", ".md")
    for page in walk(scan_root, exts):
        # Only follow links out of real Jekyll pages, not exported slide decks:
        # decks link to their own local assets with paths that only make sense
        # inside the deck, and there are ~200 of them.
        rel_page = os.path.relpath(page, scan_root)
        if in_marp_tree(rel_page):
            continue
        try:
            with open(page, encoding="utf-8", errors="replace") as fh:
                html = fh.read()
        except OSError:
            continue
        pagedir = os.path.dirname(rel_page)

        if rel_page.lower().endswith(".md"):
            live_txt, cmt_txt = split_commented(html)
            raw_links = links_from_markdown(live_txt)
            cmt_links = links_from_markdown(cmt_txt)
        else:
            ex = LinkExtractor()
            try:
                ex.feed(html)
            except Exception:
                continue
            raw_links = ex.links
            cmt_links = []

        for raw in cmt_links:
            if not is_internal(raw):
                continue
            t = norm_target(unquote(urlparse(raw).path), pagedir)
            if t is None:
                continue
            if not resolve(scan_root, t, source_mode):
                commented_dead.append((rel_page, raw))
            elif t.endswith(".html"):
                linked_html.add(t)

        for raw in raw_links:
            if not is_internal(raw):
                continue
            target = norm_target(unquote(urlparse(raw).path), pagedir)
            if target is None:
                continue
            if not resolve(scan_root, target, source_mode):
                dead.append((rel_page, raw))
            if target.endswith(".html"):
                linked_html.add(target)

    stale = check_stale(repo, linked_html)
    unbuilt = check_unbuilt(repo)

    print(f"mode: {'source tree' if source_mode else 'built site'}  root: {scan_root}")
    print(f"pages scanned for links: (Jekyll pages only, slide decks skipped)\n")

    print(f"== LINK: {len(dead)} dead internal link(s) ==")
    for pg, url in dead:
        print(f"  {pg}  ->  {url}")
    if not dead:
        print("  none")

    print(f"\n== COMMENTED: {len(commented_dead)} link(s) inside <!-- --> that would break if revealed ==")
    for pg, url in commented_dead:
        print(f"  {pg}  ->  {url}")
    if not commented_dead:
        print("  none")

    print(f"\n== STALE: {len(stale)} link(s) with a newer deck available ==")
    for rel, newer in stale:
        print(f"  {rel}  ->  newer sibling: {newer}")
    if not stale:
        print("  none")

    print(f"\n== UNBUILT: {len(unbuilt)} Marp source(s) with no exported .html ==")
    for rel in unbuilt:
        print(f"  {rel}")
    if not unbuilt:
        print("  none")

    if dead and a.strict:
        print("\nFAIL: dead internal links (--strict)")
        return 1
    print("\nOK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
