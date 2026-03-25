

# Append 10 Property Disclosure Questions to CE Shop Content

## Change — `src/data/ce-shop-content.ts`

Insert 10 new `ExamQuestion` objects (IDs `ce-shop-disc-001` through `ce-shop-disc-010`) into the `getCEShopExamQuestions()` array, right before the closing `];` on line 994.

All questions have `topic: "Property Disclosures (NRS 113, NRS 645)"`, `source: "CE Shop"`, `weekNumber: 2`. Existing questions remain untouched.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 994 (`];`) |
| Items added | 10 ExamQuestion objects |
| Existing content | Untouched |

