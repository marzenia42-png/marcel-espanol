/* dom.js — mikro-helper do budowy DOM bez frameworka. */

/** Tworzy element. props: atrybuty/właściwości; on* = eventy; children = string|Node|array. */
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k in node && k !== 'list') node[k] = v;
    else node.setAttribute(k, v);
  }
  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  return node;
}

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

export function mount(host, node) { clear(host); host.appendChild(node); return node; }

/** Tasowanie kopii tablicy (Fisher–Yates). */
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Bezpieczny escape do wstawiania w html. */
export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/** Krótki toast na górze ekranu. */
export function toast(msg, kind = '') {
  const layer = document.getElementById('toast-layer');
  if (!layer) return;
  const t = el('div', { class: 'toast ' + kind }, msg);
  layer.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 1400);
  setTimeout(() => t.remove(), 1800);
}

/** Pływający „+XP" przy danym elemencie. */
export function floatXp(amount, anchor) {
  const f = el('div', { class: 'floatxp' }, '+' + amount + ' XP');
  const r = anchor ? anchor.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
  f.style.left = (r.left + (anchor ? r.width / 2 - 20 : 0)) + 'px';
  f.style.top = (r.top - 10) + 'px';
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1000);
}

/** Prosty deszcz konfetti (podsumowanie lekcji). */
export function confetti() {
  const colors = ['#ef4444', '#f5b301', '#22c55e', '#3b82f6', '#8b5cf6'];
  const wrap = el('div', { class: 'confetti' });
  for (let i = 0; i < 40; i++) {
    const c = el('div', {}, '');
    Object.assign(c.style, {
      position: 'absolute', width: '9px', height: '14px',
      left: Math.random() * 100 + '%', top: '-20px',
      background: colors[i % colors.length], opacity: '0.9',
      transform: `rotate(${Math.random() * 360}deg)`,
      borderRadius: '2px'
    });
    const dur = 1.2 + Math.random() * 1.3;
    c.animate([
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${window.innerHeight + 40}px) rotate(${Math.random() * 720}deg)`, opacity: 0.6 }
    ], { duration: dur * 1000, easing: 'ease-in' });
    wrap.appendChild(c);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 2600);
}
