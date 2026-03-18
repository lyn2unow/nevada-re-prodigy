

# Plan: Database Persistence + Source Authority Indicators

## Overview

Two features in one pass: (1) persist instructor-created content to Lovable Cloud while keeping static seed data as a read-only baseline, and (2) surface the content authority hierarchy visually across the app.

---

## Part 1: Database Persistence

### Architecture

Static files remain the read-only baseline. The database stores only instructor-created or instructor-modified content. At runtime, the course store merges both sources (DB content wins on ID collision).

Single instructor — no user_id columns on content tables. Simple email/password auth gates access; no profile table needed.

### Database Tables

Four tables, all with RLS requiring `auth.uid() IS NOT NULL`:

**`custom_modules`** — mirrors the `Module` TypeScript type. Key columns: `id text PK`, `week_number int`, `title text`, `source_tag text`, `data jsonb` (stores the full module object). RLS: authenticated users can CRUD.

**`custom_exam_questions`** — mirrors `ExamQuestion`. Key columns: `id text PK`, `topic text`, `difficulty text`, `source text`, `data jsonb`. RLS: authenticated users can CRUD.

**`custom_activities`** — mirrors `Activity`. Key columns: `id text PK`, `title text`, `type text`, `data jsonb`. RLS: authenticated users can CRUD.

**`custom_practice_exams`** — mirrors `PracticeExam`. Key columns: `id text PK`, `title text`, `question_ids jsonb`, `created_at timestamptz`. RLS: authenticated users can CRUD.

Using `data jsonb` for the full object avoids needing 20+ columns per table and makes schema evolution painless. Indexed columns (topic, difficulty, source_tag) enable server-side filtering later if needed.

### Auth

- Simple login/signup page at `/auth` with email + password
- Email confirmation required (no auto-confirm)
- Auth guard: if not logged in, the app works in read-only mode with seed data only. Creating/editing content prompts login.
- Password reset flow with `/reset-password` route

### Course Store Changes

Update `useCourseStore` to:
1. On mount, fetch all four `custom_*` tables from the database
2. Merge DB results with static seed data (DB wins on ID collision)
3. On add/update/delete operations, write to the database AND update local state
4. Keep localStorage as a fallback cache for offline resilience
5. Show loading state while DB fetch is in progress

### Files to Create/Modify

| File | Action |
|---|---|
| Migration SQL | Create 4 tables + RLS policies |
| `src/pages/AuthPage.tsx` | New — login/signup form |
| `src/pages/ResetPassword.tsx` | New — password reset form |
| `src/hooks/useAuth.ts` | New — auth state hook |
| `src/components/AuthGuard.tsx` | New — wrap mutation actions |
| `src/stores/course-store.ts` | Modify — add DB fetch/merge/write |
| `src/App.tsx` | Modify — add auth routes |
| `src/components/AppSidebar.tsx` | Modify — add login/logout link |

---

## Part 2: Source Authority Indicators

### Authority Ranking

Numeric rank for sorting/display:
1. NRS/NAC (highest)
2. Pearson VUE
3. CE Shop
4. Lecture Notes
5. Textbook (lowest — supplemental)

### Visual Indicators

- **Authority badge with rank icon** on module and question cards in Content Library, Module Builder, and Exam Prep pages
- Color-coded shield icon: gold for NRS/NAC, blue for Pearson VUE, green for CE Shop, gray for Lecture Notes, orange-red for Textbook
- Textbook items get a subtle "Supplemental" label
- Items with `correctsTextbook: true` get a warning icon indicating they override textbook content

### Conflict Detection

- Add a utility function `detectConflicts(modules)` that groups modules by topic/Pearson VUE area and flags when a textbook-sourced module exists alongside a higher-authority module on the same topic
- Surface conflicts as a warning banner in the Content Library

### Authority Filter

- Add "Authority Level" filter dropdown to Content Library (already has source filter — enhance it with sort-by-authority option)

### Files to Create/Modify

| File | Action |
|---|---|
| `src/lib/authority-utils.ts` | New — rank map, conflict detection |
| `src/pages/ContentLibrary.tsx` | Modify — add authority badges, conflict banner, authority sort |
| `src/pages/ModuleBuilder.tsx` | Modify — add authority badge to module cards |
| `src/pages/ExamPrep.tsx` | Modify — add authority badge to question cards |

---

## Implementation Order

1. Database migration (4 tables + RLS)
2. Auth page + auth hook
3. Course store DB integration
4. Authority utility + visual indicators
5. Content Library enhancements

