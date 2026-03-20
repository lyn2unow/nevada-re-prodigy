
Verified target file before any changes:
- `src/stores/course-store.ts:154` — `upsertSetting`
- `src/stores/course-store.ts:177` — mount `useEffect`
- `src/stores/course-store.ts:308` — `updateSyllabus`

Plan:
1. Update only `src/stores/course-store.ts`.
2. Add temporary `console.log` statements with a clear prefix like `[course-store]` so the output is easy to filter.
3. In `upsertSetting`:
   - log the `key` being written
   - log the `session` returned by `supabase.auth.getSession()`
   - log when the function skips because session is missing
   - log any returned `error` after the upsert
4. In the mount `useEffect`:
   - log the value returned by `fetchSetting("syllabus")` after the `Promise.all` resolves
   - keep the existing state-setting logic unchanged
5. In `updateSyllabus`:
   - log immediately before calling `upsertSetting("syllabus", template)`
   - log immediately after the await returns, including the returned error value
6. Do not change any persistence logic, auth logic, or UI behavior yet — diagnostics only.
7. After you reproduce the bug and share the console output, use those logs to identify whether the failure is:
   - no session at write time
   - write error from the backend
   - successful write but empty/failed read on mount
   - logout/login causing a different session/user to read different data

Scope:
- Only `src/stores/course-store.ts`
- No changes to `SyllabusPage`, context files, database schema, or policies in this step
