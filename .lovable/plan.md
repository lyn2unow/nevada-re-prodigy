

# Append Topics 6–15 + DEFAULT_CONTENT to generate-lecture

## Change — `supabase/functions/generate-lecture/index.ts`

Replace line 63 (`};`) with the 10 new topic entries, then close `TOPIC_CONTENT` with `};`, followed by the `DEFAULT_CONTENT` constant.

Topics added:
1. Leasing & Property Management
2. Real Estate Financing & Lending
3. Valuation & Market Analysis (CMA & Appraisal)
4. Property Ownership & Transfer
5. Land Use Controls & Regulations
6. Fair Housing (Federal & Nevada)
7. Closing Procedures & Settlement Statements
8. Nevada Brokerage Operations
9. Ethics & Professional Conduct
10. Special Topics: Water Rights, Solar Easements, Timeshares & Subdivisions

Then `DEFAULT_CONTENT` constant with fallback values for all 7 fields.

| Detail | Value |
|--------|-------|
| File | `supabase/functions/generate-lecture/index.ts` |
| Line replaced | 63 (`};`) |
| Items added | 10 topic entries + DEFAULT_CONTENT object |
| Existing content above line 63 | Untouched |

