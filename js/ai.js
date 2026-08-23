/* ai.js — warstwa AI „tier-2" (LLM): tutor rozmowa + adaptacyjne ćwiczenia.
   BEZPIECZEŃSTWO: żadnego klucza API w kodzie ani w repo. PWA zna wyłącznie
   URL proxy (np. Supabase Edge Function / Cloudflare Worker), który trzyma
   klucz PO STRONIE SERWERA. URL zapisujemy lokalnie w Ustawieniach.
   Gdy proxy nie skonfigurowane → available()=false, a UI proponuje włączenie.  */

import { get } from './storage.js';

const CFG_KEY = 'vamos_ai_cfg_v1';

export function getConfig() {
  try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
  catch { return {}; }
}
export function setConfig(cfg) {
  localStorage.setItem(CFG_KEY, JSON.stringify(cfg || {}));
}
export function available() {
  const c = getConfig();
  return !!(c.endpoint && /^https?:\/\//.test(c.endpoint));
}

/** Nagłówki żądania — dokłada anon-key jeśli podany (Supabase za JWT). */
function headers() {
  const c = getConfig();
  const h = { 'Content-Type': 'application/json' };
  if (c.anonKey) { h['apikey'] = c.anonKey; h['Authorization'] = 'Bearer ' + c.anonKey; }
  return h;
}

/** Instrukcja systemowa dopasowana do poziomu i wariantu Marcela. */
export function systemPrompt() {
  const p = get().profile;
  const cefr = p.cefr || 'A1';
  const variant = p.variant === 'latam'
    ? 'hiszpański z Ameryki Łacińskiej (neutralny, np. meksykański)'
    : 'hiszpański z Hiszpanii (kastylijski)';
  return [
    'Jesteś cierpliwym nauczycielem hiszpańskiego dla 18-letniego Polaka o imieniu Marcel.',
    `Jego poziom to ${cefr}. Używaj ${variant}.`,
    'ZASADY:',
    `- Mów PROSTO, krótkie zdania na poziomie ${cefr}. Nie przytłaczaj.`,
    '- Odpowiadaj po hiszpańsku, ale jeśli Marcel utknie — dodaj krótkie wyjaśnienie po polsku w nawiasie.',
    '- Delikatnie poprawiaj błędy: pokaż poprawną wersję i wytłumacz różnicę jednym zdaniem po polsku.',
    '- Zadawaj proste pytania, żeby podtrzymać rozmowę.',
    '- Chwal postępy. Bądź naturalny i przyjazny, jak starszy kolega.'
  ].join('\n');
}

/**
 * Rozmowa z tutorem.
 * @param {Array<{role:'user'|'assistant', content:string}>} history
 * @returns {Promise<string>} odpowiedź asystenta
 */
export async function chat(history) {
  const c = getConfig();
  if (!available()) throw new Error('ai-not-configured');
  const res = await fetch(c.endpoint, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      mode: 'chat',
      model: c.model || 'claude-haiku-4-5',
      system: systemPrompt(),
      messages: history
    })
  });
  if (!res.ok) throw new Error('ai-http-' + res.status);
  const data = await res.json();
  // Elastycznie: obsłuż różne kształty odpowiedzi proxy.
  return data.reply
      || data.content
      || (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
      || '…';
}

/**
 * Generuje krótki zestaw ćwiczeń pod słabe słowa Marcela (adaptacja).
 * @returns {Promise<Array>} ćwiczenia w formacie zgodnym z silnikiem
 */
export async function generateExercises(weakWords = []) {
  const c = getConfig();
  if (!available()) throw new Error('ai-not-configured');
  const res = await fetch(c.endpoint, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      mode: 'exercises',
      model: c.model || 'claude-haiku-4-5',
      system: systemPrompt(),
      weakWords
    })
  });
  if (!res.ok) throw new Error('ai-http-' + res.status);
  const data = await res.json();
  return Array.isArray(data) ? data : (data.exercises || []);
}
