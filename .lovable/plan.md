

## Combined Plan: Syllabus/NRS Persistence + Insert Row Below

### Part A: Database Persistence

**Step 1: Create `user_settings` table (migration)**

```sql
create table public.user_settings (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);
alter table public.user_settings enable row level security;
create policy "Auth select" on public.user_settings for select to authenticated using (true);
create policy "Auth insert" on public.user_settings for insert to authenticated with check (true);
create policy "Auth update" on public.user_settings for update to authenticated using (true) with check (true);
```

**Step 2: Update `src/stores/course-store.ts`**

- Add `fetchSetting(key)` and `upsertSetting(key, data)` helper functions using `user_settings` table
- Update mount `useEffect` — add `fetchSetting("syllabus")` and `fetchSetting("nrs645")` to `Promise.all`; populate state if found
- Update `updateSyllabus` — add `await upsertSetting("syllabus", template)` after `setSyllabusTemplate`
- Update `loadDefaultSyllabus` — add `await upsertSetting("syllabus", ...)` after setting state
- Update `loadNRS645` — add `await upsertSetting("nrs645", ...)` after setting state
- Add error toasts on failed upserts

No changes to `Index.tsx` needed — existing CTA conditions already check data presence.

### Part B: Insert Row Below (SyllabusPage)

**Step 3: Update `src/pages/SyllabusPage.tsx`**

- Add `insertArrayItemAfter` helper alongside existing `addArrayItem`/`removeArrayItem`
- In the Weekly Schedule editing branch, add a Plus button before the Trash2 button in each row's action cell
- New row inherits same `week` number, blank `day`/`unitTopic`/`assignmentQuiz`
- Widen action column `TableHead` from `w-10` to `w-20`

### Files Modified
1. Database migration — new `user_settings` table with RLS
2. `src/stores/course-store.ts` — fetch/upsert settings, update mount + three callbacks
3. `src/pages/SyllabusPage.tsx` — add `insertArrayItemAfter` helper + insert button in schedule table

