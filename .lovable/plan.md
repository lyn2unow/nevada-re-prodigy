

# Revised Plan: Pearson VUE Cognitive Level Awareness

Updated with explicit tool schema format note in Section 3.

## 1. Type Update — `src/types/course.ts`
Add two optional fields to the `Activity` interface:
- `cognitiveLevel?: CognitiveLevel`
- `pearsonVueArea?: PearsonVueArea`

## 2. Activity Form — `src/pages/ActivityForm.tsx`
- Cognitive Level selector (Not specified / knowledge / application / analysis) with helper text
- Pearson VUE Exam Area selector from existing `PearsonVueArea` values
- AI Generate button (Sparkles icon, right-aligned in CardHeader)
- On click: match module by weekNumber → pearsonVueArea → first for week; extract source material (conceptExplanation truncated to 1000 chars, max 10 keyTerms, max 5 examAlerts); call edge function via `supabase.functions.invoke()`; populate content fields only (title, description, instructorNotes, debriefPrompts)

## 3. Edge Function — `supabase/functions/generate-activity/index.ts`

Config: add `[functions.generate-activity]` with `verify_jwt = false` to `supabase/config.toml`.

**CORS headers — define at top of file:**
```text
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

if (req.method === "OPTIONS") {
  return new Response(null, { headers: corsHeaders });
}
```

**Two-model fallback:** `claude-sonnet-4-20250514` first, `google/gemini-3-flash-preview` on 429/402.

**Tool calling** with `extract_activity` tool: title (string), description (string), instructorNotes (string), debriefPrompts (array of 3 strings). All required.

**Cognitive level description map:**
```text
const cognitiveLevelDescriptions = {
  knowledge: "Recall definitions, rules, timelines, thresholds",
  application: "Apply rules to a given situation or scenario",
  analysis: "Evaluate, compare, and reason through complex problems",
};
```

**Tool schema format note:** The `extract_activity` tool must be passed in the `tools` array using Anthropic's native tool schema format — `input_schema` with `type: "object"`, `properties`, and `required` array. Do NOT use OpenAI's function wrapper format (`{ type: "function", function: { ... } }`). The Lovable gateway accepts Anthropic-native format for both Claude and Gemini models when tool calling is involved. Example:

```text
tools: [{
  name: "extract_activity",
  description: "Extract the generated activity fields",
  input_schema: {
    type: "object",
    required: ["title", "description", "instructorNotes", "debriefPrompts"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      instructorNotes: { type: "string" },
      debriefPrompts: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 3
      }
    }
  }
}]
```

**Response parsing — explicit dual-format branching:**
```text
const responseJson = await response.json();
let toolInput;

// Claude native format: content array with tool_use blocks
const toolUseBlock = responseJson.content?.find(
  block => block.type === "tool_use" && block.name === "extract_activity"
);

if (toolUseBlock) {
  toolInput = toolUseBlock.input;
} else {
  // OpenAI-compatible format (Gemini fallback via gateway)
  const toolCall = responseJson.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall) {
    return new Response(
      JSON.stringify({ error: "No tool call found in response" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  toolInput = JSON.parse(toolCall.function.arguments);
}

return new Response(JSON.stringify(toolInput), {
  headers: { ...corsHeaders, "Content-Type": "application/json" }
});
```

## 4. Activity List — `src/pages/ActivityGenerator.tsx`
- Cognitive level filter: All Levels | Knowledge | Application | Analysis
- Colored badges: knowledge (blue), application (amber), analysis (rose)
- Badge placed next to existing activity type badge in card header

## 5. Files Changed

| File | Change |
|------|--------|
| `src/types/course.ts` | Add 2 optional fields to Activity |
| `src/pages/ActivityForm.tsx` | Selectors + AI Generate button + generation logic |
| `src/pages/ActivityGenerator.tsx` | Filter + colored badges |
| `supabase/functions/generate-activity/index.ts` | New edge function with CORS, dual-model fallback, Anthropic-native tool schema, dual-format parsing |
| `supabase/config.toml` | Add generate-activity function config |

No migrations or seed data changes needed.

