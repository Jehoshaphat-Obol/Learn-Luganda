/* Bauhaus confetti: circles, squares and triangles tumbling down. */
const COLORS = ['var(--color-primary)', 'var(--color-ink-900)', 'var(--color-gold)', 'var(--color-paper-400)', 'var(--color-vermillion-300)'];
const SHAPES = ['circle', 'square', 'triangle', 'half'];

export function confetti(host = document.body, { count = 48, duration = 2600 } = {}) {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.createElement('div');
  layer.className = 'confetti';
  layer.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('i');
    piece.className = `confetti__piece confetti__piece--${SHAPES[i % SHAPES.length]}`;
    piece.style.setProperty('--x', `${Math.random() * 100}vw`);
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 30}vw`);
    piece.style.setProperty('--spin', `${(Math.random() - 0.5) * 1080}deg`);
    piece.style.setProperty('--delay', `${Math.random() * 400}ms`);
    piece.style.setProperty('--size', `${8 + Math.random() * 10}px`);
    piece.style.setProperty('--c', COLORS[i % COLORS.length]);
    layer.append(piece);
  }
  host.append(layer);
  setTimeout(() => layer.remove(), duration + 500);
}
