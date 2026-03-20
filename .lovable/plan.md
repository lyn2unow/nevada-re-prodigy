

## Fix: Wait for Auth Before Fetching Settings

### Problem
The mount `useEffect` fires immediately and calls `fetchSetting("syllabus")` before the auth session resolves. RLS blocks the unauthenticated read, returning nothing. The write works because it happens later when the user is authenticated.

### Fix in `src/stores/course-store.ts` (lines 180–205)

Replace the current mount `useEffect` with one that:
1. Gets the current session via `supabase.auth.getSession()` first
2. Subscribes to `onAuthStateChange` to re-fetch when auth state changes (e.g., login)
3. Only calls `fetchSetting` when a valid session exists; otherwise skips settings fetch

```ts
useEffect(() => {
  let cancelled = false;

  const loadData = async (session: any) => {
    const [mods, qs, acts, pes, syllabus, nrs645] = await Promise.all([
      fetchCustomModules(),
      fetchCustomQuestions(),
      fetchCustomActivities(),
      fetchCustomPracticeExams(),
      session ? fetchSetting("syllabus") : Promise.resolve(undefined),
      session ? fetchSetting("nrs645") : Promise.resolve(undefined),
    ]);
    console.log("[course-store] loadData — session:", session ? `yes (${session.user.id})` : "NO SESSION");
    console.log("[course-store] loadData — syllabus:", syllabus);
    console.log("[course-store] loadData — nrs645:", nrs645);
    if (!cancelled) {
      setCustomModules(mods);
      setCustomQuestions(qs);
      setCustomActivities(acts);
      setCustomPracticeExams(pes);
      if (syllabus) setSyllabusTemplate(syllabus as SyllabusTemplate);
      if (nrs645) setStatuteSections(nrs645 as import("@/types/course").StatuteSection[]);
      setDbLoading(false);
    }
  };

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!cancelled) loadData(session);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!cancelled) loadData(session);
  });

  return () => {
    cancelled = true;
    subscription.unsubscribe();
  };
}, []);
```

### Scope
- **Only file**: `src/stores/course-store.ts`, lines 180–205
- Diagnostic logs kept temporarily for verification
- No other files, no migration, no schema changes

