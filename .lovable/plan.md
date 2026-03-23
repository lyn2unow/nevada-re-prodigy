

# Add Delete Button to Practice Exam Cards

## Summary
Add a delete button to each practice exam card and wire up the missing `deletePracticeExam` function through the store and context.

## Changes

### 1. `src/stores/course-store.ts`
- Add `deletePracticeExam` callback that removes from local state and calls `dbDelete("custom_practice_exams", id)`
- Include it in the returned object

### 2. `src/pages/ExamPrep.tsx`
- Destructure `deletePracticeExam` from `useCourse()`
- Add `handleDeleteExam(id, title)` handler that calls `deletePracticeExam(id)` and shows a toast
- Add a ghost `Trash2` icon button after the "Take Exam" button in each practice exam card (`Trash2` is already imported)

### Technical Detail
No new DB migration needed — the `custom_practice_exams` table already has an authenticated DELETE RLS policy. The store's existing `dbDelete` helper handles the Supabase call.

