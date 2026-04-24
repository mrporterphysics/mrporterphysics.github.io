/**
 * Analytics — fire-and-forget client for the Apps Script backend.
 *
 * Design principles:
 *   1. Never block or break the quiz. If anything throws, swallow it silently.
 *   2. Completely anonymous. A random session ID lives in sessionStorage so
 *      reloads stay linked but closing the tab resets. No cookies, no name,
 *      no email, no fingerprint.
 *   3. No payload bloat. We send only what the dashboard actually visualizes.
 *   4. Prefer sendBeacon so events survive page unload (finish-quiz case).
 *
 * Event types emitted:
 *   - session_start      (when startQuiz() runs — one per quiz)
 *   - question_answered  (every submitted answer)
 *   - session_end        (when finishQuiz() runs)
 */
const Analytics = {
    session: null,
    currentQuestionStart: 0,

    init: function () {
        try {
            const config = window.ANALYTICS_CONFIG || {};
            if (!config.enabled || !config.endpoint) {
                // Silently disabled. Still set up session tracking so the rest
                // of the module doesn't need to null-check.
                this.disabled = true;
            }

            this.session = this.getOrCreateSession();

            // Listen to the events the quiz already emits — we don't need to
            // modify quiz-ui.js if we piggyback on questionAnswered and
            // questionDisplayed.
            document.addEventListener('questionDisplayed', (e) => {
                this.currentQuestionStart = Date.now();
            });

            document.addEventListener('questionAnswered', (e) => {
                this.trackAnswer(e.detail);
            });

            // Best-effort session-end logging when the tab closes before
            // finishQuiz() fires (e.g. student gets bored mid-quiz).
            window.addEventListener('pagehide', () => {
                this.send({ eventType: 'page_hide' });
            });

            console.log('Analytics initialized', this.disabled ? '(disabled — no endpoint configured)' : '');
        } catch (err) {
            // Absolutely never surface analytics errors to students.
            console.warn('Analytics init failed (non-fatal):', err);
            this.disabled = true;
        }
    },

    getOrCreateSession: function () {
        try {
            let sid = sessionStorage.getItem('apq_session_id');
            if (!sid) {
                // Short opaque ID. Not a UUID — just enough entropy that
                // collisions in a classroom are vanishingly unlikely.
                sid = 'sess_' + Math.random().toString(36).slice(2, 10) +
                      Date.now().toString(36);
                sessionStorage.setItem('apq_session_id', sid);
            }
            return sid;
        } catch (e) {
            // sessionStorage blocked (private browsing on some browsers).
            return 'sess_anon_' + Math.random().toString(36).slice(2, 10);
        }
    },

    trackSessionStart: function (meta) {
        this.send({
            eventType: 'session_start',
            mode: meta && meta.mode,
            topic: meta && meta.subject
        });
    },

    trackSessionEnd: function (meta) {
        this.send({
            eventType: 'session_end',
            mode: meta && meta.mode,
            durationMs: meta && meta.durationMs
        });
    },

    trackAnswer: function (detail) {
        if (!detail || !detail.question) return;
        const q = detail.question;

        let hintUsed = false;
        try {
            if (typeof HintSystem !== 'undefined' &&
                HintSystem.currentHints &&
                HintSystem.currentHints.questionId === q.id) {
                hintUsed = HintSystem.currentHints.hintsShown > 0;
            }
        } catch (e) { /* never block analytics on optional module */ }

        const mode = (typeof QuizStorage !== 'undefined' &&
                      QuizStorage.getSettings &&
                      QuizStorage.getSettings().mode) || 'unknown';

        const durationMs = this.currentQuestionStart
            ? Date.now() - this.currentQuestionStart
            : null;

        this.send({
            eventType: 'question_answered',
            questionId: q.id,
            topic: q.topic,
            type: q.type,
            correct: !!detail.isCorrect,
            mode: mode,
            durationMs: durationMs,
            hintUsed: hintUsed
        });
    },

    send: function (payload) {
        if (this.disabled) return;
        try {
            const config = window.ANALYTICS_CONFIG || {};
            if (!config.endpoint) return;

            const body = JSON.stringify({
                sessionId: this.session,
                appVersion: config.appVersion,
                userAgent: (navigator.userAgent || '').slice(0, 200),
                ...payload
            });

            // sendBeacon is perfect for fire-and-forget: survives page
            // unload, doesn't block navigation, ignored on failure.
            // NOTE: we use text/plain because Apps Script's doPost reads
            // postData.contents — not a true CORS preflight issue here, but
            // keeping MIME simple avoids preflight on all browsers.
            if (navigator.sendBeacon) {
                const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
                const ok = navigator.sendBeacon(config.endpoint, blob);
                if (ok) return;
            }

            // Fallback for older browsers or beacon failure.
            fetch(config.endpoint, {
                method: 'POST',
                mode: 'no-cors',           // Apps Script doesn't send CORS headers
                keepalive: true,           // survive page unload
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body
            }).catch(() => { /* silent */ });
        } catch (e) {
            // Never, ever throw from analytics.
        }
    }
};

// Auto-init as soon as the DOM is ready. Listening to DOMContentLoaded here
// instead of being called explicitly from app.js means that analytics is
// completely decoupled — delete this script tag and everything still works.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
    Analytics.init();
}

// Expose for app.js hooks (session_start / session_end).
window.Analytics = Analytics;
