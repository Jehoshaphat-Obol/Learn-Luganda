/*
 * Course pack file formats. `formatVersion` in course.json says which shape
 * a pack's files have. Older packs are upgraded here, step by step, when
 * they load, so a pack written for an earlier app keeps working; a pack
 * newer than this app understands is refused with a clear error, and the
 * loader falls back to the default course.
 *
 * To change the format: bump PACK_FORMAT, add `UPGRADES[n]` turning a
 * format n-1 pack ({ meta, units }) into format n, and update the schemas.
 */
export const PACK_FORMAT = 2;

/**
 * `UPGRADES[n]` turns a format n-1 pack into format n.
 *
 * Format 2 (#185) adds the shared catalog (curriculum/ and lang/<code>/,
 * see ./compose.js), which composes courses in this same shape, so a
 * format 1 course pack needs no changes.
 */
export const UPGRADES = { 2: (pack) => pack };

/** Brings `{ meta, units }` up to the current format, or throws. */
export function upgradePack(pack, upgrades = UPGRADES, current = PACK_FORMAT) {
  let format = pack.meta.formatVersion ?? 1;
  if (format > current) throw new Error(`Course pack ${pack.meta.id} uses format ${format}; this app reads up to ${current}`);
  let out = pack;
  while (format < current) {
    format += 1;
    const step = upgrades[format];
    if (!step) throw new Error(`No upgrade to pack format ${format}`);
    out = step(out);
    out = { ...out, meta: { ...out.meta, formatVersion: format } };
  }
  return out;
}
