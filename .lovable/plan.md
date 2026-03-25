

# Append 20 License Practice Questions to CE Shop Content

## Format Conversion Required
The provided questions use `correctAnswer` string format. Each must be converted to `ExamQuestion` type:
- Map `correctAnswer` → `correctIndex`
- Add `wrongExplanations` (3 strings)
- Add `difficulty`, `examTrap`, `tags`, `source: "CE Shop"`

## Change — `src/data/ce-shop-content.ts`

Insert 20 new `ExamQuestion` objects (IDs `ce-shop-lp-001` through `ce-shop-lp-020`) before the closing `];` on line 1652.

All questions have `topic: "License Practice"`, `source: "CE Shop"`, `weekNumber: 6`. Covers trust accounts, advertising rules, team names, BPOs, broker supervision, commission negotiation, licensee responsibilities, fair housing in advertising, and custodial accounts.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 1652 (`];`) |
| Items added | 20 ExamQuestion objects |
| Existing content | Untouched |

