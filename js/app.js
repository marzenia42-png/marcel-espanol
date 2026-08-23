/* app.js — kontroler aplikacji: boot, service worker, router, tabbar. */

import { el, clear } from './dom.js';
import { load, get } from './storage.js';
import { runLesson } from './lesson.js';
import * as Screens from './screens.js';

const root = document.getElementById('app');

/* ---------------- rejestracja service workera (offline) ---------------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW:', e));
  });
}

/* ---------------- nawigacja ---------------- */
const MAIN_TABS = ['dashboard', 'vocab', 'progress', 'tutor'];

export const nav = {
  go(view, params) { renderMain(view, params); },
  startLesson(lesson) { openLesson(lesson); },
  startReview(lesson) { openLesson(lesson, true); },
  onboarding() { startOnboarding(); }
};

function tabbar(active) {
  const tabs = [
    { id: 'dashboard', ic: '🏠', label: 'Nauka' },
    { id: 'vocab', ic: '📚', label: 'Słówka' },
    { id: 'progress', ic: '📊', label: 'Postępy' },
    { id: 'tutor', ic: '✨', label: 'Tutor AI' }
  ];
  return el('nav', { class: 'tabbar' }, tabs.map((t) =>
    el('button', { class: 'tab' + (t.id === active ? ' on' : ''), type: 'button', onclick: () => renderMain(t.id) },
      [el('span', { class: 'ic' }, t.ic), t.label])
  ));
}

function renderMain(view = 'dashboard', params = {}) {
  clear(root);
  let content;
  switch (view) {
    case 'vocab':         content = Screens.vocab(nav); break;
    case 'progress':      content = Screens.progress(nav); break;
    case 'tutor':         content = Screens.tutor(nav); break;
    case 'aichat':        content = Screens.aiChat(nav); break;
    case 'settings':      content = Screens.settings(nav); break;
    case 'pronunciation': content = Screens.pronunciation(nav); break;
    case 'dashboard':
    default:              content = Screens.dashboard(nav); view = 'dashboard';
  }
  root.appendChild(content);
  if (MAIN_TABS.includes(view)) root.appendChild(tabbar(view));
  window.scrollTo(0, 0);
}

function openLesson(lesson, isReview = false) {
  clear(root);
  runLesson(root, lesson, {
    onDone: () => renderMain(isReview ? 'progress' : 'dashboard'),
    onExit: () => renderMain('dashboard')
  });
}

function startOnboarding() {
  clear(root);
  Screens.onboarding(root, { onFinish: () => renderMain('dashboard') });
}

/* ---------------- boot ---------------- */
function boot() {
  load();
  if (!get().onboarded) startOnboarding();
  else renderMain('dashboard');
}

boot();
