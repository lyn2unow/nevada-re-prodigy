

# Replace generate-lecture Edge Function — Part 1 of 3

## Overview
Replace the entire contents of `supabase/functions/generate-lecture/index.ts` with the user-provided code. This is Part 1 of 3 — it contains imports, CORS headers, and the first 5 entries of the `TOPIC_CONTENT` map.

## Change — `supabase/functions/generate-lecture/index.ts`

Overwrite the file with the provided code, which defines:
- Deno serve import
- CORS headers (unchanged)
- `TOPIC_CONTENT` typed record with 5 topic entries:
  1. Nevada Licensing Requirements (NRS 645, NAC 645)
  2. Nevada Real Estate Commission: Duties & Powers
  3. Agency Law & Fiduciary Duties
  4. Property Disclosures (NRS 113, NRS 645)
  5. Contracts: Listing, Purchase & Lease Agreements

Each entry has 7 structured fields: `nrsRefs`, `keyTerms`, `conceptSummary`, `examAlerts`, `commonMistakes`, `practicalExamples`, `examQuestionSamples`.

The file will be incomplete after this step — Parts 2 and 3 will add remaining topic entries and the serve handler.

| Detail | Value |
|--------|-------|
| File | `supabase/functions/generate-lecture/index.ts` |
| Action | Full overwrite with Part 1 content |
| Status after | Incomplete — awaiting Parts 2 & 3 |

