

# Append 20 Agency Law Questions to CE Shop Content

## Change — `src/data/ce-shop-content.ts`

Insert 20 new `ExamQuestion` objects (IDs `ce-shop-agency-001` through `ce-shop-agency-020`) into the array returned by `getCEShopExamQuestions()`, right before the closing `];` on line 534.

All questions have `topic: "Agency Law & Fiduciary Duties"`, `source: "CE Shop"`, and cover assigned agency, dual agency, Consent to Act, Waiver Form, Authorization to Negotiate, confidentiality duration, statutory duties, transactional agency, and agency confirmation timing. Week numbers are split between 1 and 2.

No other files are modified. Existing questions remain untouched.

| Detail | Value |
|--------|-------|
| File | `src/data/ce-shop-content.ts` |
| Location | Before line 534 (`];`) |
| Items added | 20 ExamQuestion objects |
| Existing content | Untouched |

