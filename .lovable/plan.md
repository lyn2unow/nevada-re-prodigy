

# Add weekNumber to Lecture Notes Exam Questions

## Change — `src/data/lecture-notes-content.ts`

Add `weekNumber` field after the `source` line of each exam question listed below. No other fields modified.

### Mapping

**Unit 1 (lines ~1151–1311):**
| ID | weekNumber |
|----|-----------|
| ln-eq-1 | 1 |
| ln-eq-2 | 1 |
| ln-eq-3 | 1 |
| ln-eq-4 | 1 |
| ln-eq-5 | 2 |
| ln-eq-6 | 1 |
| ln-eq-7 | 2 |
| ln-eq-8 | 1 |
| ln-eq-9 | 2 |
| ln-eq-10 | 2 |

**Unit 2 (lines ~1315–1487):** All 10 get `weekNumber: 5`

**Unit 3 (lines ~1491–1576):** All 5 get `weekNumber: 3`

**Unit 4 (lines ~1580–1697):**
| ID | weekNumber |
|----|-----------|
| ln-eq-u4-1 through u4-6 | 3 |
| ln-eq-u4-7 | 7 |

**Unit 5 (lines ~1701–1785):** All 5 get `weekNumber: 3`

Each question gets `weekNumber: N,` inserted after its `source: "Lecture Notes",` line. 37 single-line insertions total.

| Detail | Value |
|--------|-------|
| File | `src/data/lecture-notes-content.ts` |
| Lines affected | 37 insertions across lines ~1151–1785 |
| Existing content | Untouched (field additions only) |

