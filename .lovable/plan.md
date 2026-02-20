

# Add Syllabus Template Section

## Overview

Add a dedicated **Syllabus** section to the app (separate from the Content Library) that stores the syllabus as a structured, editable template. This gives you a place to view the current syllabus, edit fields like dates and semester info, and eventually regenerate it for new semesters.

## What Gets Built

### 1. Syllabus Data Type (`src/types/course.ts`)

A new `SyllabusTemplate` interface to store the syllabus as structured data:

- **Course info**: course code, title, semester, instructor name/credentials, meeting days/times, location, date range, textbook, platform, contact info
- **Weekly schedule**: array of weekly entries, each with week number, day, unit/topic, exam alignment, and assignment/quiz info
- **Grading breakdown**: assignment categories with point values, plus the letter-grade scale
- **Policies**: array of policy sections (no late work, attendance, ADA, etc.)
- **Course objectives**: the 8 learning objectives as an array of strings

### 2. Seed Data (`src/data/syllabus-template.ts`)

A new file that exports `getDefaultSyllabusTemplate()` pre-populated with the Fall 2025 data from your uploaded document:

- All 7 weeks of the schedule with unit-to-exam-section mappings
- Grading: Assignments 150 pts, Quizzes 100 pts, Final Exam 150 pts = 400 total
- All institutional policies (withdrawal, ADA, Canvas, etc.)
- Reading requirement and course flow descriptions

### 3. Syllabus Page (`src/pages/SyllabusPage.tsx`)

A new page at `/syllabus` with:

- **Header card** showing course title, semester, instructor, meeting times, location, and textbook
- **Course Objectives** section listing all 8 objectives
- **Weekly Schedule** displayed as a styled table (Week, Day, Unit/Topic, Exam Alignment, Assignment)
- **Grading Breakdown** table with point values and letter-grade scale
- **Policies** section with collapsible panels for each policy
- **Edit button** that opens an edit view where you can update dates, semester name, instructor info, and any other field
- **Save** persists changes to localStorage alongside the rest of the course data

### 4. Store Updates (`src/stores/course-store.ts`)

- Add `syllabusTemplate` to the persisted `CourseData`
- Add `updateSyllabus()` method
- Add `loadDefaultSyllabus()` to initialize from the seed data

### 5. Navigation and Routing

- Add "Syllabus" nav item to the sidebar (using `FileText` icon from Lucide), positioned after Dashboard
- Add `/syllabus` route in `App.tsx`

### 6. Dashboard Integration (`src/pages/Index.tsx`)

- Add a "Load Syllabus Template" CTA card (same pattern as Pearson VUE and CE Shop) that initializes the syllabus from the seed data

## File Changes Summary

| File | Action |
|---|---|
| `src/types/course.ts` | Add `SyllabusTemplate` and related interfaces; add `syllabusTemplate` to `CourseData` |
| `src/data/syllabus-template.ts` | New -- seed data from Fall 2025 document |
| `src/pages/SyllabusPage.tsx` | New -- view and edit the syllabus |
| `src/stores/course-store.ts` | Add `updateSyllabus`, `loadDefaultSyllabus` |
| `src/components/AppSidebar.tsx` | Add "Syllabus" nav link |
| `src/App.tsx` | Add `/syllabus` route |
| `src/pages/Index.tsx` | Add "Load Syllabus" CTA card |

## Future: Template Regeneration

This structure is specifically designed so that in a future iteration, you can tell the AI "regenerate my syllabus for Spring 2026 starting January 12" and it can update the dates, semester label, and any other changes while keeping the weekly topic structure intact. The structured data format makes this straightforward.

