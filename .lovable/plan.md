

## Cleanup: Remove Diagnostic Logs + Deduplicate Auth Events

### File: `src/stores/course-store.ts`

### Change 1: Remove all diagnostic `console.log` statements

Remove logs from:
- `upsertSetting` (lines 156, 158, 165) — remove the 3 log lines, keep the logic
- `loadData` in mount `useEffect` (lines 193–195) — remove the 3 log lines
- `updateSyllabus` (lines 329, 332) — remove the 2 log lines

### Change 2: Filter `onAuthStateChange` to meaningful events only

Replace line 211:
```ts
const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  if (!cancelled) loadData(session);
});
```

With:
```ts
const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
  if (!cancelled && ['SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED'].includes(event)) {
    loadData(session);
  }
});
```

This ensures `loadData` only re-runs on actual auth transitions, not on `INITIAL_SESSION` or other redundant events that duplicate the `getSession()` call.

### Scope
- Only `src/stores/course-store.ts`
- No logic changes, no schema changes

