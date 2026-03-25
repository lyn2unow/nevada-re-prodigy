

# Append 10 Special Topics Questions to CE Shop Content

## Change — `src/data/ce-shop-content.ts`

Insert 10 new `ExamQuestion` objects (IDs `ce-shop-st-001` through `ce-shop-st-010`) before the closing `];` on line 2121.

All questions have `topic: "Special Topics"`, `source: "CE Shop"`, `weekNumber: 7`. Covers solar energy systems, timeshare cancellation periods, conservation easements, water rights (prior appropriation, appurtenant), subdivisions, and the Interstate Land Sales Full Disclosure Act.

Format conversion: map `correctAnswer` → `correctIndex`, add `wrongExplanations`, `difficulty`, `examTrap`, `tags`.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 2121 (`];`) |
| Items added | 10 ExamQuestion objects |
| Existing content | Untouched |

