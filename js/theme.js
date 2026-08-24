/* theme.js — wygląd aplikacji: motyw (jasny/ciemny/auto) + rozmiar tekstu.
   Ustawienia trzymane w stanie (storage.js), stosowane jako atrybuty na <html>:
   data-theme = light|dark, data-font = m|l|xl. CSS reaguje na te atrybuty.       */

import { getUi } from './storage.js';

/** Zamienia preferencję (light|dark|auto) na realny motyw z uwzględnieniem systemu. */
export function resolveTheme(pref) {
  if (pref === 'auto') {
    const light = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return light ? 'light' : 'dark';
  }
  return pref === 'light' ? 'light' : 'dark';
}

/** Nakłada aktualny motyw i rozmiar tekstu na dokument. */
export function applyAppearance() {
  const ui = getUi();
  const root = document.documentElement;
  const theme = resolveTheme(ui.theme || 'dark');
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-font', ui.font || 'm');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f6fc' : '#0b1020');
}

/** Gdy motyw = auto, reaguj na zmianę trybu systemowego w locie. */
export function watchSystemTheme() {
  if (!window.matchMedia) return;
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const handler = () => { if ((getUi().theme || 'dark') === 'auto') applyAppearance(); };
  if (mq.addEventListener) mq.addEventListener('change', handler);
  else if (mq.addListener) mq.addListener(handler); // starsze przeglądarki
}
