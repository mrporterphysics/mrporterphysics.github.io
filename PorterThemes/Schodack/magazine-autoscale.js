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

    function init() {
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
