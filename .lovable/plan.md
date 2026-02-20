

# Add CE Shop Study Sheets to Content Library

## Overview

Create a new data file (`src/data/ce-shop-content.ts`) containing all 8 CE Shop Nevada Exam Prep study sheets as modules, exam questions, and activities tagged with `sourceTag: "CE Shop"`. Add a "Load CE Shop Content" button to the Dashboard, following the same pattern used for Pearson VUE content.

## Content Mapping

Each of the 8 CE Shop study sheets becomes a module, mapped to the appropriate course week based on topic alignment:

| Study Sheet | Module ID | Week | Key Topics |
|---|---|---|---|
| Agency | `ce-mod-agency` | 1 | Statutory agency, dual agency, Form 525/524, assigned agency, duties owed, consent to act |
| Contracts | `ce-mod-contracts` | 3 | Brokerage agreements, listing types, earnest money, closing statements, advance fees, timelines |
| Disclosures | `ce-mod-disclosures` | 3 | Residential Disclosure Guide, Seller's Real Property Disclosure, CIC disclosures, licensee as principal |
| Duties & Powers of the Commission | `ce-mod-commission` | 2 | NRED, REC structure, investigations, hearings, sanctions, Recovery Fund |
| License Practice | `ce-mod-practice` | 6 | Licensee responsibilities, activities requiring license, broker supervision, advertising, trust funds, BPOs |
| Licensing Requirements | `ce-mod-licensing` | 2 | License types, education requirements, renewal, CE hours, reciprocity, status changes |
| Record Keeping | `ce-mod-records` | 4 | 5-year retention, broker records, trust fund records, confidential info protection |
| Special Topics | `ce-mod-special` | 7 | Subdivisions, timeshares, water rights, solar, environmental issues |

## Exam Questions (~40 questions across all 8 topics)

Drawn directly from the study sheet content, covering key facts, NRS citations, and common exam traps identified in each sheet. Mix of basic, intermediate, and advanced difficulty. Examples:

- Agency: Form 524 vs 525, assigned agency vs dual agency, confidentiality duration (1 year)
- Contracts: Exclusive right-to-sell vs exclusive agency, net listings, earnest money deposit timing
- Disclosures: 10-day delivery rule, treble damages, 4-business-day rescission for new defects
- Commission: REC composition (5 members), $10,000 fine cap, Recovery Fund ($25,000/$100,000 caps)
- License Practice: Trust fund rules, $150 commingling exception, BPO requirements
- Licensing: 120 hours for salesperson, 36 hours CE renewal, 12-month exam validity
- Record Keeping: 5-year retention, monthly trust account balancing
- Special Topics: Prior appropriation, timeshare 5-day rescission, subdivision 35+ lots

## Activities (2-3 activities)

- Contract drill: Identifying listing agreement types from scenarios
- Case study: Trust fund handling and commingling scenarios
- Study exercise: Disclosure timeline mapping

## Technical Changes

### New file
- `src/data/ce-shop-content.ts` -- exports `getCEShopModules()`, `getCEShopExamQuestions()`, `getCEShopActivities()`

### Modified files
- `src/stores/course-store.ts` -- add `loadCEShopContent()` method (same merge/dedup pattern as `loadPearsonVueContent`)
- `src/pages/Index.tsx` -- add "Load CE Shop Content" card on Dashboard (conditional, like Pearson VUE)

