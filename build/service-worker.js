/*
 * Vite plugin that writes `sw.js` after the build. The worker precaches
 * every file in the build (hashed assets, icons, pages) under a cache named
 * after their combined hash, so a new deploy gets a fresh cache and old
 * ones are cleaned up. Paths are relative to the worker, so it works under
 * the GitHub Pages project path.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

export function serviceWorker({ skip = [/\.map$/, /^illustrations\.html$/] } = {}) {
  let outDir = 'dist';
  return {
    name: 'learn-luganda-service-worker',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const files = walk(outDir)
        .map((p) => relative(outDir, p).split(sep).join('/'))
        .filter((f) => f !== 'sw.js' && !skip.some((re) => re.test(f)))
        .sort();
      const hash = createHash('sha256');
      for (const f of files) hash.update(f).update(readFileSync(join(outDir, f)));
      const version = hash.digest('hex').slice(0, 12);
      const template = readFileSync(new URL('./sw-template.js', import.meta.url), 'utf8');
      const sw = template.replace('__VERSION__', version).replace('__PRECACHE__', JSON.stringify(['./', ...files], null, 2));
      writeFileSync(join(outDir, 'sw.js'), sw);
    },
  };
}
