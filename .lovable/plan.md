

# Revised Gap Analysis — Current State

## What's Been Completed

| Item | Status |
|---|---|
| Schema: `PearsonVueArea` type (16 areas) | Done |
| Schema: `CognitiveLevel` type | Done |
| Schema: optional fields on `Module`, `ExamQuestion`, `KnowledgeCheckQuestion` | Done |
| Lovable Cloud enabled | Done |
| AI Lecture Generator (edge function + UI + streaming + copy) | Done |
| Content: Lecture Notes Units 1–17 (~89 modules, ~92 exam questions, ~18 activities) | Done |
| Content: CE Shop (8 modules, 40 questions, 3 activities) | Done |
| Content: Pearson VUE (modules + questions) | Done |
| Content: Textbook content | Done |
| Content: NRS 645 statute reference | Done |
| Cross-reference system (NRS citation scanner) | Done |
| Practice Exam Builder (manual selection with filters) | Done |
| Export system (text, PDF, QTI) | Done |
| Syllabus page (renders template) | Done |

## Remaining Gaps (Prioritized)

### 1. Exam Coverage Dashboard — HIGH

No visualization exists showing how content maps to Pearson VUE exam area weights. This is the core value of the exam-weighted approach: seeing at a glance that you have 40 questions on Contracts (23% weight) but only 2 on Record Keeping (3% weight). Currently there is no page, component, or logic for this.

**What it needs:**
- A page showing each of the 16 Pearson VUE areas with their exam weight percentages
- Count of modules and exam questions tagged to each area
- Visual coverage indicator (bar chart or progress bars) showing actual vs. expected proportions
- Ability to click into an area to see which content is tagged there

**Prerequisite:** Existing content needs `pearsonVueArea` values populated. The fields exist in the schema but no data files currently set them.

### 2. Tag Existing Content with PearsonVueArea + CognitiveLevel — HIGH

The schema fields exist but **zero content** currently uses them. All modules and exam questions across all data files (`lecture-notes-content.ts`, `ce-shop-content.ts`, `pearson-vue-content.ts`, `textbook-content.ts`) have `pearsonVueArea` and `cognitiveLevel` either undefined or missing. Without tagging, the Exam Coverage Dashboard and weighted practice exams are empty.

**What it needs:**
- Map each existing module to its appropriate Pearson VUE area
- Tag each exam question with `pearsonVueArea` and `cognitiveLevel`
- This is a large data task across ~150+ modules and ~130+ questions

### 3. Weighted Practice Exam Mode — MEDIUM

The Practice Exam Builder currently supports manual question selection with topic/difficulty/source filters. It does not support a "Pearson VUE Weighted" mode that auto-selects questions proportionally to exam area weights (e.g., 23% Contracts, 20% Disclosures).

**What it needs:**
- A "Generate Weighted Exam" option alongside the current manual builder
- Input: total question count desired
- Logic: distribute questions across areas proportional to Pearson VUE weights
- Requires tagged content (Gap #2) to function

### 4. Syllabus Template Update to Spring 2026 — MEDIUM

`syllabus-template.ts` still reflects the **Fall 2025** textbook-ordered structure. The Spring 2026 syllabus uses exam-weighted sessions, 11 topic-aligned quizzes, a midterm, and cognitive level tags per session.

**What it needs:**
- Update dates, schedule, grading categories
- Restructure `weeklySchedule` to match exam-weighted sessions
- Add cognitive level indicators per session
- Update grading to 11 quizzes + midterm + final structure

### 5. Canvas-Compatible Export Formats — LOW

The export system supports text, PDF, and QTI. It does not produce Canvas-native Discussion or Assignment formats. Useful for LMS integration but not blocking the exam-weighted workflow.

### 6. Textbook Content as Supplemental Cross-Reference — LOW

Textbook content exists but is not explicitly marked as supplemental or cross-referenced against higher-authority sources. Lower priority given the exam-weighted approach demotes it.

## Recommended Next Steps

Pick from the top of the list. Gaps 1 and 2 are tightly coupled — tagging content (Gap 2) makes the dashboard (Gap 1) useful. They could be done together or sequentially (tag first, then dashboard).

