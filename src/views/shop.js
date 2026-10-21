/* Gems: earned only by learning, spent on streak freezes, heart refills and avatar frames. */
import '../styles/shop.css';
import { store } from '../state/store.js';
import { SHOP_ITEMS, buy, canBuy, earnRules } from '../state/shop.js';
import { GEMS_PER_TIER } from '../state/achievements.js';
import { heartStatus, formatWait } from '../state/hearts.js';
import { button, escapeHtml, toast } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { avatar } from '../ui/avatar.js';
import { play } from '../ui/sound.js';

function itemArt(item, state) {
  if (item.cosmetic) return avatar({ ...state.profile.avatar, frame: item.id }, { size: 56 });
  return `<span class="shop-item__icon shop-item__icon--${item.id}">${icon(item.icon, { size: 30 })}</span>`;
}

function itemNote(item, state) {
  if (item.id === 'freeze') return `${state.streak.freezes} of 2 equipped`;
  if (item.id === 'refill') {
    const h = heartStatus(state);
    return h.full ? 'Hearts are full' : `${h.count} of ${h.max} · next in ${formatWait(h.nextAt - Date.now())}`;
  }
  if (item.cosmetic && state.inventory[item.id]) return state.profile.avatar.frame === item.id ? 'Equipped' : 'Owned';
  return '';
}

export function shopView({ root }) {
  function draw() {
    const state = store.get();
    root.innerHTML = `
      <div class="page">
        <header class="page__header shop-header">
          <div>
            <p class="eyebrow">Gems</p>
            <h1>Use your <strong>gems.</strong></h1>
          </div>
          <span class="shop-balance" aria-label="${state.gems} gems">${icon('gem', { size: 26 })}${state.gems}</span>
        </header>
        <p class="muted shop-earn">Gems can’t be bought. You earn every one by learning, then use them to protect your streak, refill hearts or decorate your avatar.</p>
        <ul class="shop-list">
          ${SHOP_ITEMS.map((item) => {
            const check = canBuy(state, item);
            const owned = item.cosmetic && state.inventory[item.id];
            const equipped = owned && state.profile.avatar.frame === item.id;
            const action = owned
              ? button({ label: equipped ? 'Unequip' : 'Equip', variant: 'secondary', attrs: `data-equip="${item.id}"` })
              : button({ label: `${item.price}`, iconName: 'gem', variant: check.ok ? 'blue' : 'secondary', disabled: !check.ok, attrs: `data-buy="${item.id}" aria-label="Get ${escapeHtml(item.title)} for ${item.price} gems${check.ok ? '' : `, ${check.reason}`}"` });
            return `<li class="shop-item">
              ${itemArt(item, state)}
              <div class="shop-item__body">
                <h2>${escapeHtml(item.title)}</h2>
                <p class="muted">${escapeHtml(item.description)}</p>
                ${itemNote(item, state) ? `<p class="shop-item__note">${escapeHtml(itemNote(item, state))}</p>` : ''}
              </div>
              <div class="shop-item__action">${action}</div>
            </li>`;
          }).join('')}
        </ul>
        <section class="shop-rules" aria-labelledby="shop-rules-title">
          <h2 id="shop-rules-title">How to earn gems</h2>
          <ul>${earnRules({ perTier: GEMS_PER_TIER }).map((r) => `<li><span>${escapeHtml(r.label)}</span><span class="shop-rules__gems">${icon('gem', { size: 14 })}${escapeHtml(r.gems)}</span></li>`).join('')}</ul>
        </section>
      </div>`;
  }

  root.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('[data-buy]');
    if (buyBtn && !buyBtn.disabled) {
      const item = SHOP_ITEMS.find((i) => i.id === buyBtn.dataset.buy);
      let ok = false;
      store.update((s) => {
        ok = buy(s, item.id);
      });
      play(ok ? 'reward' : 'wrong');
      toast(ok ? `${item.title} unlocked!` : 'Not available right now.', { variant: ok ? 'success' : 'error' });
      draw();
      return;
    }
    const equip = e.target.closest('[data-equip]');
    if (equip) {
      store.update((s) => {
        s.profile.avatar.frame = s.profile.avatar.frame === equip.dataset.equip ? null : equip.dataset.equip;
      });
      draw();
    }
  });
  draw();
}
