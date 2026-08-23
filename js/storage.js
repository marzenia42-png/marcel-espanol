/* storage.js — jedyne źródło prawdy o postępach Marcela.
   Wszystko trzymamy w localStorage pod jednym kluczem (łatwy backup/reset).   */

const KEY = 'vamos_state_v1';

const DEFAULT_STATE = {
  v: 1,
  onboarded: false,
  profile: {
    level:   'beginner',   // deklaracja z onboardingu: beginner | a1 | a2
    goal:    null,         // travel | work | exam | fun
    variant: 'es',        // es (Hiszpania) | latam (Ameryka Łacińska)
    minutes: 10,          // dzienny cel w minutach
    cefr:    'A0'         // wynik testu poziomującego (nadpisuje deklarację)
  },
  xp: 0,
  streak: { count: 0, last: null },     // last = 'YYYY-MM-DD'
  progress: {},                          // lessonId -> { done:bool, best:0..100, plays:int }
  srs: {},                               // cardId -> { box:1..5, due:'YYYY-MM-DD', seen:int, ok:int }
  vocab: {},                             // cardId -> 'new' | 'learning' | 'known'
  stats: { answers: 0, correct: 0, byType: {}, weak: {} }, // weak: word -> liczba pomyłek
  createdAt: null
};

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

/** Data lokalna w formacie YYYY-MM-DD (bez strefy — liczy się „dzień Marcela”). */
export function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Ile dni minęło między dwoma datami YYYY-MM-DD. */
function daysBetween(a, b) {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

/** Dodaje N dni do daty YYYY-MM-DD. */
export function addDays(dateStr, n) {
  const d = new Date((dateStr || today()) + 'T00:00:00');
  d.setDate(d.getDate() + n);
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

let state = null;

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      state = Object.assign(deepClone(DEFAULT_STATE), JSON.parse(raw));
      // dołóż brakujące gałęzie po ewentualnej aktualizacji schematu
      state.profile = Object.assign({}, DEFAULT_STATE.profile, state.profile);
      state.stats   = Object.assign({}, DEFAULT_STATE.stats, state.stats);
      return state;
    }
  } catch (e) { console.warn('Uszkodzony stan, resetuję.', e); }
  state = deepClone(DEFAULT_STATE);
  state.createdAt = today();
  save();
  return state;
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { console.warn('Nie zapisano stanu', e); }
}

export function get() { return state || load(); }

export function patchProfile(patch) {
  Object.assign(get().profile, patch);
  save();
}

export function setOnboarded(cefr) {
  const s = get();
  s.onboarded = true;
  if (cefr) s.profile.cefr = cefr;
  save();
}

/* ---------- XP ---------- */
export function addXp(n) {
  const s = get();
  s.xp = Math.max(0, s.xp + n);
  save();
  return s.xp;
}

/** Poziom „gry” liczony z XP (osobny od CEFR — czysta gamifikacja). */
export function gameLevel() {
  return Math.floor(Math.sqrt(get().xp / 50)) + 1;
}

/* ---------- streak (dni z rzędu) ---------- */
export function touchStreak() {
  const s = get();
  const t = today();
  if (s.streak.last === t) return s.streak.count; // już dziś liczone
  if (s.streak.last && daysBetween(s.streak.last, t) === 1) {
    s.streak.count += 1;                            // kolejny dzień z rzędu
  } else {
    s.streak.count = 1;                             // start / przerwana passa
  }
  s.streak.last = t;
  save();
  return s.streak.count;
}

/** Czy passa jest wciąż aktywna (dziś lub wczoraj). */
export function streakAlive() {
  const s = get();
  if (!s.streak.last) return false;
  return daysBetween(s.streak.last, today()) <= 1;
}

/* ---------- postęp lekcji ---------- */
export function lessonProgress(id) {
  return get().progress[id] || { done: false, best: 0, plays: 0 };
}

export function completeLesson(id, accuracy) {
  const s = get();
  const prev = s.progress[id] || { done: false, best: 0, plays: 0 };
  s.progress[id] = {
    done: true,
    best: Math.max(prev.best, Math.round(accuracy)),
    plays: prev.plays + 1
  };
  save();
}

/* ---------- statystyki odpowiedzi ---------- */
export function recordAnswer({ type, correct, word }) {
  const s = get();
  s.stats.answers += 1;
  if (correct) s.stats.correct += 1;
  const bt = s.stats.byType[type] || { a: 0, c: 0 };
  bt.a += 1; if (correct) bt.c += 1;
  s.stats.byType[type] = bt;
  if (!correct && word) {
    s.stats.weak[word] = (s.stats.weak[word] || 0) + 1;
  } else if (correct && word && s.stats.weak[word]) {
    s.stats.weak[word] = Math.max(0, s.stats.weak[word] - 1);
    if (s.stats.weak[word] === 0) delete s.stats.weak[word];
  }
  save();
}

export function accuracy() {
  const st = get().stats;
  return st.answers ? Math.round((st.correct / st.answers) * 100) : 0;
}

/** Najsłabsze słowa (najwięcej pomyłek). */
export function weakWords(limit = 8) {
  const w = get().stats.weak;
  return Object.entries(w).sort((a, b) => b[1] - a[1]).slice(0, limit)
    .map(([word, miss]) => ({ word, miss }));
}

/* ---------- słownictwo ---------- */
export function vocabStatus(id) { return get().vocab[id] || 'new'; }
export function setVocabStatus(id, status) { get().vocab[id] = status; save(); }
export function knownCount() {
  return Object.values(get().vocab).filter((v) => v === 'known').length;
}

/* ---------- reset ---------- */
export function reset() {
  state = deepClone(DEFAULT_STATE);
  state.createdAt = today();
  save();
}
