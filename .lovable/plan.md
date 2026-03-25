

# Add weekNumber to 25 Seed Exam Questions

## Change — `src/data/seed-content.ts`

Add `weekNumber` field to each of the 25 existing exam questions in `getSeedExamQuestions()`. No other fields modified.

### Mapping (by line ranges)

| ID | Line (after `source:`) | weekNumber |
|----|----------------------|------------|
| seed-eq-1 | 386 | 2 |
| seed-eq-2 | 399 | 2 |
| seed-eq-3 | 413 | 2 |
| seed-eq-4 | 426 | 1 |
| seed-eq-5 | 440 | 1 |
| seed-eq-6 | 453 | 5 |
| seed-eq-7 | 467 | 5 |
| seed-eq-8 | 480 | 5 |
| seed-eq-9 | 493 | 3 |
| seed-eq-10 | 507 | 3 |
| seed-eq-11 | 520 | 3 |
| seed-eq-12 | 533 | 6 |
| seed-eq-13 | 546 | 6 |
| seed-eq-14 | 560 | 6 |
| seed-eq-15 | 574 | 5 |
| seed-eq-16 | 588 | 5 |
| seed-eq-17 | 601 | 5 |
| seed-eq-18 | 614 | 5 |
| seed-eq-19 | 627 | 6 |
| seed-eq-20 | 640 | 6 |
| seed-eq-21 | 654 | 6 |
| seed-eq-22 | 667 | 2 |
| seed-eq-23 | 680 | 1 |
| seed-eq-24 | 698 | 6 |
| seed-eq-25 | 711 | 3 |

Each question gets `weekNumber: N,` added after the `source` line. 25 single-line insertions, no other changes.

| Detail | Value |
|--------|-------|
| File | `src/data/seed-content.ts` |
| Lines affected | 25 insertions across lines 374–712 |
| Existing content | Untouched (field additions only) |

