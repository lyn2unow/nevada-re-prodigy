

# Restore TOPIC_WEEK_MAP + Combined Week Filter

## Problem
Seed exam questions (e.g., `seed-eq-1`) lack `weekNumber` on the object. The previous refactor removed `TOPIC_WEEK_MAP`, breaking week filtering for these questions. New CE Shop questions have `weekNumber` set directly.

## Changes — `src/pages/PracticeExamBuilder.tsx`

### 1. Add TOPIC_WEEK_MAP constant (after WEEK_OPTIONS, ~line 29)
Restore the original mapping of topic strings to week numbers:
```ts
const TOPIC_WEEK_MAP: Record<string, number> = {
  "Agency": 2, "Law of Agency": 2, "Agency Law & Fiduciary Duties": 2,
  "License Law": 1, "Nevada Licensing Requirements (NRS 645, NAC 645)": 1,
  "Nevada Real Estate Commission: Duties & Powers": 1,
  "Contracts": 5, "Contracts: Listing, Purchase & Lease Agreements": 5,
  "Property Ownership & Transfer": 6, "Fair Housing": 5,
  "Fair Housing (Federal & Nevada)": 6, "Ethics & Professional Conduct": 6,
  "Real Estate Finance": 4, "Real Estate Financing & Lending": 4,
  "Closing & Settlement": 7, "Closing Procedures & Settlement Statements": 7,
  "Property Disclosures (NRS 113, NRS 645)": 3,
  "Valuation & Market Analysis (CMA & Appraisal)": 3,
  "Leasing & Property Management": 4, "Nevada Brokerage Operations": 6,
  "Land Use Controls & Regulations": 7,
  // Add remaining topics as needed
};
```

### 2. Add helper function (before the component, ~line 30)
```ts
const getQuestionWeek = (q: ExamQuestion): number | undefined => {
  if (q.weekNumber !== undefined && q.weekNumber !== null) return q.weekNumber;
  return TOPIC_WEEK_MAP[q.topic];
};
```

### 3. Update topicOptions memo (line 55)
Change `q.weekNumber === Number(weekFilter)` → `getQuestionWeek(q) === Number(weekFilter)`

### 4. Update filtered memo (line 74)
Same change: `q.weekNumber === Number(weekFilter)` → `getQuestionWeek(q) === Number(weekFilter)`

### 5. Add ExamQuestion type import (line 1 area)
Import the type for the helper signature:
```ts
import type { ExamQuestion } from "@/types/course";
```

| Area | Change |
|------|--------|
| After WEEK_OPTIONS | Add TOPIC_WEEK_MAP constant |
| Before component | Add `getQuestionWeek` helper |
| topicOptions memo | Use `getQuestionWeek(q)` |
| filtered memo | Use `getQuestionWeek(q)` |
| Imports | Add `ExamQuestion` type import |

