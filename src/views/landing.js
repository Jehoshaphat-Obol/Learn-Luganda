/*
 * Landing page: what the app is, how it teaches, the cast, a playable sample
 * question and an FAQ. Returning learners get a "continue" call to action.
 */
import '../styles/landing.css';
import { heroScene, streakScene, lessonCompleteScene, mascot, portrait, CAST } from '../illustrations/index.js';
import { button, escapeHtml } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { reducedMotion } from '../ui/motion.js';
import { courseStats } from '../content/course.js';
import { brandMark } from '../app/brand-mark.js';
import { siteLinks } from '../app/site.js';

const STEPS = [
  { icon: 'bolt', title: 'Bite-sized lessons', text: 'Five-minute lessons with pictures, word tiles, listening and matching games.' },
  { icon: 'flame', title: 'Daily streaks', text: 'Practise a little every day. Your streak and daily goal keep you coming back.' },
  { icon: 'heart', title: 'Hearts', text: 'Mistakes cost a heart, so every answer counts. Run out and a quick look back at earlier words fills them up again. You never have to stop learning.' },
  { icon: 'target', title: 'Spaced review', text: 'Words return just before you’d forget them, so they stick for good.' },
];

const WORDS = [
  ['Oli otya?', 'How are you?'],
  ['Gyendi', 'I’m fine'],
  ['Weebale', 'Thank you'],
  ['Kale', 'Okay'],
  ['Mukwano', 'Friend'],
  ['Amazzi', 'Water'],
  ['Emmere', 'Food'],
  ['Ssebo', 'Sir'],
  ['Nnyabo', 'Madam'],
  ['Webale kujja', 'Welcome'],
];

// Built at render time: the course loads after this module.
const faq = (STATS = courseStats()) => [
  ['Is it free?', 'Yes. Learn Luganda is free, with no ads and no account.'],
  ['Where is my progress saved?', 'In your browser’s local storage on this device. You can export it to a file and import it on another device from Settings.'],
  ['Who is it for?', 'Complete beginners, diaspora families reconnecting with the language, and visitors to Uganda who want more than “hello”.'],
  ['What will I learn first?', 'Greetings, introductions and numbers, then family, food, the market, time, places and more, unit by unit.'],
  ['How long is the course?', `${STATS.units} units in ${STATS.sections} section${STATS.sections > 1 ? 's' : ''}: ${STATS.lessons} lessons and ${STATS.words} words, from first greetings to real conversations. Already know some? Take a section test to jump ahead.`],
  ['Does it work offline?', 'Once installed, lessons work without a connection.'],
];

const SAMPLE = {
  prompt: 'Which one means “thank you”?',
  options: ['Oli otya?', 'Weebale', 'Nedda'],
  answer: 'Weebale',
};

/** `hasProgress` is passed in so the page can greet returning learners. */
export function createLandingView({ hasProgress = () => false } = {}) {
  return function landingView({ root }) {
    const returning = hasProgress();
    const primaryCta = returning
      ? button({ label: 'Continue learning', size: 'lg', href: '#/learn' })
      : button({ label: 'Get started', size: 'lg', href: '#/onboarding' });
    const secondaryCta = returning
      ? ''
      : button({ label: 'I already have progress', variant: 'secondary', size: 'lg', href: '#/settings?import=1' });

    const castIds = Object.keys(CAST);

    root.innerHTML = `
      <div class="landing">
        <header class="landing__header">
          <a class="landing__brand" href="#/">${brandMark()}<span>luganda</span></a>
          <nav class="landing__links" aria-label="Page">
            <a href="#how">How it works</a>
            <a href="#cast">Meet the cast</a>
            <a href="#faq">FAQ</a>
          </nav>
          ${button({ label: returning ? 'Continue' : 'Get started', href: returning ? '#/learn' : '#/onboarding' })}
        </header>

        <section class="hero">
          <div class="hero__copy">
            <p class="eyebrow">Free · Bite-sized · Fun</p>
            <h1>The playful way to <strong>learn Luganda.</strong></h1>
            <p class="hero__lead">Short, game-like lessons that take you from <em>Oli otya?</em> to real conversations, one day at a time.</p>
            <div class="hero__ctas">${primaryCta}${secondaryCta}</div>
            <p class="caption">okuyiga — v. to learn</p>
          </div>
          <div class="hero__art">${heroScene()}</div>
          <span class="shape shape--circle" aria-hidden="true"></span>
          <span class="shape shape--square" aria-hidden="true"></span>
          <span class="shape shape--triangle" aria-hidden="true"></span>
        </section>

        <div class="ticker" aria-label="Sample words">
          <div class="ticker__track">
            ${[...WORDS, ...WORDS].map(([lg, en], i) => `<span class="ticker__item"${i >= WORDS.length ? ' aria-hidden="true"' : ''}><strong>${escapeHtml(lg)}</strong> ${escapeHtml(en)}</span>`).join('')}
          </div>
        </div>

        <section class="landing__section why">
          <div class="why__grid">
            <div>
              <p class="eyebrow">Why Luganda</p>
              <h2>The language of <strong>Kampala’s streets.</strong></h2>
            </div>
            <p class="why__text">Luganda is spoken by millions of people across central Uganda and is the most widely spoken language in Kampala. Learn it to talk with family, make friends at the market, or feel at home on your next trip.</p>
          </div>
          <div class="why__cards">
            <article class="card card--pastel-butter"><h3>For families</h3><p>Reconnect with grandparents and pass the language on.</p></article>
            <article class="card card--pastel-sky"><h3>For travellers</h3><p>Greet, bargain and get around with confidence.</p></article>
            <article class="card card--pastel-sage"><h3>For the curious</h3><p>Discover noun classes, tones and proverbs.</p></article>
          </div>
        </section>

        <section class="landing__section how" id="how">
          <p class="eyebrow">How it works</p>
          <h2>Learning that feels <strong>like a game.</strong></h2>
          <ol class="how__steps">
            ${STEPS.map((s, i) => `
              <li class="how__step">
                <span class="how__icon how__icon--${i}">${icon(s.icon, { size: 28 })}</span>
                <h3>${s.title}</h3>
                <p>${s.text}</p>
              </li>`).join('')}
          </ol>
        </section>

        <section class="landing__section try">
          <div class="try__card">
            <p class="eyebrow">Try it</p>
            <h2>${escapeHtml(SAMPLE.prompt)}</h2>
            <div class="try__options" role="group" aria-label="Answers">
              ${SAMPLE.options.map((o, i) => `<button class="choice" type="button" data-answer="${escapeHtml(o)}"><span class="choice__key">${i + 1}</span>${escapeHtml(o)}</button>`).join('')}
            </div>
            <p class="try__feedback" aria-live="polite"></p>
          </div>
          <div class="try__art" data-try-art>${mascot({ pose: 'thinking' })}</div>
        </section>

        <section class="landing__section showcase">
          <article class="showcase__item">
            <div class="showcase__art">${streakScene({ days: 7 })}</div>
            <h3>Keep your <strong>streak</strong> alive</h3>
            <p class="muted">Hit your daily goal to grow your streak. Busy day? A streak freeze has your back.</p>
          </article>
          <article class="showcase__item">
            <div class="showcase__art">${lessonCompleteScene({ xp: 20 })}</div>
            <h3>Earn <strong>XP</strong> and unlock achievements</h3>
            <p class="muted">Every lesson earns XP. Hit milestones to unlock achievement badges and earn gems. Gems are never sold: you earn every one.</p>
          </article>
        </section>

        <section class="landing__section cast" id="cast">
          <p class="eyebrow">Meet the cast</p>
          <h2>Friends who’ll <strong>talk with you.</strong></h2>
          <div class="cast__grid">
            ${castIds.map((id) => `
              <figure class="cast__item">
                <div class="cast__art">${portrait(id, { expression: 'happy' })}</div>
                <figcaption><strong>${escapeHtml(CAST[id].name)}</strong><span>${escapeHtml(CAST[id].role)}</span></figcaption>
              </figure>`).join('')}
          </div>
        </section>

        <section class="landing__section faq" id="faq">
          <p class="eyebrow">Questions</p>
          <h2>Good to <strong>know.</strong></h2>
          <div class="faq__list">
            ${faq().map(([q, a]) => `<details class="faq__item"><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('')}
          </div>
        </section>

        <section class="final-cta">
          <div class="final-cta__art">${mascot({ pose: 'cheering' })}</div>
          <h2>Ready? <strong>Tandika!</strong></h2>
          <p class="caption">tandika — v. start, begin</p>
          ${primaryCta}
        </section>

        <footer class="landing__footer">
          <span class="landing__brand">${brandMark()}<span>luganda</span></span>
          <p>Made with care for Luganda learners. Your progress stays on your device.</p>
          <p class="caption">Weebale nnyo — thank you very much.</p>
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
      const correct = choice.dataset.answer === SAMPLE.answer;
      root.querySelectorAll('[data-answer]').forEach((b) => b.classList.remove('is-correct', 'is-wrong'));
      choice.classList.add(correct ? 'is-correct' : 'is-wrong');
      root.querySelector('.try__feedback').innerHTML = correct
        ? `${icon('check', { size: 18 })} Correct! <em>Weebale</em> means thank you.`
        : `${icon('cross', { size: 18 })} Not quite. Try again!`;
      root.querySelector('.try__feedback').className = `try__feedback try__feedback--${correct ? 'good' : 'bad'}`;
      root.querySelector('[data-try-art]').innerHTML = mascot({ pose: correct ? 'cheering' : 'sad' });
    });

  };
}
