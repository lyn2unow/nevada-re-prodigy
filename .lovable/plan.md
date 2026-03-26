

# Fix Pre-Licensing Hours + Update Authority Hierarchy

## Change 1 — Fix pre-licensing hours in TOPIC_CONTENT (lines 19–25)

Update four fields in the "Nevada Licensing Requirements" entry:

- **Line 19 (nrsRefs):** `90 hrs pre-licensing` → `120 hrs pre-licensing — updated 2023`
- **Line 20 (keyTerms):** `90 hrs salesperson` → `120 hrs salesperson`
- **Line 21 (conceptSummary):** `complete 90 hours` → `complete 120 hours`
- **Line 22 (examAlerts):** `90 hrs pre-licensing (NOT 120 — common trap)` → `120 hrs pre-licensing (NOT 90 — statute updated 2023, NRS 645.343)`
- **Line 23 (commonMistakes):** `90-hr salesperson requirement` → `120-hr salesperson requirement`
- **Line 25 (examQuestionSamples):** `(90 hrs)` → `(120 hrs — NRS 645.343 updated 2023)`

## Change 2 — Update authority hierarchy item 1 (line 281)

Replace the current NRS/NAC description with the new text that treats TOPIC_CONTENT values as verified current law and instructs the model not to substitute training-data values.

| Detail | Value |
|--------|-------|
| File | `supabase/functions/generate-lecture/index.ts` |
| Lines affected | 19–25 (TOPIC_CONTENT) and 281 (SYSTEM_PROMPT) |

