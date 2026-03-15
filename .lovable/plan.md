

# Combined Plan: Schema Updates + AI Lecture Generator

## Overview

Two workstreams delivered together:
1. **Schema updates** — Add `pearsonVueArea` and `cognitiveLevel` fields to Module and ExamQuestion types
2. **AI Lecture Generator** — New page where the instructor selects a topic, chooses a lecture duration (15-minute increments), and gets AI-generated lecture notes they can copy

## Key Requirement: TMCC Objectives + Authority Hierarchy

The AI Lecture Generator must produce lecture notes that:
- **Align with TMCC course objectives** — the system prompt will reference the 13 TMCC catalog objectives so generated lectures map to specific learning outcomes
- **Follow the established content authority hierarchy** when citing sources and resolving conflicts:
  1. NRS/NAC (ground truth)
  2. Pearson VUE
  3. CE Shop
  4. Lecture Notes
  5. Textbook (supplemental)
- The system prompt will instruct the AI to prioritize NRS/NAC citations first, note Pearson VUE exam relevance, and treat textbook references as supplemental only
- Generated notes will include a "Source Priority" section indicating which authority level supports each key claim

## Part 1: Schema Updates

**File: `src/types/course.ts`**
- Add `PearsonVueArea` type (16 National/State areas)
- Add `CognitiveLevel` type: `"knowledge" | "application" | "analysis"`
- Add optional fields to `Module`, `ExamQuestion`, `KnowledgeCheckQuestion`

## Part 2: AI Lecture Generator

**Edge function: `supabase/functions/generate-lecture/index.ts`**
- Accepts `{ topic, durationMinutes }`
- System prompt includes:
  - TMCC RE 103 course objectives (all 13)
  - Authority hierarchy instructions: "Always cite NRS/NAC as primary authority. Reference Pearson VUE exam content areas and weights. Note CE Shop and lecture note alignment. Treat textbook as supplemental only. Flag any known conflicts between sources."
  - Duration-based section timing
- Uses `google/gemini-3-flash-preview` via AI Gateway
- Streams response as SSE
- Handles 429/402 errors

**New page: `src/pages/LectureGenerator.tsx`**
- Topic selector dropdown (major RE 103 topics + custom)
- Duration selector (15–120 min in 15-min increments)
- Generate button with streaming markdown output
- Copy to Clipboard button
- Generated output will include: learning objectives mapped to TMCC catalog, NRS/NAC citations, Pearson VUE exam weight relevance, time allocations per section

**Navigation updates:**
- `src/components/AppSidebar.tsx` — add nav item
- `src/App.tsx` — add route

**Infrastructure:**
- Enable Lovable Cloud
- `supabase/config.toml` — add function entry

## Build Order

1. Enable Lovable Cloud
2. Schema updates to `src/types/course.ts`
3. Edge function with TMCC-aligned, hierarchy-aware system prompt
4. Lecture Generator page with streaming UI
5. Sidebar and router updates

