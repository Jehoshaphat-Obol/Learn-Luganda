/* The shop: spend gems on streak freezes, heart refills and avatar frames. */
import '../styles/shop.css';
import { store } from '../state/store.js';
import { SHOP_ITEMS, buy, canBuy } from '../state/shop.js';
import { heartStatus, formatWait } from '../state/hearts.js';
import { button, escapeHtml, toast } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { avatar } from '../ui/avatar.js';

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
            <p class="eyebrow">Shop</p>
            <h1>Spend your <strong>gems.</strong></h1>
          </div>
          <span class="shop-balance" aria-label="${state.gems} gems">${icon('gem', { size: 26 })}${state.gems}</span>
        </header>
        <p class="muted shop-earn">Earn gems by finishing lessons, practising, reaching streak milestones and unlocking achievements.</p>
        <ul class="shop-list">
          ${SHOP_ITEMS.map((item) => {
            const check = canBuy(state, item);
            const owned = item.cosmetic && state.inventory[item.id];
            const equipped = owned && state.profile.avatar.frame === item.id;
            const action = owned
              ? button({ label: equipped ? 'Unequip' : 'Equip', variant: 'secondary', attrs: `data-equip="${item.id}"` })
              : button({ label: `${item.price}`, iconName: 'gem', variant: check.ok ? 'blue' : 'secondary', disabled: !check.ok, attrs: `data-buy="${item.id}" aria-label="Buy ${escapeHtml(item.title)} for ${item.price} gems${check.ok ? '' : `, ${check.reason}`}"` });
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
      toast(ok ? `${item.title} bought!` : 'Couldn’t buy that right now.', { variant: ok ? 'success' : 'error' });
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
