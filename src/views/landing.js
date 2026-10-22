/*
 * Landing page: what the app is, how it teaches, the cast, a playable sample
 * question and an FAQ. Returning learners get a "continue" call to action.
 */
import '../styles/landing.css';
import {
  heroScene,
  streakScene,
  lessonCompleteScene,
  mascot,
  portrait,
  placeScene,
  randomPose,
  CAST,
  PLACE_IDS,
} from '../illustrations/index.js';
import { pick, sample, shuffle } from '../illustrations/random.js';
import { button, escapeHtml } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { reducedMotion } from '../ui/motion.js';
import { castMember, course, courseStats, langAttr } from '../content/course.js';
import { courseLanguage } from '../content/names.js';
import { t, tHtml } from '../i18n/index.js';
import { rich } from '../i18n/rich.js';
import { brandMark } from '../app/brand-mark.js';
import { siteLinks } from '../app/site.js';
import { installButton } from '../app/pwa.js';

const STEPS = [
  { id: 'lessons', icon: 'bolt' },
  { id: 'streaks', icon: 'flame' },
  { id: 'hearts', icon: 'heart' },
  { id: 'review', icon: 'target' },
];

const CARD_COLOURS = ['butter', 'sky', 'sage'];

const FAQ = ['free', 'saved', 'who', 'first', 'length', 'install'];

// Built at render time: the course loads after this module.
function faqAnswer(id, copy) {
  if (id === 'who') return copy.audience;
  if (id === 'first') return copy.first;
  if (id !== 'length') return t(`landing.faq.${id}.a`);
  const stats = courseStats();
  return t('landing.faq.length.a', { ...stats, sections: t('landing.faq.sections', { count: stats.sections }) });
}

/** `hasProgress` is passed in so the page can greet returning learners. */
export function createLandingView({ hasProgress = () => false } = {}) {
  return function landingView({ root }) {
    const returning = hasProgress();
    // What the course says about its language; the rest is the UI pack's.
    const copy = course.landing;
    const language = courseLanguage('target');
    const primaryCta = returning
      ? button({ label: t('landing.cta.continueLearning'), size: 'lg', href: '#/learn' })
      : button({ label: t('landing.cta.start'), size: 'lg', href: '#/onboarding' });
    const secondaryCta = returning
      ? ''
      : button({ label: t('landing.cta.import'), variant: 'secondary', size: 'lg', href: '#/settings?import=1' });
    const target = langAttr('target');

    // A different order, faces and places on every visit.
    const cast = shuffle(Object.keys(course.cast)).map((id) => castMember(id));
    const places = sample(PLACE_IDS, 3);

    root.innerHTML = `
      <div class="landing">
        <header class="landing__header">
          <a class="landing__brand" href="#/" aria-label="${escapeHtml(t('app.home'))}">${brandMark()}<span>${escapeHtml(t('app.shortName'))}</span></a>
          <nav class="landing__links" aria-label="${escapeHtml(t('landing.nav.label'))}">
            <a href="#how">${escapeHtml(t('landing.nav.how'))}</a>
            <a href="#cast">${escapeHtml(t('landing.nav.cast'))}</a>
            <a href="#faq">${escapeHtml(t('landing.nav.faq'))}</a>
          </nav>
          <div class="landing__actions">
            ${installButton('landing__install')}
            ${button({ label: t(returning ? 'landing.cta.continue' : 'landing.cta.start'), href: returning ? '#/learn' : '#/onboarding' })}
          </div>
        </header>

        <section class="hero">
          <div class="hero__copy">
            <p class="eyebrow">${escapeHtml(t('landing.hero.eyebrow'))}</p>
            <h1>${tHtml('landing.hero.title', { language })}</h1>
            <p class="hero__lead">${tHtml('landing.hero.lead', { hello: copy.hello })}</p>
            <div class="hero__ctas">${primaryCta}${installButton('hero__install', { size: 'lg' })}${secondaryCta}</div>
            ${copy.word ? `<p class="caption"${target}>${escapeHtml(copy.word)}</p>` : ''}
          </div>
          <div class="hero__art">${heroScene()}</div>
          <span class="shape shape--circle" aria-hidden="true"></span>
          <span class="shape shape--square" aria-hidden="true"></span>
          <span class="shape shape--triangle" aria-hidden="true"></span>
        </section>

        <div class="ticker" aria-label="${escapeHtml(t('landing.ticker'))}">
          <div class="ticker__track">
            ${[...copy.words, ...copy.words].map(([word, meaning], i) => `<span class="ticker__item"${i >= copy.words.length ? ' aria-hidden="true"' : ''}><strong${target}>${escapeHtml(word)}</strong> ${escapeHtml(meaning)}</span>`).join('')}
          </div>
        </div>

        <section class="landing__section why">
          <div class="why__grid">
            <div>
              <p class="eyebrow">${escapeHtml(t('landing.why.eyebrow', { language }))}</p>
              <h2>${rich(copy.why.title)}</h2>
            </div>
            <p class="why__text">${rich(copy.why.text)}</p>
          </div>
          <div class="why__cards">
            ${copy.why.cards.map((c, i) => `<article class="card card--pastel-${CARD_COLOURS[i % CARD_COLOURS.length]}"><h3>${rich(c.title)}</h3><p>${rich(c.text)}</p></article>`).join('')}
          </div>
        </section>

        <section class="landing__section how" id="how">
          <p class="eyebrow">${escapeHtml(t('landing.how.eyebrow'))}</p>
          <h2>${tHtml('landing.how.title')}</h2>
          <ol class="how__steps">
            ${STEPS.map((s, i) => `
              <li class="how__step">
                <span class="how__icon how__icon--${i}">${icon(s.icon, { size: 28 })}</span>
                <h3>${escapeHtml(t(`landing.how.${s.id}.title`))}</h3>
                <p>${escapeHtml(t(`landing.how.${s.id}.text`))}</p>
              </li>`).join('')}
          </ol>
        </section>

        <section class="landing__section try">
          <div class="try__card">
            <p class="eyebrow">${escapeHtml(t('landing.try.eyebrow'))}</p>
            <h2>${rich(copy.sample.prompt)}</h2>
            <div class="try__options" role="group" aria-label="${escapeHtml(t('landing.try.answers'))}">
              ${copy.sample.options.map((o, i) => `<button class="choice" type="button" data-answer="${escapeHtml(o)}"${target}><span class="choice__key">${i + 1}</span>${escapeHtml(o)}</button>`).join('')}
            </div>
            <p class="try__feedback" aria-live="polite"></p>
          </div>
          <div class="try__art" data-try-art>${mascot({ pose: 'thinking' })}</div>
        </section>

        <section class="landing__section showcase">
          <article class="showcase__item">
            <div class="showcase__art">${streakScene({ days: 7 })}</div>
            <h3>${tHtml('landing.showcase.streakTitle')}</h3>
            <p class="muted">${escapeHtml(t('landing.showcase.streakText'))}</p>
          </article>
          <article class="showcase__item">
            <div class="showcase__art">${lessonCompleteScene({ xp: 20 })}</div>
            <h3>${tHtml('landing.showcase.xpTitle')}</h3>
            <p class="muted">${escapeHtml(t('landing.showcase.xpText'))}</p>
          </article>
        </section>

        <section class="landing__section cast" id="cast">
          <p class="eyebrow">${escapeHtml(t('landing.cast.eyebrow'))}</p>
          <h2>${tHtml('landing.cast.title')}</h2>
          <div class="cast__grid">
            ${cast.map((who) => `
              <figure class="cast__item">
                <div class="cast__art">${portrait(who.look, { expression: pick(['happy', 'happy', 'wink', 'neutral', 'surprised']) })}</div>
                <figcaption><strong>${escapeHtml(who.name)}</strong><span>${escapeHtml(who.role)}</span></figcaption>
              </figure>`).join('')}
          </div>
        </section>

        <section class="landing__section places">
          <p class="eyebrow">${escapeHtml(t('landing.places.eyebrow'))}</p>
          <h2>${tHtml('landing.places.title', { language })}</h2>
          <div class="places__grid">
            ${places.map((id) => `
              <figure class="places__item">
                <div class="places__art">${placeScene(id, { cast: sample(Object.keys(CAST), 2), pose: randomPose('greet') })}</div>
                <figcaption>${escapeHtml(t(`places.${id}`))}</figcaption>
              </figure>`).join('')}
          </div>
        </section>

        <section class="landing__section faq" id="faq">
          <p class="eyebrow">${escapeHtml(t('landing.faq.eyebrow'))}</p>
          <h2>${tHtml('landing.faq.title')}</h2>
          <div class="faq__list">
            ${FAQ.map((id) => `<details class="faq__item"><summary>${escapeHtml(t(`landing.faq.${id}.q`))}</summary><p>${rich(faqAnswer(id, copy))}</p></details>`).join('')}
          </div>
        </section>

        <section class="final-cta">
          <div class="final-cta__art">${mascot({ pose: randomPose('celebrate') })}</div>
          <h2>${tHtml('landing.final.title', { start: copy.start.word })}</h2>
          ${copy.start.caption ? `<p class="caption"${target}>${escapeHtml(copy.start.caption)}</p>` : ''}
          ${primaryCta}
        </section>

        <footer class="landing__footer">
          <span class="landing__brand">${brandMark()}<span>${escapeHtml(t('app.shortName'))}</span></span>
          <p>${escapeHtml(t('landing.footer.made', { language }))}</p>
          ${copy.farewell ? `<p class="caption">${rich(copy.farewell)}</p>` : ''}
          ${siteLinks()}
        </footer>
      </div>`;

    root.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]:not([href^="#/"])');
      if (link) {
        e.preventDefault();
        root.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
        return;
      }
      const choice = e.target.closest('[data-answer]');
      if (!choice) return;
      const correct = choice.dataset.answer === copy.sample.answer;
      root.querySelectorAll('[data-answer]').forEach((b) => b.classList.remove('is-correct', 'is-wrong'));
      choice.classList.add(correct ? 'is-correct' : 'is-wrong');
      root.querySelector('.try__feedback').innerHTML = correct
        ? `${icon('check', { size: 18 })} ${rich(t('landing.try.correct', { explain: copy.sample.explain }))}`
        : `${icon('cross', { size: 18 })} ${escapeHtml(t('landing.try.wrong'))}`;
      root.querySelector('.try__feedback').className = `try__feedback try__feedback--${correct ? 'good' : 'bad'}`;
      root.querySelector('[data-try-art]').innerHTML = mascot({ pose: correct ? randomPose('celebrate') : 'sad' });
    });

  };
}
