# Teacher Dashboard Setup

A step-by-step guide to turn on anonymous class analytics for the AP Physics Quiz.

**Time required:** 10-15 minutes, one-time setup.
**Cost:** $0. Uses a free Google account.
**What students see:** nothing new. No logins. No cookies. Just an anonymous session ID while their tab is open.

---

## Overview

There are three moving parts:

1. **A Google Sheet** — stores every student answer as a row.
2. **A Google Apps Script** — a tiny web backend your students' browsers POST to.
3. **The dashboard** (`teacher.html`) — already bundled with the quiz; reads aggregated stats for you.

Students never see your Google account or the sheet. The Apps Script web URL is public (it has to be, so browsers can post to it), but the **teacher key** keeps random internet strangers from reading the data.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.new](https://sheets.new) and create a new blank sheet.
2. Rename it something like **"AP Physics Quiz — Analytics"**.
3. Leave the first tab named `Sheet1`. The script will create its own `events` tab automatically the first time a student answers a question.

---

## Step 2 — Add the Apps Script

1. With that sheet open, click **Extensions → Apps Script**. A new editor tab opens.
2. Delete whatever starter code is in `Code.gs`.
3. Open the file `ap-physics-quiz/apps-script/Code.gs` in this repository. Copy the **entire contents** and paste into the editor.
4. At the top, change this line:

   ```js
   const TEACHER_KEY = 'CHANGE_ME_to_a_long_random_string';
   ```

   to something only you know. A good choice is a random 20-char string — you can generate one at [random.org/strings](https://www.random.org/strings/). **Save this somewhere** — you'll need to paste it into the dashboard.

5. Click the **💾 Save** icon. Give the project a name like "AP Physics Analytics".

---

## Step 3 — Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear next to "Select type" and pick **Web app**.
3. Fill in:
   - **Description:** `AP Physics Analytics v1`
   - **Execute as:** `Me (your@gmail.com)`
   - **Who has access:** `Anyone`
     > This sounds scary but is necessary — student browsers need to post without signing in. The `TEACHER_KEY` above keeps the GET (read) endpoint locked down.
4. Click **Deploy**.
5. The first time only, Google will ask you to authorize. Click **Authorize access**, pick your Google account, click **Advanced → Go to [project name]**, then **Allow**.
6. Google shows you a **Web app URL** that ends in `/exec`. Copy this URL. You'll need it twice.

---

## Step 4 — Point the quiz at your backend

1. Open `ap-physics-quiz/js/analytics-config.js` in this repository.
2. Replace the `endpoint: null` line with your URL:

   ```js
   window.ANALYTICS_CONFIG = {
       endpoint: 'https://script.google.com/macros/s/AKfycbw.../exec',
       enabled: true,
       appVersion: '1.0.0'
   };
   ```

3. Commit and push. GitHub Pages rebuilds in a few seconds.

That's it — the next student to answer a question will start appending rows to your sheet.

---

## Step 5 — Log into your dashboard

1. Visit `https://yoursite.github.io/ap-physics-quiz/teacher.html` (same URL as the quiz, but `teacher.html` instead of `index.html`).
2. Paste:
   - **Apps Script Web App URL:** the `/exec` URL from Step 3
   - **Teacher key:** the string you set in Step 2
3. Click **View Dashboard**. It saves both in *your* browser's localStorage so you don't re-type each visit. (Click **Sign out** to forget them.)

You should see:

- **Summary cards** — unique sessions, total attempts, class accuracy, hint-use rate
- **Accuracy by topic** — hardest topics first (red bars need reteaching)
- **Activity sparkline** — daily question attempts over the last 30 days
- **Per-question table** — sortable, filterable, ranked hardest first. This is the single most useful piece of information here: it tells you exactly which questions students miss most.

Empty dashboard? That's normal on day 1. Once a few students have done a quiz, refresh.

---

## What data is actually collected?

Every time a student submits an answer, one row is appended to the `events` sheet with:

| Column | Example | Notes |
| --- | --- | --- |
| timestamp | 2025-04-24 10:14:03 | server-side timestamp |
| sessionId | sess_k3h2n9lr… | random per browser tab, resets when tab closes |
| eventType | question_answered | also: session_start / session_end / page_hide |
| questionId | 59 | matches `id` column in `data/ap-physics-questions.csv` |
| topic | forces | |
| questionType | mc | tf / mc / fill / matching |
| correct | 1 or 0 | |
| mode | learning | learning / test / review |
| durationMs | 14823 | time from question shown to answer submitted |
| hintUsed | 0 or 1 | whether any hint was revealed before answering |
| userAgent | Chrome on iPad | truncated to 200 chars |

**Not collected:** no names, no emails, no device IDs, no IP addresses, no cross-session tracking, no cookies set.

The session ID is a random string that lives in `sessionStorage` — closing the browser tab wipes it, so you can't tell whether two quizzes came from the same student.

---

## Troubleshooting

**Dashboard shows "unauthorized"**
Your `TEACHER_KEY` in `Code.gs` doesn't match what you typed into the dashboard. Go back to the Apps Script, scroll to the top of `Code.gs`, and check spelling.

**Dashboard shows "HTTP 302" or redirects**
You may have deployed with **Execute as: User accessing the web app** instead of **Me**. Redeploy (Deploy → Manage deployments → pencil icon → set to **Me**).

**Nothing appears in the sheet**
Open DevTools → Network tab in your browser while answering a question. You should see a POST to `script.google.com` returning 200. If it's blocked, double-check the URL in `analytics-config.js` and that the deployment is **Anyone** access.

**I updated Code.gs — nothing changed**
Apps Script only deploys the *saved version at deploy time*. Deploy → Manage deployments → click your active deployment → pencil icon → Version → **New version** → Deploy.

**I want to wipe the data and start over**
Open the Google Sheet, select all rows in the `events` tab below the header, delete. Or delete the whole sheet and let the script recreate it.

---

## Security notes

- The Apps Script URL is public. Anyone who knows it can POST junk data. Consider that in the same way you'd consider any public form. The `TEACHER_KEY` only protects the *read* side.
- If you rotate the key, update both `Code.gs` (redeploy!) and the dashboard (sign out + sign in again with new key).
- Students' browsers hit the Apps Script directly. You don't need to share anything with them — if the quiz URL works, analytics just happen.
- **Never commit your `TEACHER_KEY` to the repo.** It lives only inside the Apps Script editor, which only you can see.

---

## Disabling analytics

Edit `js/analytics-config.js`:

```js
window.ANALYTICS_CONFIG = { endpoint: null };
```

The quiz keeps working — nothing logs.
