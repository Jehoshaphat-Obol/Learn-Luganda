# 2026-10-22: Shared catalog, phase 2, Section 3

Issue: #187 (phase 2 of #184) · Branch: `feat/187-fold-swahili-s3`

## Context

Section 3 (units 17 to 24) of folding the hand-built en-sw/sw-en into the
shared curriculum. Section 2 landed in PR #189.

## Done

- `node scripts/fold-course.js --units u17-u24 --write`: 64 new words and
  107 new sentences as `u17s4` to `u24s4` (`since: 2`): More negatives,
  How many?, What I did, Plans and dreams, Feelings, Fans and games,
  Network and airtime, Cooking steps.
- Luganda drafts, skill titles (en/sw/lg/fr) and Swahili dialogue replies
  for S3 in `scripts/fold/en-sw.tsv`; S3 notes in the about folders
  (about coverage 0.6).
- S2's "No worries" is now *Tewali buzibu* in Luganda, so *Teweeraliikirira*
  can be S3's "Don't worry".

## Decisions

- Two new words keep the same Luganda as an older one on purpose: *ngapi*
  ("how many" = *mmeka*, u4) and *bao* (= *omweso*, u22). They are the
  same thing, so the composer keeps the older word for Luganda courses and
  the new one still teaches Swahili.

## Next

Section 4 (u25 to u32, culture units), S5, culture slots, then retire the
hand-built en-sw and sw-en.
