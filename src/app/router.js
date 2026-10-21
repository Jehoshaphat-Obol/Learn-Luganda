/*
 * Hash router. GitHub Pages serves static files only, so every in-app path
 * lives after the `#` (e.g. `#/lesson/u1-l1`) and reloads keep working.
 */

/** Turns `/lesson/:id` into a matcher that returns `{ id }` or null. */
export function compile(pattern) {
  const keys = [];
  const source = pattern
    .split('/')
    .map((part) => {
      if (part.startsWith(':')) {
        keys.push(part.slice(1));
        return '([^/]+)';
      }
      return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  const regex = new RegExp(`^${source}/?$`);
  return (path) => {
    const m = regex.exec(path);
    if (!m) return null;
    return Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
  };
}

/** Normalises a location hash (`#/learn?x=1`) into `{ path, query }`. */
export function parseHash(hash) {
  const raw = hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart = ''] = raw.split('?');
  const path = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  return { path, query: Object.fromEntries(new URLSearchParams(queryPart)) };
}

/** Finds the first route whose pattern matches `path`. */
export function matchRoute(routes, path) {
  for (const route of routes) {
    route.match ??= compile(route.path);
    const params = route.match(path);
    if (params) return { route, params };
  }
  return null;
}

/**
 * @param {{ routes: Array<{ path: string }>, onChange: Function, fallback?: string }} options
 *   `onChange({ route, params, query, path })` runs on start and every hash change.
 */
export function createRouter({ routes, onChange, fallback = '/' }) {
  function resolve() {
    const { path, query } = parseHash(window.location.hash);
    const found = matchRoute(routes, path);
    if (!found) {
      navigate(fallback, { replace: true });
      return;
    }
    onChange({ ...found, query, path });
  }

  function navigate(path, { replace = false } = {}) {
    const hash = `#${path}`;
    if (window.location.hash === hash) {
      resolve();
    } else if (replace) {
      window.history.replaceState(null, '', hash);
      resolve();
    } else {
      window.location.hash = hash;
    }
  }

  return {
    start() {
      window.addEventListener('hashchange', resolve);
      resolve();
    },
    navigate,
    // Re-renders the current route, e.g. after the language changes.
    refresh: resolve,
  };
}
