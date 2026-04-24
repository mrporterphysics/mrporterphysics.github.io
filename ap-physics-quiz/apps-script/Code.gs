/**
 * AP Physics Quiz – Analytics Backend (Google Apps Script)
 *
 * Deploy as a Web App with:
 *   - Execute as: Me
 *   - Who has access: Anyone
 *
 * Two endpoints:
 *   POST  /exec              → append a row to the "events" sheet
 *                              Body (JSON): { sessionId, eventType, questionId,
 *                                             topic, type, correct, mode,
 *                                             durationMs, hintUsed }
 *                              No authentication — it HAS to be open because
 *                              students' browsers call it directly.
 *
 *   GET   /exec?key=SECRET   → return aggregated JSON for the teacher dashboard.
 *                              Requires the shared TEACHER_KEY so random
 *                              internet traffic can't read your data.
 *
 * Configuration: set TEACHER_KEY below to any string you want. Also save that
 * same string in teacher.html's settings (the dashboard will prompt for it).
 */

// ────────────────────────────────────────────────────────────────────────────
// CONFIG — CHANGE ME
// ────────────────────────────────────────────────────────────────────────────
const TEACHER_KEY = 'CHANGE_ME_to_a_long_random_string';
const SHEET_NAME = 'events';

// Max events returned to the dashboard to keep response sizes sane.
const MAX_RECENT_EVENTS = 20000;

// ────────────────────────────────────────────────────────────────────────────
// HTTP handlers
// ────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    appendEvent(body);
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 400);
  }
}

function doGet(e) {
  const key = (e.parameter && e.parameter.key) || '';
  if (key !== TEACHER_KEY) {
    return jsonResponse({ ok: false, error: 'unauthorized' }, 401);
  }

  try {
    const events = readEvents();
    const summary = aggregate(events);
    return jsonResponse({ ok: true, generatedAt: new Date().toISOString(), ...summary });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Storage
// ────────────────────────────────────────────────────────────────────────────

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'timestamp', 'sessionId', 'eventType', 'questionId',
      'topic', 'questionType', 'correct', 'mode',
      'durationMs', 'hintUsed', 'userAgent'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function appendEvent(body) {
  const sheet = getOrCreateSheet_();
  // Coerce values defensively — never trust client input to be well-formed.
  const row = [
    new Date(),
    String(body.sessionId || '').slice(0, 64),
    String(body.eventType || 'unknown').slice(0, 32),
    String(body.questionId || '').slice(0, 32),
    String(body.topic || '').slice(0, 64),
    String(body.type || '').slice(0, 16),
    body.correct === true ? 1 : body.correct === false ? 0 : '',
    String(body.mode || '').slice(0, 16),
    typeof body.durationMs === 'number' ? body.durationMs : '',
    body.hintUsed === true ? 1 : 0,
    String(body.userAgent || '').slice(0, 200)
  ];
  sheet.appendRow(row);
}

function readEvents() {
  const sheet = getOrCreateSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return [];

  const startRow = Math.max(2, last - MAX_RECENT_EVENTS + 1);
  const numRows = last - startRow + 1;
  const values = sheet.getRange(startRow, 1, numRows, 11).getValues();

  return values.map(r => ({
    timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
    sessionId: String(r[1] || ''),
    eventType: String(r[2] || ''),
    questionId: String(r[3] || ''),
    topic: String(r[4] || ''),
    type: String(r[5] || ''),
    correct: r[6] === 1 || r[6] === '1',
    incorrect: r[6] === 0 || r[6] === '0',
    mode: String(r[7] || ''),
    durationMs: typeof r[8] === 'number' ? r[8] : null,
    hintUsed: r[9] === 1 || r[9] === '1',
  }));
}

// ────────────────────────────────────────────────────────────────────────────
// Aggregation — does all the heavy lifting server-side so the dashboard just
// renders. If the class grows huge and this gets slow, move to a client-side
// aggregation and trust it.
// ────────────────────────────────────────────────────────────────────────────

function aggregate(events) {
  const byQuestion = {};     // id → { attempts, correct, topic, type }
  const byTopic = {};        // topic → { attempts, correct }
  const byDay = {};          // YYYY-MM-DD → attempts
  const sessions = new Set();
  let totalAttempts = 0;
  let totalCorrect = 0;
  let totalHints = 0;

  for (const ev of events) {
    if (ev.sessionId) sessions.add(ev.sessionId);

    if (ev.eventType !== 'question_answered') continue;

    totalAttempts++;
    if (ev.correct) totalCorrect++;
    if (ev.hintUsed) totalHints++;

    // Per-question
    if (ev.questionId) {
      const q = byQuestion[ev.questionId] || (byQuestion[ev.questionId] = {
        id: ev.questionId, topic: ev.topic, type: ev.type,
        attempts: 0, correct: 0
      });
      q.attempts++;
      if (ev.correct) q.correct++;
    }

    // Per-topic
    if (ev.topic) {
      const t = byTopic[ev.topic] || (byTopic[ev.topic] = { topic: ev.topic, attempts: 0, correct: 0 });
      t.attempts++;
      if (ev.correct) t.correct++;
    }

    // Per-day
    const day = ev.timestamp.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + 1;
  }

  const questions = Object.values(byQuestion)
    .map(q => ({ ...q, accuracy: q.attempts ? q.correct / q.attempts : 0 }))
    .sort((a, b) => a.accuracy - b.accuracy); // hardest first

  const topics = Object.values(byTopic)
    .map(t => ({ ...t, accuracy: t.attempts ? t.correct / t.attempts : 0 }));

  const days = Object.entries(byDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totals: {
      sessions: sessions.size,
      attempts: totalAttempts,
      correct: totalCorrect,
      accuracy: totalAttempts ? totalCorrect / totalAttempts : 0,
      hintsUsed: totalHints,
    },
    questions,
    topics,
    days,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function jsonResponse(obj, statusCode) {
  // Apps Script doesn't expose status codes, but we set them in payload too
  // so clients can detect errors.
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
