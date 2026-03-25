

# Append 9 Commission Questions to CE Shop Content

## Change — `src/data/ce-shop-content.ts`

Insert 9 new `ExamQuestion` objects (IDs `ce-shop-comm-001` through `ce-shop-comm-010`, skipping 002) into the existing array returned by `getCEShopExamQuestions()`, right before the closing `];` on line 325.

All questions have `topic: "Nevada Real Estate Commission: Duties & Powers"`, `source: "CE Shop"`, `weekNumber: 1`, and cover disciplinary hearings, Recovery Fund caps, suspension vs. revocation, commission powers, and hearing timelines.

No other files or functions are modified.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 325 (`];`) |
| Items added | 9 ExamQuestion objects |
| Existing content | Untouched |

