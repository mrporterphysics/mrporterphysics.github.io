/**
 * Analytics configuration.
 *
 * Paste the Apps Script Web App URL you get after deploying apps-script/Code.gs
 * (see TEACHER-SETUP.md). Leave as null to disable analytics entirely — the
 * quiz still works, just nothing gets logged.
 *
 * IMPORTANT: This URL is public (every student's browser will see it). That's
 * fine — the Apps Script only accepts appending events on POST. The GET
 * endpoint (aggregated stats) is gated by TEACHER_KEY.
 */
window.ANALYTICS_CONFIG = {
    // Example: 'https://script.google.com/macros/s/AKfycbw.../exec'
    endpoint: null,

    // If you ever want to temporarily silence logging without editing the URL:
    enabled: true,

    // Bumping this lets you segment data by release if you ever need to.
    appVersion: '1.0.0'
};
