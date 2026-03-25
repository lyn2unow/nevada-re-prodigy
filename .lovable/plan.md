

# Append 9 Licensing Questions to CE Shop Content

## Change — `src/data/ce-shop-content.ts`

Insert 9 new `ExamQuestion` objects (IDs `ce-shop-lic-002` through `ce-shop-lic-010`) into the `getCEShopExamQuestions()` array, right before the closing `];` on line 1274.

All questions have `topic: "Nevada Licensing Requirements (NRS 645, NAC 645)"`, `source: "CE Shop"`, `weekNumber: 1`. Existing questions remain untouched.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 1274 (`];`) |
| Items added | 9 ExamQuestion objects |
| Existing content | Untouched |

