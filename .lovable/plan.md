

# Fix Week Filter via Topic-to-Week Mapping

## Problem
`ExamQuestion` objects don't have `weekNumber` populated — the field is `undefined` for all questions. The week filter matches nothing.

## Solution
Map questions to weeks using their `topic` field instead. Three changes in `src/pages/PracticeExamBuilder.tsx`:

### 1. Add `TOPIC_WEEK_MAP` constant (after `WEEK_OPTIONS`, ~line 28)

```typescript
const TOPIC_WEEK_MAP: Record<string, number> = {
  "Agency": 1,
  "License Law": 2,
  "Commission Powers": 2,
  "Licensing": 2,
  "Contracts": 3,
  "Property Ownership": 4,
  "Land Description": 4,
  "Encumbrances": 4,
  "Fair Housing": 5,
  "Ethics": 5,
  "Nevada Special Topics": 5,
  "Financing": 6,
  "Real Estate Finance": 6,
  "Foreclosure": 6,
  "Leases": 6,
  "Closing": 7,
  "Appraisal": 7,
  "Land Use Controls": 7,
  "Environmental Issues": 7,
};
```

**Note:** The textbook data uses more granular topics (e.g. "Broker Liability", "Dual Agency", "Assigned Agency") that aren't in this map. Those questions will only appear under "All Weeks". You may want to expand the map later.

### 2. Update `topicOptions` useMemo (~line 52)
Change: `String(q.weekNumber) === weekFilter`
To: `TOPIC_WEEK_MAP[q.topic] === Number(weekFilter)`

### 3. Update `filtered` useMemo (~line 71)
Change: `String(q.weekNumber) === weekFilter`
To: `TOPIC_WEEK_MAP[q.topic] === Number(weekFilter)`

### Files changed

| File | Change |
|------|--------|
| `src/pages/PracticeExamBuilder.tsx` | Add `TOPIC_WEEK_MAP`, update 2 week-match comparisons |

