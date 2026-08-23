/* exercises.js — renderery i sprawdzanie ćwiczeń.
   Każdy typ zwraca obiekt: { type, word, mount(host), check(), lock() }.
   ctx = { onReady(bool) } — sygnalizuje runnerowi, że można kliknąć „Sprawdź".
   Typy: mc, translate, fill, build, match, speak (wymowa — AI on-device).      */

import { el, clear, shuffle } from './dom.js';
import { speak as ttsSpeak, ttsSupported, asrSupported, listenOnce, pronunciationScore } from './speech.js';

/** Normalizacja odpowiedzi tekstowych (tolerancyjna dla początkującego). */
function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!.,;:"'()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Przycisk lektora (TTS) — czyta hiszpański tekst. */
function speakBtn(text) {
  if (!text || !ttsSupported()) return null;
  return el('button', {
    class: 'speak', type: 'button',
    onclick: () => ttsSpeak(text)
  }, [el('span', { class: 'ic' }, '🔊'), 'Posłuchaj']);
}

/* ============================ MULTIPLE CHOICE ============================ */
function mcExercise(ex, ctx) {
  let selected = null, locked = false;
  const opts = shuffle(ex.options);
  const nodes = new Map();
  const host = el('div', { class: 'ex' });

  function build() {
    clear(host);
    host.append(
      el('div', { class: 'ex__prompt' }, ex.prompt || 'Wybierz poprawną odpowiedź:'),
      el('div', { class: 'ex__q' }, ex.q),
      ex.say ? speakBtn(ex.say) : (nothing()),
      (() => {
        const box = el('div', { class: 'options' });
        opts.forEach((o) => {
          const b = el('button', {
            class: 'option', type: 'button',
            onclick: () => { if (locked) return; select(o); }
          }, o);
          nodes.set(o, b);
          box.appendChild(b);
        });
        return box;
      })()
    );
  }
  function select(o) {
    selected = o;
    nodes.forEach((b, k) => b.classList.toggle('sel', k === o));
    ctx.onReady(true);
  }
  return {
    type: 'mc', word: ex.word || null,
    mount(h) { build(); h.appendChild(host); },
    check() { return { correct: selected === ex.answer, expected: ex.answer, given: selected }; },
    lock() {
      locked = true;
      nodes.forEach((b, k) => {
        if (k === ex.answer) b.classList.add('ok');
        else if (k === selected) b.classList.add('err');
      });
    }
  };
}

/* ============================== TRANSLATE =============================== */
function translateExercise(ex, ctx) {
  let input, locked = false;
  const accept = (ex.accept || [ex.answer]).map(norm);
  const host = el('div', { class: 'ex' });
  const dirLabel = ex.dir === 'pl-es' ? 'Napisz po hiszpańsku:' : 'Napisz po polsku:';
  const sayText = ex.say || (ex.dir !== 'pl-es' ? ex.q : ex.answer);

  return {
    type: 'translate', word: ex.word || null,
    mount(h) {
      input = el('input', {
        class: 'textin', type: 'text', autocomplete: 'off', autocapitalize: 'off',
        spellcheck: false, placeholder: 'Twoja odpowiedź…',
        oninput: () => ctx.onReady(input.value.trim().length > 0)
      });
      host.append(
        el('div', { class: 'ex__prompt' }, ex.prompt || dirLabel),
        el('div', { class: 'ex__q' }, ex.q),
        (ex.dir !== 'pl-es' && ttsSupported()) ? speakBtn(sayText) : nothing(),
        input
      );
      h.appendChild(host);
      setTimeout(() => input.focus(), 60);
    },
    check() {
      const given = input.value.trim();
      const correct = accept.includes(norm(given));
      return { correct, expected: ex.answer, given };
    },
    lock() { locked = true; input.disabled = true; }
  };
}

/* ================================ FILL ================================= */
function fillExercise(ex, ctx) {
  let selected = null, locked = false, blankSpan;
  const opts = shuffle(ex.options);
  const nodes = new Map();
  const host = el('div', { class: 'ex' });
  const parts = ex.q.split('___');

  return {
    type: 'fill', word: ex.word || null,
    mount(h) {
      blankSpan = el('span', { class: 'es' }, '_____');
      const sentence = el('div', { class: 'ex__q' }, [parts[0] || '', blankSpan, parts[1] || '']);
      const box = el('div', { class: 'options' });
      opts.forEach((o) => {
        const b = el('button', { class: 'option', type: 'button',
          onclick: () => { if (locked) return; selected = o; blankSpan.textContent = o;
            nodes.forEach((n, k) => n.classList.toggle('sel', k === o)); ctx.onReady(true); }
        }, o);
        nodes.set(o, b); box.appendChild(b);
      });
      host.append(
        el('div', { class: 'ex__prompt' }, ex.prompt || 'Uzupełnij lukę:'),
        sentence,
        ex.say ? speakBtn(ex.say) : nothing(),
        box
      );
      h.appendChild(host);
    },
    check() { return { correct: selected === ex.answer, expected: ex.answer, given: selected }; },
    lock() {
      locked = true;
      if (selected !== ex.answer) blankSpan.textContent = ex.answer;
      nodes.forEach((b, k) => { if (k === ex.answer) b.classList.add('ok'); else if (k === selected) b.classList.add('err'); });
    }
  };
}

/* ============================ SENTENCE BUILDER ========================== */
function buildExercise(ex, ctx) {
  let locked = false;
  const answer = ex.answer;                    // tablica słów w poprawnej kolejności
  const bank = shuffle(answer.map((w, i) => ({ w, id: i })));
  const placed = [];                           // { w, id }
  const host = el('div', { class: 'ex' });
  let answerRow, bankRow;
  const bankBtns = new Map();

  function refresh() {
    clear(answerRow);
    placed.forEach((tok) => {
      answerRow.appendChild(el('button', { class: 'token placed', type: 'button',
        onclick: () => { if (locked) return; unplace(tok); } }, tok.w));
    });
    bankBtns.forEach((btn, id) => btn.classList.toggle('used', placed.some((p) => p.id === id)));
    ctx.onReady(placed.length === answer.length);
  }
  function place(tok) { placed.push(tok); refresh(); }
  function unplace(tok) { const i = placed.findIndex((p) => p.id === tok.id); if (i >= 0) placed.splice(i, 1); refresh(); }

  return {
    type: 'build', word: ex.word || null,
    mount(h) {
      answerRow = el('div', { class: 'build-answer' });
      bankRow = el('div', { class: 'build-bank' });
      bank.forEach((tok) => {
        const b = el('button', { class: 'token', type: 'button',
          onclick: () => { if (locked) return; if (!placed.some((p) => p.id === tok.id)) place(tok); } }, tok.w);
        bankBtns.set(tok.id, b); bankRow.appendChild(b);
      });
      host.append(
        el('div', { class: 'ex__prompt' }, ex.prompt || 'Ułóż zdanie z klocków:'),
        ex.q ? el('div', { class: 'ex__q' }, ex.q) : nothing(),
        ex.say ? speakBtn(ex.say) : nothing(),
        answerRow, bankRow
      );
      refresh();
      h.appendChild(host);
    },
    check() {
      const given = placed.map((p) => p.w).join(' ');
      const correct = norm(given) === norm(answer.join(' '));
      return { correct, expected: answer.join(' '), given };
    },
    lock() { locked = true; }
  };
}

/* ============================ PAIR MATCHING ============================= */
function matchExercise(ex, ctx) {
  let selEs = null, wrongAttempts = 0, matched = 0, locked = false;
  const host = el('div', { class: 'ex' });
  const pairs = ex.pairs;
  const left = shuffle(pairs.map((p, i) => ({ txt: p.es, key: i })));
  const right = shuffle(pairs.map((p, i) => ({ txt: p.pl, key: i })));
  const lnodes = new Map(), rnodes = new Map();
  let selNode = null;

  function tryMatch(rKey, rNode) {
    if (selEs == null) return;
    if (selEs === rKey) {
      lnodes.get(selEs).classList.add('ok'); rNode.classList.add('ok');
      matched++;
      selEs = null; selNode = null;
      if (matched === pairs.length) ctx.onReady(true);
    } else {
      wrongAttempts++;
      rNode.classList.add('err');
      setTimeout(() => rNode.classList.remove('err'), 320);
      if (selNode) selNode.classList.remove('sel');
      selEs = null; selNode = null;
    }
  }

  return {
    type: 'match', word: ex.word || null,
    mount(h) {
      const cols = el('div', { class: 'match-cols' });
      const colL = el('div', { class: 'stack' });
      const colR = el('div', { class: 'stack' });
      left.forEach((o) => {
        const n = el('button', { class: 'match-item', type: 'button',
          onclick: () => { if (locked || n.classList.contains('ok')) return;
            lnodes.forEach((x) => x.classList.remove('sel')); n.classList.add('sel'); selEs = o.key; selNode = n; } }, o.txt);
        lnodes.set(o.key, n); colL.appendChild(n);
      });
      right.forEach((o) => {
        const n = el('button', { class: 'match-item', type: 'button',
          onclick: () => { if (locked || n.classList.contains('ok')) return; tryMatch(o.key, n); } }, o.txt);
        rnodes.set(o.key, n); colR.appendChild(n);
      });
      cols.append(colL, colR);
      host.append(
        el('div', { class: 'ex__prompt' }, ex.prompt || 'Połącz pary (hiszpański → polski):'),
        cols
      );
      h.appendChild(host);
    },
    check() {
      return { correct: wrongAttempts === 0, expected: pairs.map((p) => `${p.es} = ${p.pl}`).join(', '),
               given: wrongAttempts === 0 ? 'bez błędów' : `pomyłki: ${wrongAttempts}` };
    },
    lock() { locked = true; }
  };
}

/* ===================== SPEAK — TRENER WYMOWY (AI) ====================== */
function speakExercise(ex, ctx) {
  let result = null, locked = false, listening = false;
  const target = ex.q;                         // hiszpańskie zdanie do wymówienia
  const host = el('div', { class: 'ex' });
  let statusEl, micBtn;
  const THRESHOLD = 60;                          // % podobieństwa = zaliczone

  async function doListen() {
    if (locked || listening) return;
    listening = true;
    statusEl.textContent = '🎙️ Słucham… mów teraz';
    micBtn.textContent = '● Nagrywam';
    try {
      const r = await listenOnce(target, { onStart: () => {} });
      result = r;
      statusEl.innerHTML = `Usłyszałem: „<b>${r.transcript || '—'}</b>" — trafność <b>${r.score}%</b>`;
      ctx.onReady(true);
    } catch (e) {
      statusEl.textContent = '⚠️ Nie udało się nagrać (sprawdź pozwolenie na mikrofon). Spróbuj ponownie.';
    } finally {
      listening = false;
      micBtn.textContent = '🎤 Mów';
    }
  }

  return {
    type: 'speak', word: ex.word || null,
    mount(h) {
      host.append(
        el('div', { class: 'ex__prompt' }, '🗣️ Trener wymowy — powiedz na głos:'),
        el('div', { class: 'ex__q' }, [el('span', { class: 'es' }, target)]),
        speakBtn(ex.say || target) || nothing()
      );
      if (asrSupported()) {
        statusEl = el('div', { class: 'ex__prompt', style: 'min-height:22px;margin-top:6px' }, 'Naciśnij i przeczytaj zdanie po hiszpańsku.');
        micBtn = el('button', { class: 'btn btn--gold mt', type: 'button', onclick: doListen }, '🎤 Mów');
        host.append(micBtn, statusEl);
      } else {
        // Fallback bez mikrofonu: „słuchaj i powtórz" — samoocena.
        statusEl = el('div', { class: 'ex__prompt', style: 'margin-top:6px' }, 'Twoja przeglądarka nie ma rozpoznawania mowy — posłuchaj i powtórz na głos.');
        const ok = el('button', { class: 'btn btn--green mt', type: 'button',
          onclick: () => { if (locked) return; result = { transcript: '(powtórzone)', score: 100 }; statusEl.textContent = '✓ Świetnie, ćwicz dalej!'; ctx.onReady(true); } },
          'Powtórzyłem na głos ✓');
        host.append(ok, statusEl);
      }
      h.appendChild(host);
    },
    check() {
      const score = result ? result.score : 0;
      return { correct: score >= THRESHOLD, expected: target, given: result ? `${result.transcript} (${score}%)` : '—' };
    },
    lock() { locked = true; if (micBtn) micBtn.disabled = true; }
  };
}

/* pusty węzeł-zaślepka, żeby append() nie krzyczał na null */
function nothing() { return document.createComment('x'); }

const FACTORIES = {
  mc: mcExercise,
  translate: translateExercise,
  fill: fillExercise,
  build: buildExercise,
  match: matchExercise,
  speak: speakExercise
};

export function createExercise(ex, ctx) {
  const factory = FACTORIES[ex.type];
  if (!factory) throw new Error('Nieznany typ ćwiczenia: ' + ex.type);
  return factory(ex, ctx);
}

export const EX_TYPES = Object.keys(FACTORIES);
