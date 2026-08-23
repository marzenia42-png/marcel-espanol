/* screens.js — wszystkie ekrany (poza runnerem lekcji).
   Każdy builder zwraca węzeł DOM; nawigację dostaje przez obiekt `nav`.        */

import { el, clear, mount, toast, shuffle } from './dom.js';
import {
  get, patchProfile, setOnboarded, gameLevel, accuracy, weakWords,
  vocabStatus, knownCount, reset, addXp
} from './storage.js';
import { dueCards, boxDistribution } from './srs.js';
import { speak, ttsSupported, asrSupported, listenOnce } from './speech.js';
import * as AI from './ai.js';
import { UNITS, allLessons } from '../data/lessons.js';
import { VOCAB } from '../data/vocab.js';
import { PLACEMENT, scoreToCefr } from '../data/placement.js';

/* =======================================================================
   ONBOARDING + TEST POZIOMUJĄCY
======================================================================= */
export function onboarding(host, { onFinish }) {
  const answers = { level: 'beginner', goal: 'travel', variant: 'es', minutes: 10 };
  let step = 0;

  const STEPS = [
    {
      title: '¡Hola! 👋', sub: 'Cześć Marcel! Nauczysz się hiszpańskiego od zera do rozmowy. Codziennie kawałek — bez nudy.',
      welcome: true
    },
    {
      key: 'level', title: 'Twój poziom?', sub: 'Wybierz na oko — i tak sprawdzimy Cię krótkim testem.',
      options: [
        { v: 'beginner', emoji: '🌱', t: 'Zupełnie od zera', s: 'Nigdy się nie uczyłem' },
        { v: 'a1', emoji: '🌿', t: 'Coś tam liznąłem', s: 'Znam kilka słów (A1)' },
        { v: 'a2', emoji: '🌳', t: 'Podstawy mam', s: 'Proste zdania (A2)' }
      ]
    },
    {
      key: 'goal', title: 'Po co Ci hiszpański?', sub: 'Dopasujemy przykłady do celu.',
      options: [
        { v: 'travel', emoji: '✈️', t: 'Podróże', s: 'Dogadać się na wakacjach' },
        { v: 'work', emoji: '💼', t: 'Praca / kariera', s: 'Przyda się zawodowo' },
        { v: 'exam', emoji: '🎓', t: 'Szkoła / egzamin', s: 'Chcę zdać' },
        { v: 'fun', emoji: '🎮', t: 'Dla siebie', s: 'Bo lubię / seriale / muzyka' }
      ]
    },
    {
      key: 'variant', title: 'Który hiszpański?', sub: 'Możesz zmienić później w ustawieniach.',
      options: [
        { v: 'es', emoji: '🇪🇸', t: 'Hiszpania', s: 'Kastylijski (Europa)' },
        { v: 'latam', emoji: '🌎', t: 'Ameryka Łacińska', s: 'Meksyk, Argentyna…' }
      ]
    },
    {
      key: 'minutes', title: 'Ile czasu dziennie?', sub: 'Regularność > długość. Nawet 5 minut robi robotę.',
      options: [
        { v: 5, emoji: '⚡', t: '5 minut', s: 'Na szybko' },
        { v: 10, emoji: '🔥', t: '10 minut', s: 'Złoty środek' },
        { v: 15, emoji: '💪', t: '15 minut', s: 'Ambitnie' },
        { v: 20, emoji: '🚀', t: '20 minut', s: 'Na maxa' }
      ]
    }
  ];

  function renderStep() {
    clear(host);
    const s = STEPS[step];
    const screen = el('div', { class: 'screen screen--center' });

    if (s.welcome) {
      screen.append(
        el('div', { class: 'center', style: 'font-size:64px;margin-bottom:8px' }, '🇪🇸'),
        el('h1', { class: 'center' }, s.title),
        el('p', { class: 'center' }, s.sub),
        el('button', { class: 'btn btn--gold mt', type: 'button', onclick: next }, '¡Vamos! Zaczynamy →')
      );
    } else {
      const box = el('div', { class: 'options' });
      s.options.forEach((o) => {
        const btn = el('button', { class: 'option' + (answers[s.key] === o.v ? ' sel' : ''), type: 'button',
          onclick: () => { answers[s.key] = o.v; renderStep(); } },
          [el('span', { class: 'emoji' }, o.emoji), el('span', {}, [el('span', {}, o.t), el('span', { class: 'sub' }, o.s)])]);
        box.appendChild(btn);
      });
      screen.append(
        el('div', { class: 'small' }, `Krok ${step} z ${STEPS.length - 1}`),
        el('h1', {}, s.title),
        el('p', {}, s.sub),
        box,
        el('button', { class: 'btn mt', type: 'button', onclick: next }, 'Dalej →')
      );
    }
    host.appendChild(screen);
  }

  function next() {
    step++;
    if (step < STEPS.length) { renderStep(); return; }
    // zapisz profil i przejdź do testu
    patchProfile(answers);
    runPlacement(host, {
      onFinish: (cefr) => { setOnboarded(cefr); onFinish && onFinish(); }
    });
  }

  renderStep();
}

/* ---- test poziomujący (12 pytań) ---- */
function runPlacement(host, { onFinish }) {
  let idx = 0, score = 0;
  const qs = PLACEMENT;

  function intro() {
    clear(host);
    const screen = el('div', { class: 'screen screen--center' });
    screen.append(
      el('div', { class: 'center', style: 'font-size:56px' }, '📝'),
      el('h1', { class: 'center' }, 'Krótki test'),
      el('p', { class: 'center' }, '12 pytań, ok. 2 minuty. Sprawdzimy co już umiesz i dobierzemy poziom. Nie zgaduj na siłę — „nie wiem" to też odpowiedź.'),
      el('button', { class: 'btn btn--gold', type: 'button', onclick: renderQ }, 'Zaczynam test')
    );
    host.appendChild(screen);
  }

  function renderQ() {
    clear(host);
    const q = qs[idx];
    const screen = el('div', { class: 'screen' });
    const bar = el('div', { class: 'progressbar' }, el('span', { style: `width:${(idx / qs.length) * 100}%` }));
    screen.append(el('div', { class: 'topbar' }, [el('div', { class: 'small' }, `${idx + 1}/${qs.length}`), bar]));
    screen.append(el('div', { class: 'ex__q mt' }, q.q));
    const box = el('div', { class: 'options' });
    shuffle(q.options.concat(['Nie wiem'])).forEach((o) => {
      box.appendChild(el('button', { class: 'option', type: 'button',
        onclick: () => { if (o === q.answer) score++; adv(); } }, o));
    });
    screen.append(box);
    host.appendChild(screen);
  }

  function adv() { idx++; if (idx >= qs.length) result(); else renderQ(); }

  function result() {
    const cefr = scoreToCefr(score);
    clear(host);
    const screen = el('div', { class: 'screen screen--center' });
    screen.append(
      el('div', { class: 'center', style: 'font-size:56px' }, '🎯'),
      el('h1', { class: 'center' }, `Twój poziom: ${cefr}`),
      el('p', { class: 'center' }, `Zdobyłeś ${score}/${qs.length}. Zaczniemy od miejsca w sam raz dla Ciebie — ani za łatwo, ani za trudno.`),
      el('button', { class: 'btn btn--gold', type: 'button', onclick: () => onFinish(cefr) }, 'Wchodzę do aplikacji →')
    );
    host.appendChild(screen);
  }

  intro();
}

/* =======================================================================
   DASHBOARD + ŚCIEŻKA
======================================================================= */
function lessonUnlocked(ordered, id, progress) {
  const i = ordered.findIndex((l) => l.id === id);
  if (i <= 0) return true;
  return !!(progress[ordered[i - 1].id] && progress[ordered[i - 1].id].done);
}

export function dashboard(nav) {
  const s = get();
  const ordered = allLessons();
  const prog = s.progress;
  const nextLesson = ordered.find((l) => !(prog[l.id] && prog[l.id].done)) || null;
  const due = dueCards(30);

  const screen = el('div', { class: 'screen' });

  // hero
  const streakTxt = s.streak.count > 0 ? `🔥 ${s.streak.count} ${s.streak.count === 1 ? 'dzień' : 'dni'} z rzędu` : 'Zacznij passę już dziś!';
  screen.append(el('div', { class: 'hero' }, [
    el('div', { class: 'greet' }, '¡Hola, Marcel! 👋'),
    el('div', { class: 'flame' }, streakTxt)
  ]));

  // staty
  screen.append(el('div', { class: 'statgrid' }, [
    stat(s.profile.cefr || 'A0', 'poziom', 'gold'),
    stat(String(s.xp), 'XP', 'blue'),
    stat(String(knownCount()), 'słów', '')
  ]));

  // CTA dnia
  if (nextLesson) {
    screen.append(el('div', { class: 'today', onclick: () => nav.startLesson(nextLesson) }, [
      el('div', { class: 'k' }, 'Lekcja dnia'),
      el('h2', {}, nextLesson.title),
      el('div', { class: 'small' }, nextLesson.subtitle || ''),
      el('button', { class: 'btn btn--gold mt', type: 'button', onclick: (e) => { e.stopPropagation(); nav.startLesson(nextLesson); } }, '▶ Zacznij lekcję')
    ]));
  } else {
    screen.append(el('div', { class: 'today' }, [
      el('div', { class: 'k' }, 'Brawo!'),
      el('h2', {}, 'Ukończyłeś wszystkie lekcje 🎉'),
      el('div', { class: 'small' }, 'Rób powtórki, żeby nie zapomnieć.')
    ]));
  }

  // powtórka SRS
  if (due.length) {
    screen.append(el('button', { class: 'btn btn--green', type: 'button', style: 'margin-bottom:16px',
      onclick: () => startReview(nav, due) }, `🔁 Powtórka: ${due.length} ${due.length === 1 ? 'słówko' : 'słówek'}`));
  }

  // ścieżka
  screen.append(el('h3', { style: 'margin:6px 4px' }, 'Twoja ścieżka'));
  const path = el('div', { class: 'path' });
  UNITS.forEach((u) => {
    path.append(el('div', { class: 'unit__head' }, [
      el('div', { class: 'unit__num' }, String(u.id)),
      el('div', {}, [el('div', { class: 'unit__title' }, u.title), el('div', { class: 'unit__sub' }, u.subtitle || '')])
    ]));
    u.lessons.forEach((l) => {
      const done = !!(prog[l.id] && prog[l.id].done);
      const unlocked = lessonUnlocked(ordered, l.id, prog);
      const isCurrent = nextLesson && nextLesson.id === l.id;
      const cls = 'lessonrow' + (done ? ' done' : '') + (!unlocked ? ' locked' : '') + (isCurrent ? ' current' : '');
      const row = el('div', { class: cls, onclick: () => { if (unlocked) nav.startLesson(l); else toast('🔒 Najpierw ukończ poprzednią lekcję'); } }, [
        el('div', { class: 'bubble' }, done ? '✓' : (unlocked ? '▶' : '🔒')),
        el('div', { class: 'meta' }, [
          el('div', { class: 't' }, l.title),
          el('div', { class: 'd' }, done ? `Najlepszy wynik: ${prog[l.id].best}%` : (l.subtitle || `${l.exercises.length} ćwiczeń`))
        ]),
        el('div', { class: 'chev' }, '›')
      ]);
      path.appendChild(row);
    });
  });
  screen.append(path);

  // stopka
  screen.append(el('button', { class: 'btn btn--ghost', type: 'button', style: 'margin-top:8px', onclick: () => nav.go('settings') }, '⚙️ Ustawienia'));

  return screen;
}

function stat(n, l, color) {
  return el('div', { class: 'stat' }, [el('div', { class: 'n ' + (color || '') }, n), el('div', { class: 'l' }, l)]);
}

/* budowa lekcji-powtórki z kart SRS */
function startReview(nav, dueIds) {
  const byId = Object.fromEntries(VOCAB.map((v) => [v.id, v]));
  const cards = dueIds.map((id) => byId[id]).filter(Boolean).slice(0, 12);
  if (!cards.length) { toast('Brak słówek do powtórki 🎉'); return; }
  const allPl = VOCAB.map((v) => v.pl);
  const exercises = cards.map((c, i) => {
    if (i % 2 === 0) {
      // MC: hiszpańskie → wybierz polskie
      const distractors = shuffle(allPl.filter((p) => p !== c.pl)).slice(0, 3);
      return { type: 'mc', prompt: 'Co to znaczy?', q: c.es, say: c.es,
        options: shuffle([c.pl, ...distractors]), answer: c.pl, word: c.id };
    }
    // tłumaczenie: hiszpańskie → napisz po polsku
    return { type: 'translate', dir: 'es-pl', q: c.es, say: c.es,
      accept: [c.pl], answer: c.pl, word: c.id };
  });
  nav.startReview({ id: 'review', title: 'Powtórka', exercises });
}

/* =======================================================================
   SŁÓWKA
======================================================================= */
export function vocab(nav) {
  let filter = 'all';
  const screen = el('div', { class: 'screen' });
  screen.append(el('h1', {}, '📚 Słówka'));
  const listHost = el('div');

  const filters = [
    { id: 'all', t: 'Wszystkie' }, { id: 'new', t: 'Nowe' },
    { id: 'learning', t: 'Uczę się' }, { id: 'known', t: 'Znane' }, { id: 'chunk', t: 'Zwroty' }
  ];
  const pillRow = el('div', { class: 'vocab-filter' });
  function renderPills() {
    clear(pillRow);
    filters.forEach((f) => pillRow.appendChild(el('button', { class: 'pill' + (filter === f.id ? ' on' : ''), type: 'button',
      onclick: () => { filter = f.id; renderPills(); renderList(); } }, f.t)));
  }
  function renderList() {
    clear(listHost);
    let items = VOCAB.slice();
    if (filter === 'chunk') items = items.filter((v) => v.chunk);
    else if (filter !== 'all') items = items.filter((v) => vocabStatus(v.id) === filter);
    if (!items.length) { listHost.appendChild(el('p', { class: 'center mt' }, 'Pusto tutaj — ucz się dalej! 🌱')); return; }
    items.forEach((v) => {
      const st = vocabStatus(v.id);
      const stLabel = { new: 'nowe', learning: 'uczę się', known: 'znane' }[st];
      listHost.appendChild(el('div', { class: 'vcard', onclick: () => speak(v.es) }, [
        el('div', { class: 'top' }, [
          el('div', {}, [el('div', { class: 'es' }, v.es), el('div', { class: 'pl' }, v.pl)]),
          el('span', { class: 'badge ' + st }, stLabel)
        ]),
        v.ex ? el('span', { class: 'ex' }, `„${v.ex}"`) : null,
        v.chunk ? el('span', { class: 'chunk' }, '🧩 zwrot (chunk)') : null,
        ttsSupported() ? el('div', { class: 'small', style: 'margin-top:6px' }, '🔊 dotknij, aby posłuchać') : null
      ]));
    });
  }
  renderPills(); renderList();
  screen.append(pillRow, listHost);
  return screen;
}

/* =======================================================================
   POSTĘPY
======================================================================= */
export function progress(nav) {
  const s = get();
  const screen = el('div', { class: 'screen' });
  screen.append(el('h1', {}, '📊 Twoje postępy'));

  screen.append(el('div', { class: 'statgrid' }, [
    stat(String(accuracy()) + '%', 'trafność', 'blue'),
    stat(String(gameLevel()), 'poziom gry', 'gold'),
    stat(String(s.streak.count), 'passa', 'red')
  ]));

  // dokładność
  screen.append(el('div', { class: 'card mb' }, [
    el('h3', {}, 'Skuteczność'),
    el('div', { class: 'bar' }, el('span', { style: `width:${accuracy()}%` })),
    el('div', { class: 'small' }, `${s.stats.correct} poprawnych z ${s.stats.answers} odpowiedzi`)
  ]));

  // rozkład SRS
  const dist = boxDistribution();
  const totalCards = Object.values(dist).reduce((a, b) => a + b, 0);
  screen.append(el('div', { class: 'card mb' }, [
    el('h3', {}, 'Pamięć słówek (pudełka powtórek)'),
    el('div', { class: 'small', style: 'margin-bottom:8px' }, `${knownCount()} słów opanowanych, ${totalCards} w nauce`),
    ...[1, 2, 3, 4, 5].map((b) => el('div', { class: 'row', style: 'margin:4px 0' }, [
      el('div', { style: 'width:70px', class: 'small' }, `Pudełko ${b}`),
      el('div', { class: 'bar', style: 'flex:1;margin:0' }, el('span', { style: `width:${totalCards ? (dist[b] / totalCards) * 100 : 0}%` })),
      el('div', { style: 'width:28px;text-align:right', class: 'small' }, String(dist[b]))
    ]))
  ]));

  // słabe strony
  const weak = weakWords(8);
  const weakBox = el('div', { class: 'card mb' }, [el('h3', {}, 'Słabe strony')]);
  if (weak.length) {
    weak.forEach((w) => weakBox.appendChild(el('div', { class: 'weak-item' }, [
      el('span', { class: 'es' }, w.word), el('span', { class: 'small' }, `${w.miss}× pomyłka`)
    ])));
    weakBox.appendChild(el('button', { class: 'btn btn--ghost mt', type: 'button', onclick: () => nav.go('tutor') }, '✨ Poćwicz z AI'));
  } else {
    weakBox.appendChild(el('p', {}, 'Brak słabych punktów — tak trzymaj! 💪'));
  }
  screen.append(weakBox);

  return screen;
}

/* =======================================================================
   TUTOR AI (hub)
======================================================================= */
export function tutor(nav) {
  const screen = el('div', { class: 'screen' });
  screen.append(el('h1', {}, '✨ Tutor AI'));
  screen.append(el('p', {}, 'Prawdziwa innowacja: ucz się mówić, nie tylko klikać.'));

  // 1) Trener wymowy — on-device, zawsze dostępny
  screen.append(el('div', { class: 'card mb', onclick: () => nav.go('pronunciation') }, [
    el('div', { class: 'row' }, [
      el('div', { style: 'font-size:34px' }, '🗣️'),
      el('div', {}, [el('h3', { style: 'margin:0' }, 'Trener wymowy'),
        el('div', { class: 'small' }, asrSupported() ? 'Mów po hiszpańsku — AI ocenia wymowę. Za darmo, na Twoim telefonie.' : 'Słuchaj i powtarzaj (Twoja przeglądarka bez mikrofonu AI).')])
    ]),
    el('button', { class: 'btn btn--gold mt', type: 'button', onclick: (e) => { e.stopPropagation(); nav.go('pronunciation'); } }, '🎤 Ćwicz wymowę')
  ]));

  // 2) Rozmowa z AI — LLM (pluggable)
  const chatCard = el('div', { class: 'card mb' }, [
    el('div', { class: 'row' }, [
      el('div', { style: 'font-size:34px' }, '💬'),
      el('div', {}, [el('h3', { style: 'margin:0' }, 'Rozmowa z tutorem'),
        el('div', { class: 'small' }, 'Gadaj po hiszpańsku z AI — poprawia błędy, tłumaczy po polsku, dopasowuje się do poziomu.')])
    ])
  ]);
  if (AI.available()) {
    chatCard.appendChild(el('button', { class: 'btn btn--green mt', type: 'button', onclick: () => nav.go('aichat') }, '▶ Zacznij rozmowę'));
  } else {
    chatCard.appendChild(el('div', { class: 'soon' }, [
      el('span', { class: 'tag' }, '🔒 Wymaga włączenia'),
      el('div', { class: 'small mt' }, 'Funkcja gotowa — trzeba tylko podłączyć bezpieczny serwer AI (klucz nie trafia do telefonu).'),
      el('button', { class: 'btn btn--ghost mt', type: 'button', onclick: () => nav.go('settings') }, '⚙️ Włącz w Ustawieniach')
    ]));
  }
  screen.append(chatCard);

  // 3) Ćwiczenia adaptacyjne
  const adaptCard = el('div', { class: 'card mb' }, [
    el('div', { class: 'row' }, [
      el('div', { style: 'font-size:34px' }, '🎯'),
      el('div', {}, [el('h3', { style: 'margin:0' }, 'Ćwiczenia szyte na miarę'),
        el('div', { class: 'small' }, 'AI patrzy na Twoje błędy i generuje ćwiczenia właśnie pod nie.')])
    ])
  ]);
  adaptCard.appendChild(el('span', { class: 'tag', style: 'margin-top:10px;display:inline-block' }, AI.available() ? '✅ Dostępne po podłączeniu' : '🔒 Wymaga serwera AI'));
  screen.append(adaptCard);

  screen.append(el('p', { class: 'small center mt' }, '🔒 Prywatność: rozmowy z AI idą przez Twój serwer, klucz API nigdy nie jest w aplikacji.'));
  return screen;
}

/* ---- ekran rozmowy z AI (gdy skonfigurowane) ---- */
export function aiChat(nav) {
  const screen = el('div', { class: 'screen' });
  const history = [];
  screen.append(el('div', { class: 'topbar' }, [
    el('button', { class: 'iconbtn', type: 'button', onclick: () => nav.go('tutor') }, '‹'),
    el('h2', { style: 'margin:0' }, '💬 Rozmowa')
  ]));
  const log = el('div', { class: 'grow', style: 'overflow-y:auto;padding:6px 0' });
  screen.append(log);

  function bubble(role, text) {
    return el('div', { style: `max-width:85%;margin:6px 0;padding:10px 14px;border-radius:14px;${role === 'user' ? 'align-self:flex-end;margin-left:auto;background:#23305a' : 'background:#182238'}` }, text);
  }
  log.style.display = 'flex'; log.style.flexDirection = 'column';
  log.appendChild(bubble('assistant', '¡Hola Marcel! ¿Cómo estás hoy? (Cześć! Jak się masz?)'));

  const input = el('input', { class: 'textin', type: 'text', placeholder: 'Napisz po hiszpańsku…' });
  const sendBtn = el('button', { class: 'btn btn--sm', type: 'button', style: 'width:auto' }, '➤');
  const row = el('div', { class: 'row', style: 'gap:8px;padding-top:8px' }, [input, sendBtn]);
  screen.append(row);

  async function send() {
    const txt = input.value.trim();
    if (!txt) return;
    input.value = '';
    log.appendChild(bubble('user', txt));
    history.push({ role: 'user', content: txt });
    const thinking = bubble('assistant', '…');
    log.appendChild(thinking); log.scrollTop = log.scrollHeight;
    try {
      const reply = await AI.chat(history);
      thinking.textContent = reply;
      history.push({ role: 'assistant', content: reply });
      if (ttsSupported()) speak(reply.replace(/\([^)]*\)/g, ''));
    } catch (e) {
      thinking.textContent = '⚠️ Nie udało się połączyć z AI. Sprawdź konfigurację w Ustawieniach.';
    }
    log.scrollTop = log.scrollHeight;
  }
  sendBtn.onclick = send;
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  return screen;
}

/* =======================================================================
   TRENER WYMOWY (on-device AI)
======================================================================= */
export function pronunciation(nav) {
  const phrases = shuffle(
    VOCAB.filter((v) => v.ex).map((v) => ({ text: v.ex, id: v.id }))
      .concat(VOCAB.map((v) => ({ text: v.es, id: v.id })))
  ).slice(0, 20);
  let i = 0, scores = [];

  const screen = el('div', { class: 'screen' });
  screen.append(el('div', { class: 'topbar' }, [
    el('button', { class: 'iconbtn', type: 'button', onclick: () => nav.go('tutor') }, '‹'),
    el('h2', { style: 'margin:0' }, '🗣️ Trener wymowy')
  ]));
  const card = el('div', { class: 'grow' });
  screen.append(card);

  function render() {
    clear(card);
    if (i >= phrases.length) { done(); return; }
    const p = phrases[i];
    const status = el('div', { class: 'ex__prompt', style: 'min-height:24px;margin-top:10px' }, asrSupported() ? 'Naciśnij mikrofon i przeczytaj na głos.' : 'Posłuchaj i powtórz na głos.');
    card.append(
      el('div', { class: 'small' }, `${i + 1}/${phrases.length}`),
      el('div', { class: 'ex__q mt' }, [el('span', { class: 'es' }, p.text)]),
      ttsSupported() ? el('button', { class: 'speak', type: 'button', onclick: () => speak(p.text) }, [el('span', { class: 'ic' }, '🔊'), 'Posłuchaj wzoru']) : null
    );

    if (asrSupported()) {
      const mic = el('button', { class: 'btn btn--gold mt', type: 'button' }, '🎤 Mów');
      mic.onclick = async () => {
        status.textContent = '🎙️ Słucham…'; mic.textContent = '● Nagrywam'; mic.disabled = true;
        try {
          const r = await listenOnce(p.text);
          scores.push(r.score);
          const emoji = r.score >= 80 ? '🏆' : r.score >= 60 ? '👍' : '💪';
          status.innerHTML = `${emoji} „<b>${r.transcript || '—'}</b>" — <b>${r.score}%</b>`;
          if (r.score >= 60) addXp(5);
        } catch (e) { status.textContent = '⚠️ Problem z mikrofonem — spróbuj ponownie.'; }
        mic.textContent = '🎤 Jeszcze raz'; mic.disabled = false;
      };
      card.append(mic, status, el('button', { class: 'btn btn--ghost mt', type: 'button', onclick: () => { i++; render(); } }, 'Następne →'));
    } else {
      card.append(status, el('button', { class: 'btn btn--green mt', type: 'button', onclick: () => { scores.push(100); i++; render(); } }, 'Powtórzyłem ✓ → dalej'));
    }
  }
  function done() {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    clear(card);
    card.append(
      el('div', { class: 'summary' }, [
        el('div', { class: 'big' }, '🎉'),
        el('h1', {}, 'Koniec sesji wymowy'),
        el('div', { class: 'xpwin' }, asrSupported() ? `Średnia: ${avg}%` : 'Dobra robota!'),
        el('button', { class: 'btn btn--gold mt', type: 'button', onclick: () => { i = 0; scores = []; render(); } }, '↻ Jeszcze raz'),
        el('button', { class: 'btn btn--ghost mt', type: 'button', onclick: () => nav.go('tutor') }, 'Wróć')
      ])
    );
  }
  render();
  return screen;
}

/* =======================================================================
   USTAWIENIA
======================================================================= */
export function settings(nav) {
  const s = get();
  const screen = el('div', { class: 'screen' });
  screen.append(el('div', { class: 'topbar' }, [
    el('button', { class: 'iconbtn', type: 'button', onclick: () => nav.go('dashboard') }, '‹'),
    el('h2', { style: 'margin:0' }, '⚙️ Ustawienia')
  ]));

  // wariant
  screen.append(el('div', { class: 'card mb' }, [
    el('h3', {}, 'Wariant hiszpańskiego'),
    el('div', { class: 'grid2' }, [
      variantBtn('es', '🇪🇸 Hiszpania', s),
      variantBtn('latam', '🌎 Ameryka Łac.', s)
    ])
  ]));

  // AI proxy
  const cfg = AI.getConfig();
  const endpoint = el('input', { class: 'textin', type: 'url', placeholder: 'https://twoj-serwer/ai', value: cfg.endpoint || '' });
  const model = el('input', { class: 'textin', type: 'text', placeholder: 'model (np. claude-haiku-4-5)', value: cfg.model || '', style: 'margin-top:8px' });
  screen.append(el('div', { class: 'card mb' }, [
    el('h3', {}, '✨ Rozmowa z AI (opcjonalne)'),
    el('p', { class: 'small' }, 'Aby włączyć rozmowę z tutorem, podaj adres swojego bezpiecznego serwera (proxy), który trzyma klucz API. Klucz NIE jest zapisywany w aplikacji — zostaje na serwerze.'),
    endpoint, model,
    el('button', { class: 'btn btn--green mt', type: 'button', onclick: () => {
      AI.setConfig({ endpoint: endpoint.value.trim(), model: model.value.trim() });
      toast(AI.available() ? '✅ AI włączone' : 'Zapisano (podaj poprawny URL)');
    } }, 'Zapisz konfigurację AI')
  ]));

  // dane / reset
  screen.append(el('div', { class: 'card mb' }, [
    el('h3', {}, 'Dane'),
    el('div', { class: 'small' }, `Poziom: ${s.profile.cefr} · XP: ${s.xp} · Passa: ${s.streak.count}`),
    el('button', { class: 'btn btn--ghost mt', type: 'button', onclick: () => {
      if (confirm('Na pewno wyzerować CAŁY postęp Marcela? Tego nie da się cofnąć.')) { reset(); toast('Zresetowano'); nav.onboarding(); }
    } }, '🗑️ Zresetuj postęp')
  ]));

  screen.append(el('p', { class: 'small center' }, '¡Vamos! v1 · zrobione dla Marcela ❤️'));
  return screen;
}

function variantBtn(v, label, s) {
  return el('button', { class: 'option' + (s.profile.variant === v ? ' sel' : ''), type: 'button', style: 'justify-content:center',
    onclick: (e) => { patchProfile({ variant: v }); document.querySelectorAll('.grid2 .option').forEach((b) => b.classList.remove('sel')); e.currentTarget.classList.add('sel'); toast('Zapisano wariant'); } }, label);
}
