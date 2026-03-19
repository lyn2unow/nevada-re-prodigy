

## NRS Update Checker — Revised Plan

### Overview
Add a third tab "NRS Update Checker" to `src/pages/NRSReference.tsx` and create a new edge function that calls the Perplexity Sonar API to check for recent legislative changes to NRS 645 & NAC 645.

### Step 1: New Edge Function — `supabase/functions/check-nrs-updates/index.ts`

Mirror the CORS headers and authorization pattern from the existing `generate-lecture` edge function exactly.

- Accept POST with `{ sections: string[] }`
- Call Perplexity Sonar API (`https://api.perplexity.ai/chat/completions`) with model `sonar`
- Auth: `Bearer ${Deno.env.get("PERPLEXITY_API_KEY")}` (already in secrets)
- Set `search_recency_filter: "year"` and `return_citations: true`
- Build prompt requesting JSON array of `{ section, status, summary, billNumber, sourceUrl, checkedAt }`
- Parse the AI response content, extract JSON, return to client
- Standard CORS headers, error handling matching `generate-lecture` pattern

### Step 2: Update `src/pages/NRSReference.tsx`

Add third tab "NRS Update Checker" to existing `<Tabs>`.

**New type (inline):**
```ts
interface NRSUpdateResult {
  section: string;
  status: "changed" | "no_change" | "unknown";
  summary?: string;
  billNumber?: string;
  sourceUrl?: string;
  checkedAt: string;
}
```

**New state:**
- `checkerSections: string[]` — pre-populated with first 10 statutes
- `checkerResults: NRSUpdateResult[]`
- `isChecking: boolean`
- `lastChecked: string | null`

**Tab UI:**
- Scrollable checkbox list of all statutes (section number + title)
- Select All / Clear buttons + count badge
- "Check for Updates" button (disabled when no sections selected, shows Loader2 spinner)
- Last checked timestamp display

**Results area:**
- Card per result with colored badge (amber=changed, green=no_change, gray=unknown)
- Summary text, bill number, external link (using existing `getLegUrl()` as fallback)
- Footer note about PERPLEXITY_API_KEY requirement

**New imports:** `Checkbox`, `ScrollArea`, `Loader2`

### Files Modified
1. `supabase/functions/check-nrs-updates/index.ts` — new file
2. `src/pages/NRSReference.tsx` — add third tab with all UI/logic

### Not Changed
- Existing Statute Reference and Cross-Reference tabs
- `nrs-reference.ts` data file
- `getLegUrl()` helper (reused as-is)
- Any other pages or components
- `supabase/config.toml`

