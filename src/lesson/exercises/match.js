/*
 * Match pairs: Luganda on the left, English on the right. Pick one from
 * each column; a right pair locks in, a wrong pair shakes. The exercise
 * finishes itself once every pair is matched.
 */
import { escapeHtml } from '../../ui/components.js';

export function renderMatch(ex, el, api) {
  const byId = Object.fromEntries(ex.pairs.map((p) => [p.id, p]));
  let pick = null; // { side, id, el }
  let matched = 0;
  el.innerHTML = `
    <div class="ex ex--match">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-match__grid">
        <div class="ex-match__col">${ex.left.map((id, i) => `<button class="tile" type="button" data-side="lg" data-id="${id}" lang="lg"><span class="choice__key">${i + 1}</span>${escapeHtml(byId[id].lg)}</button>`).join('')}</div>
        <div class="ex-match__col">${ex.right.map((id, i) => `<button class="tile" type="button" data-side="en" data-id="${id}"><span class="choice__key">${i + 1 + ex.left.length}</span>${escapeHtml(byId[id].en)}</button>`).join('')}</div>
      </div>
    </div>`;

  const tiles = [...el.querySelectorAll('[data-side]')];

  function choose(btn) {
    if (btn.disabled) return;
    if (!pick || pick.side === btn.dataset.side) {
      tiles.forEach((t) => t.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      pick = { side: btn.dataset.side, id: btn.dataset.id, el: btn };
      return;
    }
    const a = pick.el;
    pick = null;
    a.classList.remove('is-selected');
    if (a.dataset.id === btn.dataset.id) {
      for (const t of [a, btn]) {
        t.classList.add('is-correct');
        t.disabled = true;
        setTimeout(() => t.classList.add('is-used'), 350);
      }
      matched += 1;
      if (matched === ex.pairs.length) setTimeout(() => api.complete(true), 450);
    } else {
      api.miss([a.dataset.id, btn.dataset.id]);
      for (const t of [a, btn]) {
        t.classList.add('is-wrong');
        setTimeout(() => t.classList.remove('is-wrong'), 400);
      }
    }
  }

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-side]');
    if (btn) choose(btn);
  });

  api.setReady(false, { hideCheck: true });
  return {
    keydown(e) {
      const n = Number(e.key);
      if (n >= 1 && n <= tiles.length) {
        choose(tiles[n - 1]);
        return true;
      }
      return false;
    },
    check: () => ({ correct: true }),
  };
}
