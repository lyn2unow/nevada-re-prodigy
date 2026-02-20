

# Add Lecture Notes Content Source (Starting with Unit 1)

## Overview

Create a new "Lecture Notes" content source that converts your instructor lecture scripts into structured modules, exam questions, and activities. Unit 1 (Real Estate Brokerage & Agency) contains 8 lecture modules -- these will be added as individual modules tagged with `sourceTag: "Lecture Notes"`, all mapped to **Week 1**.

This establishes the pattern for Units 2-7 as you provide them.

## Content Mapping from Unit 1

The lecture script contains 8 distinct modules. Each maps to a `Module` with key terms, knowledge checks, exam alerts, and discussion prompts extracted directly from your script:

| Module | ID | Title | Key Terms | Knowledge Checks |
|---|---|---|---|---|
| Module 1 | `ln-u1-mod-1` | Introduction & Licensing Landscape | 4 terms (Broker, Salesperson, NRS 645, NAC 645) | 0 (intro module) |
| Module 2 | `ln-u1-mod-2` | Definition & Scope of a Real-Estate Broker | 5 terms (NRS 645.030, five activity categories, entity types, designated broker, Jory v Bennight) | 2 |
| Module 3 | `ln-u1-mod-3` | Business Licenses & Place of Business | 4 terms (state business license, place of business, branch office, signage requirement) | 2 |
| Module 4 | `ln-u1-mod-4` | Supervision, Records & Trust Accounts | 5 terms (supervision, trust account, commingling, 5-year retention, compensation flow) | 3 |
| Module 5 | `ln-u1-mod-5` | Agency Relationships in Nevada | 5 terms (NRS 645.0045, single agency, dual/multiple representation, assigned agency, Consent to Act) | 2 |
| Module 6 | `ln-u1-mod-6` | Duties Owed by Nevada Licensees | 4 terms (NRS 645.252, NRS 645.254, material property facts, transaction facts) | 2 |
| Module 7 | `ln-u1-mod-7` | Other Brokerage Topics | 5 terms (stigmatized property NRS 40.770, personal assistant, team advertising, antitrust NRS 598A, fair housing NRS 118) | 2 |
| Module 8 | `ln-u1-mod-8` | Unit 1 Recap & Exam-Prep Focus | 0 (recap) | 5 (the mini-quiz) |

## Exam Questions (~10 questions from Unit 1)

Drawn from the mini-quiz and key discussion prompts in the lecture. All tagged `source: "Lecture Notes"` with appropriate difficulty and exam-trap flags. Examples:

- Broker liability for associated licensees
- 5-year record retention requirement
- 5 calendar days paperwork delivery
- Salesperson acting on behalf of broker
- Consent to Act form not required in assigned agency

## Activities (3 activities from Unit 1)

Extracted directly from the in-class activities described in the lecture:

1. **Brokerage Violation Identification** (case-study) -- the pairs exercise from Module 4 (earnest money delay, unlicensed posting, record retention)
2. **Material Facts Classification** (contract-drill) -- the property vs transaction fact exercise from Module 6
3. **Unlicensed Brokerage Activity Analysis** (ethical-debate) -- the discussion prompt from Module 2

## Technical Changes

### New file
- `src/data/lecture-notes-content.ts` -- exports `getLectureNotesModules()`, `getLectureNotesExamQuestions()`, `getLectureNotesActivities()`
- Only Unit 1 content for now; future units will be appended to this file

### Modified files
- `src/stores/course-store.ts` -- add `loadLectureNotesContent()` method (same merge/dedup pattern as CE Shop and Pearson VUE)
- `src/pages/Index.tsx` -- add "Load Lecture Notes" CTA card on Dashboard (conditional on whether any "Lecture Notes" modules exist)

## Future Units

When you provide Units 2-7, each unit's modules will be appended to the same `lecture-notes-content.ts` file following the same `ln-u{X}-mod-{Y}` ID pattern, mapped to their respective weeks. The store's merge logic ensures no duplicates if content is reloaded.

