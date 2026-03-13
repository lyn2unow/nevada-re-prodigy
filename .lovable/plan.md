

# Fix QTI Export for Canvas Correct-Answer Recognition

## Root Cause

Comparing our generated QTI XML against Canvas's expected format reveals several structural mismatches in `src/lib/export-utils.ts` that prevent Canvas from identifying correct answers:

| Issue | Our Code | Canvas Expects |
|-------|----------|----------------|
| Score values | `maxvalue="100"`, sets `"100"` | `maxvalue="1"`, sets `"1"` |
| Incorrect respcondition `continue` | `continue="Yes"` | `continue="No"` |
| Incorrect respcondition structure | Uses `<not><varequal>` | Uses `<or>` listing each wrong ident explicitly |
| Feedback wrapper | `<flow_mat><material>` | `<material>` directly |

## Changes (single file)

**`src/lib/export-utils.ts`** — rewrite `generateQuestionItemXml` function (~lines 280-364):

1. Change `decvar maxvalue` from `"100"` to `"1"` and `setvar` values from `"100"`/`"0"` to `"1"`/`"0"`
2. Change incorrect `respcondition` to use `continue="No"` (not `"Yes"`)
3. Replace the `<not><varequal>` pattern with an `<or>` block listing each wrong response ident explicitly
4. Remove `<flow_mat>` wrappers from `<itemfeedback>` — use `<material>` directly

These are the exact patterns used in verified working Canvas QTI imports.

