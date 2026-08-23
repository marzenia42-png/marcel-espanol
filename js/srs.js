/* srs.js — Spaced Repetition System, system Leitnera (5 pudełek).
   Zasada: dobra odpowiedź → słówko awansuje o pudełko (rzadsze powtórki).
           błąd → wraca do pudełka 1 (częste powtórki).                        */

import { get, save, today, addDays } from './storage.js';

// Odstęp powtórki w dniach dla każdego pudełka.
const INTERVALS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };

/** Zwraca (tworząc jeśli trzeba) stan SRS danej karty. */
function slot(cardId) {
  const s = get();
  if (!s.srs[cardId]) {
    s.srs[cardId] = { box: 1, due: today(), seen: 0, ok: 0 };
  }
  return s.srs[cardId];
}

/** Rejestruje wynik powtórki i przelicza następny termin. */
export function review(cardId, correct) {
  const sl = slot(cardId);
  sl.seen += 1;
  if (correct) {
    sl.ok += 1;
    sl.box = Math.min(5, sl.box + 1);
  } else {
    sl.box = 1;                    // błąd resetuje — słowo wróci szybko
  }
  sl.due = addDays(today(), INTERVALS[sl.box]);
  save();

  // Aktualizuj status słownictwa na podstawie pudełka.
  const s = get();
  s.vocab[cardId] = sl.box >= 4 ? 'known' : (sl.box >= 2 ? 'learning' : 'new');
  save();
  return sl;
}

/** Czy karta jest „na czasie” (termin dziś lub w przeszłości). */
export function isDue(cardId) {
  const s = get();
  const sl = s.srs[cardId];
  if (!sl) return true;                     // nowa karta = do nauki
  return sl.due <= today();
}

/** Lista kart do powtórki dziś (posortowana: najstarszy termin pierwszy). */
export function dueCards(limit = 20) {
  const s = get();
  return Object.entries(s.srs)
    .filter(([, sl]) => sl.due <= today())
    .sort((a, b) => (a[1].due < b[1].due ? -1 : 1))
    .slice(0, limit)
    .map(([id]) => id);
}

/** Rozkład kart po pudełkach — do panelu postępów. */
export function boxDistribution() {
  const s = get();
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  Object.values(s.srs).forEach((sl) => { dist[sl.box] = (dist[sl.box] || 0) + 1; });
  return dist;
}

export function box(cardId) {
  const s = get();
  return s.srs[cardId] ? s.srs[cardId].box : 0;
}
