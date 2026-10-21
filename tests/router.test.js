import { describe, expect, it } from 'vitest';
import { compile, matchRoute, parseHash } from '../src/app/router.js';

describe('compile', () => {
  it('matches static paths', () => {
    expect(compile('/learn')('/learn')).toEqual({});
    expect(compile('/learn')('/learn/')).toEqual({});
    expect(compile('/learn')('/learning')).toBeNull();
  });

  it('extracts and decodes params', () => {
    expect(compile('/lesson/:id')('/lesson/u1-l2')).toEqual({ id: 'u1-l2' });
    expect(compile('/story/:id')('/story/a%20b')).toEqual({ id: 'a b' });
    expect(compile('/lesson/:id')('/lesson')).toBeNull();
  });
});

describe('parseHash', () => {
  it('defaults to the root path', () => {
    expect(parseHash('')).toEqual({ path: '/', query: {} });
    expect(parseHash('#')).toEqual({ path: '/', query: {} });
  });

  it('splits the query string', () => {
    expect(parseHash('#/practice?mode=mistakes')).toEqual({ path: '/practice', query: { mode: 'mistakes' } });
  });

  it('adds a missing leading slash', () => {
    expect(parseHash('#learn').path).toBe('/learn');
  });
});

describe('matchRoute', () => {
  const routes = [{ path: '/' }, { path: '/lesson/:id' }];

  it('returns the first match with params', () => {
    const found = matchRoute(routes, '/lesson/x');
    expect(found.route).toBe(routes[1]);
    expect(found.params).toEqual({ id: 'x' });
  });

  it('returns null for unknown paths', () => {
    expect(matchRoute(routes, '/nope')).toBeNull();
  });
});
