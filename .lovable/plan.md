

# Add Unit 3 Lecture Notes: Interests in Real Estate

## Overview

Add 6 modules, 5 exam questions, and 1 activity for Unit 3 (Week 3) covering marital property, homestead protections, easements, water rights, landowner liability, and eviction procedures.

## New Content Summary

### 6 Modules (weekNumber: 3, IDs: ln-u3-mod-1 through ln-u3-mod-6)

| # | Title | Key Statutes |
|---|---|---|
| 1 | Marital Property (Community Property) | NRS 123.220 |
| 2 | Homestead Protections | NRS 115.050, Massey-Ferguson v. Childress |
| 3 | Easements (Prescriptive, Solar, Conservation) | NRS 111.370-111.440, Stix v. La Rue, Jordan v. Bailey |
| 4 | Water Rights (Prior Appropriation) | U.S. v. State Engineer (2001) |
| 5 | Landowner & Lessee Liability | SB 160 (2015), Moody v. Manny's Auto Repair |
| 6 | Eviction of Unlawful Occupants | NRS 40 (Summary Eviction) |

### 5 Exam Questions (IDs: ln-eq-u3-1 through ln-eq-u3-5)

Covering homestead equity limit, prescriptive easement period, prior appropriation doctrine, SB 160 no-duty rule, and summary eviction timeline.

### 1 Activity (ID: ln-act-u3-1)

"Easement Scenarios" group activity -- students sketch and classify driveway, solar, and conservation easements.

## Technical Details

### File modified
- `src/data/lecture-notes-content.ts`

### Changes
1. Update file comment to include Unit 3
2. Append 6 modules to `getLectureNotesModules()` return array (order: 40-45, weekNumber: 3)
3. Append 5 exam questions to `getLectureNotesExamQuestions()` return array
4. Append 1 activity to `getLectureNotesActivities()` return array

### Pattern
Follows the exact same structure as Unit 1 and Unit 2 entries -- same field shapes, source tag "Lecture Notes", key terms with source attribution, exam alerts, knowledge checks, and discussion prompts.

### NRS Reference impact
New statutes referenced (NRS 115.050, NRS 123.220, NRS 111.370-440, NRS 40) will be picked up by the cross-reference system if/when those sections are added to `nrs-reference.ts`. NRS 40 is already partially covered.

