# 2026-10-21: Profile header overlap on phones

Issue: #107 · Branch: `fix/107-profile-header-overlap`

## Context

On a phone the Profile header kept the avatar, the name and the Edit button
in one row. A single long word such as "Jehoshaphat" can't wrap, so the
name ran under the Edit button (reported with a screenshot at ~412px).

## Done

- `src/styles/profile.css`: the header is now a grid (avatar, text, edit).
  Below 560px Edit moves to its own row under the name and "since" line.
- The name wraps even inside one long word (`overflow-wrap: anywhere`) and
  scales between `--text-xl` and `--text-2xl` with the viewport.
- `e2e/quality.spec.js`: checks at 360 and 412px that a 30-character
  one-word name never overlaps Edit and the page never scrolls sideways.

## Audit

Swept every screen at 360 and 412px with a long name, looking for content
wider than its box, sideways page scroll and buttons overlapping text. The
profile header was the only real problem. Two hits are intentional: the
"Start" bubble above the current path node, and the landing hero's
decorative shapes (clipped, no page scroll).

## Next

Back to the language pack issues (#83 onwards).
