

## Fix: Guard `upsertSetting` Against Missing Auth Session

### Problem
The `user_settings` table exists and has correct RLS policies. The 401 error occurs because `upsertSetting` fires while the user is unauthenticated (the authorization header contains the anon key, not a user JWT). This happens when `loadDefaultSyllabus` or `loadNRS645` triggers before auth resolves, or when the user isn't logged in at all.

### Fix: Single change in `src/stores/course-store.ts`

Add a session check at the top of `upsertSetting`. If no valid session exists, skip the write silently (the local state update still works, and the data will persist next time the user is authenticated and triggers a save).

**Change `upsertSetting` (lines 154-161) to:**

```ts
async function upsertSetting(key: string, value: any) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null; // skip write silently if not authenticated
  const { error } = await (supabase as any).from("user_settings").upsert(
    { key, data: value, updated_at: new Date().toISOString() },
    { onConflict: "key" }
  );
  if (error) console.error(`upsertSetting(${key}):`, error);
  return error;
}
```

### Files Modified
1. `src/stores/course-store.ts` — add session guard to `upsertSetting`

### Not Changed
- No migration needed (table already exists and is confirmed)
- No other files

