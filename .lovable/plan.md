

# Add weekNumber to Textbook Exam Questions

## Change — `src/data/textbook-content.ts`

Add `weekNumber` field after the `source: "Textbook",` line for each of the 113 exam questions in `getTextbookExamQuestions()`. No other fields modified.

### Mapping

| Unit | IDs | weekNumber | Count |
|------|-----|-----------|-------|
| U1 | tb-eq-u1-01 to 05, 07, 09, 13, 15 | 1 | 9 |
| U1 | tb-eq-u1-06 | 5 | 1 |
| U1 | tb-eq-u1-08, 10, 11, 12, 14 | 2 | 5 |
| U2 | tb-eq-u2-01 to 10 | 5 | 10 |
| U3 | tb-eq-u3-01 to 05 | 3 | 5 |
| U3 | tb-eq-u3-06 | 7 | 1 |
| U4 | tb-eq-u4-01 to 04, 06 | 3 | 5 |
| U4 | tb-eq-u4-05 | 7 | 1 |
| U5 | tb-eq-u5-01 to 03 | 3 | 3 |
| U6 | tb-eq-u6-01 to 05 | 3 | 5 |
| U7 | tb-eq-u7-01 to 05 | 5 | 5 |
| U8 | tb-eq-u8-01 to 07 | 3 | 7 |
| U9 | tb-eq-u9-01 to 05 | 3 | 5 |
| U10 | tb-eq-u10-01 to 07 | 1 | 7 |
| U11 | tb-eq-u11-01 to 06 | 5 | 6 |
| U12 | tb-eq-u12-01 to 06 | 5 | 6 |
| U13 | tb-eq-u13-01 to 06 | 3 | 6 |
| U14 | tb-eq-u14-01 to 06 | 7 | 6 |
| U15 | tb-eq-u15-01 to 06 | 6 | 6 |
| U16 | tb-eq-u16-01 to 06 | 6 | 6 |
| U17 | tb-eq-u17-01 to 06 | 3 | 6 |

**Total**: 113 questions, each gets `weekNumber: N,` inserted after `source: "Textbook",`.

| Detail | Value |
|--------|-------|
| File | `src/data/textbook-content.ts` |
| Lines affected | 113 insertions across lines ~1693–end of exam questions |
| Existing content | Untouched (field additions only) |

