

# Append 10 Contract Questions to CE Shop Content

## Format Conversion Required
The provided questions use a different schema (`correctAnswer`, no `wrongExplanations`/`difficulty`/`examTrap`/`tags`/`source`). They must be converted to match the `ExamQuestion` type before insertion:
- Map `correctAnswer` string → `correctIndex` number
- Add `wrongExplanations` (3 strings) derived from the explanation context
- Add `difficulty`, `examTrap`, `tags`, `source: "CE Shop"`
- Set `topic` to match the provided subtopic/topic pattern used elsewhere

## Change — `src/data/ce-shop-content.ts`

Insert 10 new `ExamQuestion` objects (IDs `ce-shop-contr-001` through `ce-shop-contr-010`) before the closing `];` on line 1422.

All questions have `topic: "Contracts"`, `source: "CE Shop"`, with `weekNumber` values of 4, 5, or 6 as specified. Each will include proper `correctIndex`, `wrongExplanations`, `difficulty`, `examTrap`, and `tags` fields matching the existing format.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 1422 (`];`) |
| Items added | 10 ExamQuestion objects |
| Existing content | Untouched |

