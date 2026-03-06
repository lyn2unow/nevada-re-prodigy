

# Add Unit 4 Lecture Notes: Forms of Ownership in Nevada

## Overview

Append 7 modules, 7 exam questions, and 1 activity for Unit 4 (Week 4) covering ownership in severalty, co-ownership types, community property, trusts, business entities, and condos/co-ops/time-shares.

## New Content

### 7 Modules (weekNumber: 4, IDs: ln-u4-mod-1 through ln-u4-mod-7, order: 46-52)

| # | Title | Key Statutes/Concepts |
|---|---|---|
| 1 | Ownership in Severalty | Solo ownership, entity ownership |
| 2 | Joint Tenancy | NRS 111.060, four unities, right of survivorship |
| 3 | Tenancy in Common | Default co-ownership, partition lawsuits |
| 4 | Community Property | NRS 123.020, no dower/curtesy, both spouses must sign |
| 5 | Ownership in Trust | Living trusts, REITs, trustor/trustee/beneficiary |
| 6 | Business Entity Ownership | Corporations, partnerships, LLCs, syndicates |
| 7 | Condos, Co-Ops & Time-Shares | NRS 117, NRS/NAC 119A, HOA, CC&Rs |

### 7 Exam Questions (IDs: ln-eq-u4-1 through ln-eq-u4-7)

1. Default co-ownership type (TIC)
2. Joint tenancy key feature (survivorship)
3. Community property creation (during marriage)
4. Trust title holder (trustee)
5. Condo common-area ownership (TIC)
6. LLC benefit (liability + pass-through)
7. Time-share estate vs use distinction

### 1 Activity (ID: ln-act-u4-1)

"Match the Scenario to the Ownership Type" group exercise with 5 scenarios.

## Technical Details

### File modified
- `src/data/lecture-notes-content.ts`

### Changes
1. Update file comment header to include Unit 4
2. Append 7 modules to `getLectureNotesModules()` (before closing bracket)
3. Append 7 exam questions to `getLectureNotesExamQuestions()`
4. Append 1 activity to `getLectureNotesActivities()`

### Pattern
Same structure as Units 1-3: source tag "Lecture Notes", key terms with source attribution, exam alerts, knowledge checks, and discussion prompts. Orders start at 46 to follow Unit 3's 40-45 range.

### Cross-reference impact
NRS 111.060, NRS 123.020, NRS 117, and NRS/NAC 119A will be picked up by the cross-reference system if those sections are added to `nrs-reference.ts`.

