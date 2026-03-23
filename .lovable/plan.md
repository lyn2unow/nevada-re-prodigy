

# Fix weekFilter comparison in PracticeExamBuilder.tsx

Replace all instances of `q.weekNumber === Number(weekFilter)` with `String(q.weekNumber) === weekFilter` in `src/pages/PracticeExamBuilder.tsx`. This affects two locations:

1. **`topicOptions` useMemo** (~line 56): the week match check
2. **`filtered` useMemo** (~line 68): the `matchesWeek` condition

No other files changed.

