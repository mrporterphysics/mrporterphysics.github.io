/*
 * Magazine theme — Deckset-style autoscaling
 *
 * Shrinks a slide's font-size when its content would overflow the
 * slide box, preserving the h1/h2/h3/body size ratios because all
 * type in magazine.css is expressed in `em`.
 *
 * Usage (in a Marp deck):
 *
 *   ---
 *   marp: true
 *   theme: magazine
 *   html: true
 *   ---
 *
 *   <script src="path/to/magazine-autoscale.js"></script>
 *
 * Opt a single slide out with:
 *
 *   <!-- _class: no-autoscale -->
 *
 * on that slide's frontmatter-directive line.
 */
(function () {
    'use strict';

    var SAFETY_MARGIN   = 0.97;   // leave a hairline of room
    var MIN_FONT_SIZE   = 8;      // px floor
    var MAX_ITERATIONS  = 4;      // how many shrink passes per slide

    function fit(section) {
        if (!section || section.classList.contains('no-autoscale')) return;

        // Reset any previous inline size so we start from the theme default
        section.style.fontSize = '';

        var computed = parseFloat(window.getComputedStyle(section).fontSize);
        if (!computed || !isFinite(computed)) return;

        var current = computed;

        for (var i = 0; i < MAX_ITERATIONS; i++) {
            var ch = section.clientHeight;
            var cw = section.clientWidth;
            var sh = section.scrollHeight;
            var sw = section.scrollWidth;

            // Section not laid out yet (display:none, detached, etc.)
            if (ch === 0 || cw === 0) return;

            if (sh <= ch && sw <= cw) break;   // fits — done

            var scaleH = ch / sh;
            var scaleW = cw / sw;
            var step   = Math.min(scaleH, scaleW, 1) * SAFETY_MARGIN;

            current *= step;
            if (current < MIN_FONT_SIZE) {
                current = MIN_FONT_SIZE;
                section.style.fontSize = current + 'px';
                break;
            }
            section.style.fontSize = current + 'px';
        }
    }

    function fitAll() {
        var sections = document.querySelectorAll('section');
        for (var i = 0; i < sections.length; i++) fit(sections[i]);
    }

    var rafId = null;
    function scheduleFitAll() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () { rafId = null; fitAll(); });
    }

    /* Wait until any math typesetter on the page has finished
     * laying out equations. Running autoscale before math renders
     * causes the measured scrollHeight to be wrong, which makes
     * fractions and operators snap to a too-small font-size and
     * then visibly overflow after MathJax inflates them. */
    function waitForMath() {
        var promises = [];

        // MathJax v3+
        if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
            promises.push(window.MathJax.startup.promise);
        }
        // MathJax v3 typeset queue
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            try { promises.push(window.MathJax.typesetPromise()); } catch (e) { /* ignore */ }
        }
        // KaTeX auto-render finishes synchronously on load, so a
        // load-event tick is enough to catch it.
        // Marp-core's math is typeset at build time (static HTML),
        // so it needs no wait — but we still benefit from the
        // webfont ready event below.

        if (promises.length === 0) return Promise.resolve();
        return Promise.all(promises).catch(function () { /* ignore */ });
    }

    function init() {
        // First pass — fits plain text slides immediately
        fitAll();

        window.addEventListener('resize', scheduleFitAll);
        window.addEventListener('load',   scheduleFitAll);   // webfonts, images

        // Refit when a slide becomes visible (Marp hides non-current slides)
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) fit(entries[i].target);
                }
            }, { threshold: 0.05 });
            var sections = document.querySelectorAll('section');
            for (var i = 0; i < sections.length; i++) io.observe(sections[i]);
        }

        // Refit as each image loads (images can change content height)
        var imgs = document.querySelectorAll('img');
        for (var j = 0; j < imgs.length; j++) {
            var img = imgs[j];
            if (!img.complete) {
                img.addEventListener('load',  scheduleFitAll, { once: true });
                img.addEventListener('error', scheduleFitAll, { once: true });
            }
        }

        // Refit once webfonts have finished loading (sizes change)
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
            document.fonts.ready.then(scheduleFitAll);
        }

        // Refit after math typesetter finishes. Two rounds catch
        // most edge cases: one on initial layout, and a safety
        // pass for MathJax containers that resize their children
        // after `mjx-container` is attached.
        waitForMath().then(function () {
            scheduleFitAll();
            setTimeout(scheduleFitAll, 250);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
