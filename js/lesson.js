/* lesson.js — runner pojedynczej lekcji.
   Przechodzi przez ćwiczenia: pasek postępu, 5 serduszek, feedback,
   XP + streak, aktualizacja SRS, ekran podsumowania z listą błędów.          */

import { el, clear, toast, floatXp, confetti } from './dom.js';
import { createExercise } from './exercises.js';
import { review } from './srs.js';
import {
  recordAnswer, completeLesson, addXp, touchStreak, setVocabStatus, vocabStatus
} from './storage.js';

const PRAISE = ['¡Correcto!', '¡Muy bien!', '¡Genial!', '¡Perfecto!', '¡Excelente!'];

export function runLesson(host, lesson, { onDone, onExit }) {
  const exercises = lesson.exercises || [];
  const total = exercises.length;
  let idx = 0, hearts = 5, xpGained = 0, correctCount = 0;
  const mistakes = [];

  const screen = el('div', { class: 'screen' });
  host.appendChild(screen);

  function heartsRow() {
    const row = el('div', { class: 'hearts' });
    for (let i = 0; i < 5; i++) row.appendChild(el('span', { class: 'h' + (i >= hearts ? ' dead' : '') }, '❤️'));
    return row;
  }

  function renderExercise() {
    clear(screen);
    const ex = exercises[idx];
    let ready = false, checked = false, exObj;

    // ---- topbar ----
    const bar = el('div', { class: 'progressbar' }, el('span', { style: `width:${(idx / total) * 100}%` }));
    const top = el('div', { class: 'topbar' }, [
      el('button', { class: 'iconbtn', type: 'button', onclick: confirmExit }, '✕'),
      bar,
      heartsRow()
    ]);

    // ---- host ćwiczenia ----
    const exHost = el('div', { class: 'grow' });

    // ---- footbar (feedback + akcja) ----
    const foot = el('div', { class: 'footbar' });
    const fbSlot = el('div');
    const actionBtn = el('button', { class: 'btn', type: 'button', disabled: true }, 'Sprawdź');
    foot.append(fbSlot, actionBtn);

    exObj = createExercise(ex, { onReady: (v) => { ready = v; if (!checked) actionBtn.disabled = !v; } });
    exObj.mount(exHost);

    actionBtn.onclick = () => {
      if (!checked) {
        if (!ready) return;
        checked = true;
        const r = exObj.check();
        exObj.lock();
        handleResult(ex, exObj, r, fbSlot, actionBtn);
      } else {
        idx++;
        if (idx >= total) finish();
        else renderExercise();
      }
    };

    screen.append(top, exHost, foot);
  }

  function handleResult(ex, exObj, r, fbSlot, actionBtn) {
    const word = exObj.word;
    recordAnswer({ type: exObj.type, correct: r.correct, word });
    if (word) {
      review(word, r.correct);
    }

    clear(fbSlot);
    if (r.correct) {
      correctCount++;
      const gain = 10;
      xpGained += gain;
      addXp(gain);
      floatXp(gain, actionBtn);
      fbSlot.appendChild(el('div', { class: 'feedback ok' }, [
        el('div', { class: 'ttl' }, ['✓ ', PRAISE[Math.floor(Math.random() * PRAISE.length)]])
      ]));
      actionBtn.className = 'btn btn--green';
    } else {
      hearts = Math.max(0, hearts - 1);
      mistakes.push({ es: r.expected, given: r.given, word, q: ex.q });
      fbSlot.appendChild(el('div', { class: 'feedback err' }, [
        el('div', { class: 'ttl' }, '✗ Prawie!'),
        el('div', { class: 'corr' }, ['Poprawnie: ', el('b', { class: 'es' }, String(r.expected))])
      ]));
      actionBtn.className = 'btn';
      // odśwież serduszka w topbarze
      const hr = screen.querySelector('.hearts');
      if (hr) hr.replaceWith(heartsRow());
    }

    if (hearts <= 0) { actionBtn.textContent = 'Zobacz wynik'; actionBtn.onclick = () => failScreen(); }
    else actionBtn.textContent = (idx + 1 >= total) ? 'Zakończ' : 'Dalej';
  }

  function finish() {
    const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
    completeLesson(lesson.id, accuracy);
    const streak = touchStreak();
    // bonusy
    let bonus = 15;
    if (mistakes.length === 0) bonus += 15;
    addXp(bonus); xpGained += bonus;
    confetti();
    summaryScreen(accuracy, streak, bonus);
  }

  function summaryScreen(accuracy, streak, bonus) {
    clear(screen);
    const perfect = mistakes.length === 0;
    const box = el('div', { class: 'summary' });
    box.append(
      el('div', { class: 'big' }, perfect ? '🏆' : '🎉'),
      el('h1', {}, perfect ? '¡Perfecto!' : '¡Lección completada!'),
      el('div', { class: 'xpwin' }, `+${xpGained} XP`),
      el('div', { class: 'chips' }, [
        el('div', { class: 'chip' }, `🎯 ${accuracy}% trafności`),
        el('div', { class: 'chip' }, `🔥 ${streak} dni z rzędu`),
        el('div', { class: 'chip' }, `⭐ bonus +${bonus}`)
      ])
    );
    if (mistakes.length) {
      box.append(el('h3', { class: 'mt' }, 'Do powtórki:'));
      const list = el('div', { class: 'mistake-list' });
      mistakes.forEach((m) => list.appendChild(el('div', { class: 'mistake' }, [
        el('span', { class: 'es' }, String(m.es)),
        el('span', { class: 'pl' }, m.given ? `Ty: ${m.given}` : '—')
      ])));
      box.append(list);
    } else {
      box.append(el('p', { class: 'center mt' }, 'Zero błędów — świetna robota! 💪'));
    }
    box.append(el('button', { class: 'btn btn--gold mt', type: 'button', onclick: () => onDone && onDone({ accuracy, xpGained }) }, 'Kontynuuj →'));
    screen.appendChild(box);
    toast(`+${xpGained} XP`, 'xp');
  }

  function failScreen() {
    clear(screen);
    const box = el('div', { class: 'summary' });
    box.append(
      el('div', { class: 'big' }, '💔'),
      el('h1', {}, 'Koniec serc!'),
      el('p', { class: 'center' }, 'Nic się nie stało — powtórka to najlepsza nauka. Spróbuj jeszcze raz.'),
      el('div', { class: 'chips' }, [ el('div', { class: 'chip' }, `+${xpGained} XP za próbę` ) ]),
      el('button', { class: 'btn mt', type: 'button', onclick: () => { restart(); } }, '↻ Spróbuj ponownie'),
      el('button', { class: 'btn btn--ghost mt', type: 'button', onclick: () => onExit && onExit() }, 'Wróć do ścieżki')
    );
    screen.appendChild(box);
  }

  function restart() {
    idx = 0; hearts = 5; xpGained = 0; correctCount = 0; mistakes.length = 0;
    renderExercise();
  }

  function confirmExit() {
    if (confirm('Przerwać lekcję? Postęp tej lekcji nie zostanie zapisany.')) onExit && onExit();
  }

  renderExercise();
}
