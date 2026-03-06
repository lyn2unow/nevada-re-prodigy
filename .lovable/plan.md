

# Add Units 6-17 Lecture Notes to Course Library

## Overview

Append 12 units of lecture content (Units 6-17) from the uploaded RTF document into `src/data/lecture-notes-content.ts`. This is the largest content addition yet, covering taxes, contracts, title transfer, recording, license law, financing, leases, appraisal, land use, fair housing, closing procedures, and environmental issues.

## Week Mapping

| Week | Units | Topics |
|------|-------|--------|
| 5 | 6-7 | Taxes & Liens, Contracts & Purchase Agreements |
| 6 | 8-12 | Transfer of Title, Title Records, License Law, Financing, Leases |
| 7 | 13-17 | Appraisal, Land Use, Fair Housing, Closing, Environmental |

(Unit 5 already occupies Week 5; Units 6-7 join it there.)

## Content Summary Per Unit

| Unit | Modules | Exam Qs | Activity | Key Statutes |
|------|---------|---------|----------|--------------|
| 6 - Taxes & Liens | 4 | 5 | 1 | NRS 361.225, NRS 108, NRS 116 (HOA super-priority), SFR v. U.S. Bank |
| 7 - Contracts | 5 | 5 | 1 | NRS 111.210 (Statute of Frauds), NRS 645.254, NRS 129.010, NRS 719 |
| 8 - Transfer of Title | 5 | 5 | 1 | NRS 111.170, NRS 111.060, NRS 111.070, NRS 11.150, NRS 40.090, NRS 134 |
| 9 - Title Records | 3 | 5 | 1 | NRS 719 (electronic recording), UCC-1 filings |
| 10 - License Law | 5 | 5 | 1 | NRS 645.030, 645.630-635, Loomis v. Lang |
| 11 - Financing | 5 | 5 | 1 | NRS 40.050, NRS 107.080, NRS 107.077, NRS 40.433 |
| 12 - Leases | 5 | 5 | 1 | NRS 118A (full suite), NRS 645.019, NAC 645.655 |
| 13 - Appraisal | 3 | 5 | 1 | NRS 645C, NAC 645C, NRS 645.2515 |
| 14 - Land Use | 4 | 5 | 1 | NRS 119, NAC 119, NRS/NAC 119A, NRS 278 |
| 15 - Fair Housing | 4 | 5 | 1 | NRS 118.100, NRS 645.321, Civil Rights Act 1866, FHA 1968 |
| 16 - Closing | 4 | 5 | 1 | NRS 645A, NAC 645A, NAC 692A, TRID |
| 17 - Environmental | 3 | 5 | 1 | NRS 645.254(3)(d), NRS 445D, lead-based paint federal law |

**Totals: ~50 modules, ~60 exam questions, 12 activities**

## Technical Details

### File modified
- `src/data/lecture-notes-content.ts`

### ID scheme
- Modules: `ln-u{N}-mod-{X}` (continues existing pattern)
- Exam questions: `ln-eq-u{N}-{X}`
- Activities: `ln-act-u{N}-1`
- Key terms: `ln-u{N}-kt-{X}`
- Exam alerts: `ln-u{N}-ea-{X}`
- Knowledge checks: `ln-u{N}-kc-{X}`

### Module order numbering
Continues from Unit 5's order 57. Unit 6 starts at order 58.

### Implementation approach
Due to the massive size (~3000+ new lines), the content will be appended in sections to the three existing return arrays. The file header comment will be updated to reflect Units 1-17.

### Pattern
Same structure as Units 1-5: source tag "Lecture Notes", key terms with source attribution, exam alerts with type classification, knowledge checks with 4 options, discussion prompts, and real-world scenarios drawn directly from instructor teaching notes.

