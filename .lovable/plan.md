

# Add weekNumber to Pearson VUE Exam Questions

## Changes — `src/data/pearson-vue-content.ts`

### 1. Exam Questions (pv-eq-1 through pv-eq-15)
Add `weekNumber: 7,` after the `source: "Pearson VUE",` line for all 15 exam questions in `getPearsonVueExamQuestions()` (lines 174, 187, 201, 214, 228, 241, 254, 268, 282, 295, 308, 321, 335, 348, 361).

### 2. Knowledge Check Questions (pv-kc-1 through pv-kc-9)
These are `KnowledgeCheckQuestion` objects embedded inside module `knowledgeChecks` arrays — they are **not** `ExamQuestion` objects and the `KnowledgeCheckQuestion` type does not have a `weekNumber` field. Their parent modules already have `weekNumber: 1` set on the module level.

**Two options:**
- **Option A (recommended):** Add `weekNumber` only to the 15 exam questions. The knowledge checks already inherit week context from their parent modules.
- **Option B:** Also add `weekNumber` to the `KnowledgeCheckQuestion` type in `src/types/course.ts`, then add the field to each knowledge check object.

I recommend Option A since the knowledge checks aren't used in the Practice Exam Builder.

| Detail | Value |
|--------|-------|
| File | `src/data/pearson-vue-content.ts` |
| Items modified | 15 exam questions |
| Change per item | Add `weekNumber: 7,` after `source` line |
| Existing content | Untouched |

