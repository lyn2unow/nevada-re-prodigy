

# Refreshed Gap Analysis — March 18, 2026

## Completed

| Item | Status |
|---|---|
| Schema: `PearsonVueArea` (16 areas) + `CognitiveLevel` types | Done |
| Optional fields on `Module`, `ExamQuestion`, `KnowledgeCheckQuestion` | Done |
| Lovable Cloud enabled | Done |
| AI Lecture Generator (edge function + streaming UI + copy) | Done |
| Content: Lecture Notes Units 1–17 (~89 modules, ~92 questions, ~18 activities) | Done |
| Content: CE Shop (8 modules, 40 questions, 3 activities) | Done |
| Content: Pearson VUE (modules + questions) | Done |
| Content: Textbook content | Done |
| Content: NRS 645 statute reference | Done |
| Cross-reference system (NRS citation scanner) | Done |
| Practice Exam Builder (manual selection with filters) | Done |
| Export system (text, PDF, QTI) | Done |
| Syllabus page (renders template) | Done |
| **Pearson VUE content tagging** (~150 modules, ~130 questions mapped) | **Done — NEW** |
| **Exam Coverage Dashboard** (16-area breakdown, progress bars, drill-down) | **Done — NEW** |

## Remaining Gaps (Prioritized)

### 1. Weighted Practice Exam Mode — HIGH
The Practice Exam Builder only supports manual question selection with topic/difficulty/source filters. No "Pearson VUE Weighted" mode exists.

**What it needs:**
- A "Generate Weighted Exam" button alongside the current manual builder
- Input: desired total question count (e.g., 80 national + 40 state = 120)
- Auto-select questions proportionally to Pearson VUE area weights
- Tagged content (now complete) makes this fully achievable

### 2. Syllabus Template Update to Spring 2026 — HIGH
`syllabus-template.ts` still shows **Fall 2025** (Oct 28–Dec 11, 2025), textbook-ordered sessions. Needs updating to the exam-weighted Spring 2026 format.

**What it needs:**
- Update semester, dates, schedule
- Restructure `weeklySchedule` to exam-weighted sessions instead of textbook chapter order
- Update grading to 11 quizzes + midterm + final structure
- Add cognitive level indicators per session

### 3. Canvas-Compatible Export Formats — MEDIUM
Export supports text, PDF, and QTI. No Canvas-native Discussion or Assignment formats. Useful for direct LMS integration.

### 4. Textbook as Supplemental Cross-Reference — LOW
Textbook content exists but is not explicitly flagged as supplemental or cross-referenced against higher-authority sources. The authority hierarchy is established in the Lecture Generator prompt but not surfaced in the content library or module views.

### 5. Database Persistence — LOW
All course data lives in local state / static data files. No backend persistence to Lovable Cloud tables. Content resets on page reload (except what's hardcoded). This only matters if the instructor wants to save custom modules, exams, or activities across sessions.

## Recommended Next Step
Gaps 1 and 2 are independent and can be tackled in either order. The Weighted Practice Exam mode leverages the tagging work just completed and delivers immediate exam-prep value.

