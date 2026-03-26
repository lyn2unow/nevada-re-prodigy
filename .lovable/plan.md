

# Append System Prompt + serve() Handler to generate-lecture

## Change — `supabase/functions/generate-lecture/index.ts`

Append after line 163 (the closing `};` of `DEFAULT_CONTENT`):

1. **`SYSTEM_PROMPT`** constant — instructor persona, TMCC course objectives, content authority hierarchy, output structure requirements
2. **`serve()` handler** with:
   - CORS preflight handling
   - Request parsing (supports `topics` array or `topic` string + `durationMinutes`)
   - Per-topic content block builder using `TOPIC_CONTENT` with `DEFAULT_CONTENT` fallback
   - User prompt construction with word minimums, section counts, and 10 critical instructions
   - Streaming call to Lovable AI Gateway (`google/gemini-2.5-flash-preview`, max_tokens 8000)
   - Error handling for 429, 402, and general errors
   - SSE stream passthrough response

| Detail | Value |
|--------|-------|
| File | `supabase/functions/generate-lecture/index.ts` |
| Location | After line 163 |
| Action | Append ~150 lines (SYSTEM_PROMPT + serve handler) |
| Existing content | Untouched |

