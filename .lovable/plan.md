

# Add NRS Fetch Helper + Update Authority Hierarchy in generate-lecture

## Three changes to `supabase/functions/generate-lecture/index.ts`

### Change 1 — Insert `fetchNRSContent()` function (after line 163, before line 165)
Insert the full `fetchNRSContent` async function (~70 lines) between the `DEFAULT_CONTENT` closing and the `SYSTEM_PROMPT` constant. This function maps each topic to NRS URLs, fetches them in parallel with an 8-second timeout, strips HTML, and returns formatted statute text.

### Change 2 — Update Content Authority Hierarchy (lines 185–197)
Replace the current CE Shop-first hierarchy with the new NRS-first hierarchy:
1. **NRS/NAC** — Ground truth, live statute text is primary authority
2. **CE Shop** — Exam alignment and cross-check
3. **Pearson VUE** — Exam weights
4. **Lecture Notes** — Practical examples
5. **Textbook** — Supplemental only

### Change 3 — Call `fetchNRSContent` and inject into prompt (lines 250 and 279)
- After line 250 (`perTopicMinutes`), add the `await fetchNRSContent(topics)` call
- On line 279, append `${liveNRSText}` after `${topicBlocks}`

| Detail | Value |
|--------|-------|
| File | `supabase/functions/generate-lecture/index.ts` |
| Insertions | ~70 lines (fetchNRSContent function) + 2 lines (call + injection) |
| Replacements | ~12 lines (authority hierarchy) |
| Net effect | Lectures now fetch live NRS statute text and treat it as ground truth |

