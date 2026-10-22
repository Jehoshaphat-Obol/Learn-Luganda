/*
 * Small UI building blocks. Markup helpers return HTML strings so views can
 * compose them with template literals; `openModal` and `toast` manage their
 * own DOM because they float above the current view.
 */
import { t } from '../i18n/index.js';
import { icon } from './icons.js';

export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * A chunky pressable button.
 * @param {{ label: string, variant?: 'primary'|'secondary'|'ghost'|'success'|'danger'|'blue',
 *   size?: 'md'|'lg', href?: string, attrs?: string, block?: boolean, disabled?: boolean, iconName?: string,
 *   labelHtml?: string }} o  `labelHtml` (already safe HTML) replaces `label`
 */
export function button({ label, labelHtml, variant = 'primary', size = 'md', href, attrs = '', block = false, disabled = false, iconName }) {
  const cls = `btn btn--${variant}${size === 'lg' ? ' btn--lg' : ''}${block ? ' btn--block' : ''}`;
  const inner = `${iconName ? icon(iconName, { size: 20 }) : ''}<span>${labelHtml ?? escapeHtml(label)}</span>`;
  if (href) return `<a class="${cls}" href="${href}" ${attrs}>${inner}</a>`;
  return `<button class="${cls}" type="button" ${disabled ? 'disabled' : ''} ${attrs}>${inner}</button>`;
}

/** Horizontal progress bar; `value` from 0 to 1. */
export function progressBar(value, { label = t('ui.progress'), variant = 'primary' } = {}) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return `<div class="progress progress--${variant}" role="progressbar" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
    <div class="progress__fill" style="width:${pct}%"></div>
  </div>`;
}

/** A circular ring, e.g. the daily goal; `value` from 0 to 1. */
export function ring(value, { size = 56, stroke = 6, content = '', label = t('ui.progress') } = {}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return `<div class="ring" style="width:${size}px;height:${size}px" role="img" aria-label="${escapeHtml(label)}: ${Math.round(v * 100)}%">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring__track" stroke-width="${stroke}" fill="none"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring__fill" stroke-width="${stroke}" fill="none"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - v)}" transform="rotate(-90 ${size / 2} ${size / 2})" stroke-linecap="round"/>
    </svg>
    <div class="ring__content">${content}</div>
  </div>`;
}

export function pill(text, { variant = 'neutral', iconName } = {}) {
  return `<span class="pill pill--${variant}">${iconName ? icon(iconName, { size: 16 }) : ''}${escapeHtml(text)}</span>`;
}

/** A speech bubble, used when the mascot or cast talk to the learner. */
export function speech(text, { tail = 'left' } = {}) {
  return `<div class="speech speech--${tail}">${text}</div>`;
}

let toastHost;

/** Shows a short message at the bottom of the screen. */
export function toast(message, { variant = 'neutral', duration = 2600 } = {}) {
  if (!toastHost) {
    toastHost = document.createElement('div');
    toastHost.className = 'toast-host';
    toastHost.setAttribute('role', 'status');
    toastHost.setAttribute('aria-live', 'polite');
    document.body.append(toastHost);
  }
  const el = document.createElement('div');
  el.className = `toast toast--${variant}`;
  el.textContent = message;
  toastHost.append(el);
  setTimeout(() => {
    el.classList.add('toast--leaving');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

/**
 * Opens a modal dialog (a bottom sheet on small screens).
 * Resolves with the `value` of the action clicked, or null when dismissed.
 * @param {{ title: string, body?: string, art?: string,
 *   actions?: Array<{ label: string, value: string, variant?: string }>, dismissible?: boolean }} options
 */
export function openModal({ title, body = '', art = '', actions = [{ label: t('ui.ok'), value: 'ok' }], dismissible = true }) {
  return new Promise((resolve) => {
    const previous = document.activeElement;
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        ${dismissible ? `<button class="icon-btn modal__close" type="button" data-value="" aria-label="${escapeHtml(t('ui.close'))}">${icon('close', { size: 20 })}</button>` : ''}
        ${art ? `<div class="modal__art">${art}</div>` : ''}
        <h2 id="modal-title" class="modal__title">${escapeHtml(title)}</h2>
        ${body ? `<div class="modal__body">${body}</div>` : ''}
        <div class="modal__actions">
          ${actions.map((a) => button({ label: a.label, variant: a.variant ?? 'primary', block: true, attrs: `data-value="${escapeHtml(a.value)}"` })).join('')}
        </div>
      </div>`;

    function close(value) {
      document.removeEventListener('keydown', onKey);
      backdrop.remove();
      previous?.focus?.();
      resolve(value || null);
    }
    function onKey(e) {
      if (e.key === 'Escape' && dismissible) close(null);
      if (e.key === 'Tab') {
        const focusables = [...backdrop.querySelectorAll('button, a, input, select, textarea')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    backdrop.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-value]');
      if (btn) close(btn.dataset.value);
      else if (e.target === backdrop && dismissible) close(null);
    });
    document.addEventListener('keydown', onKey);
    document.body.append(backdrop);
    backdrop.querySelector('.modal__actions .btn')?.focus();
  });
}
