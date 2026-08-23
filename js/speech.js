/* speech.js — warstwa mowy = innowacja AI działająca NA URZĄDZENIU, za darmo.
   1) Lektor (TTS)  — czyta hiszpański natywnym głosem (Web Speech Synthesis).
   2) Trener wymowy (ASR) — rozpoznaje co Marcel powiedział (Web Speech
      Recognition) i ocenia trafność względem wzorca (podobieństwo napisów).
   Bez klucza API, bez kosztów, bez serwera. Działa na Chrome (Android/desktop). */

import { get } from './storage.js';

/* ---------------- Lektor (Text-To-Speech) ---------------- */

let VOICES = [];
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  VOICES = window.speechSynthesis.getVoices() || [];
}
if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function ttsSupported() { return 'speechSynthesis' in window; }

/** Kod języka wg wybranego wariantu (Hiszpania vs Ameryka Łacińska). */
function langCode() {
  return get().profile.variant === 'latam' ? 'es-MX' : 'es-ES';
}

function pickVoice() {
  const want = langCode();
  return VOICES.find((v) => v.lang === want)
      || VOICES.find((v) => v.lang && v.lang.startsWith('es'))
      || null;
}

/** Czyta tekst po hiszpańsku. speed<1 = wolniej (tryb do nauki). */
export function speak(text, speed = 0.95) {
  if (!ttsSupported() || !text) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = langCode();
    u.rate = speed;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch (e) { /* cicho — lektor to dodatek */ }
}

/* ---------------- Trener wymowy (Speech Recognition) ---------------- */

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export function asrSupported() { return !!SR; }

/** Normalizacja do porównania: bez akcentów, znaków, wielkości liter. */
function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // zdejmij akcenty
    .replace(/[¿?¡!.,;:"']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Odległość Levenshteina (ile edycji dzieli dwa napisy). */
function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
  return d[m][n];
}

/** Wynik podobieństwa 0..100 między tym co powiedziano a wzorcem. */
export function pronunciationScore(spoken, target) {
  const a = norm(spoken), b = norm(target);
  if (!a) return 0;
  const dist = lev(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;
  return Math.max(0, Math.round((1 - dist / maxLen) * 100));
}

/**
 * Nasłuchuje jednej wypowiedzi.
 * @returns Promise<{ transcript, score }>
 */
export function listenOnce(target, { onStart } = {}) {
  return new Promise((resolve, reject) => {
    if (!SR) { reject(new Error('no-asr')); return; }
    const rec = new SR();
    rec.lang = langCode();
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    let done = false;

    rec.onstart = () => onStart && onStart();
    rec.onerror = (e) => { if (!done) { done = true; reject(new Error(e.error || 'asr-error')); } };
    rec.onresult = (e) => {
      done = true;
      // weź najlepiej dopasowaną alternatywę
      let best = { transcript: '', score: -1 };
      const alts = e.results[0];
      for (let i = 0; i < alts.length; i++) {
        const t = alts[i].transcript;
        const sc = pronunciationScore(t, target);
        if (sc > best.score) best = { transcript: t, score: sc };
      }
      resolve(best);
    };
    rec.onend = () => { if (!done) { done = true; resolve({ transcript: '', score: 0 }); } };

    try { rec.start(); }
    catch (e) { if (!done) { done = true; reject(e); } }
  });
}
