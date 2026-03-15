

# Textbook Content Integration — Unit 1 (Chapter 1)

## Overview
Create the textbook data file with Unit 1 structured into modules, exam questions, and activities following the existing source pattern. Integrate into the Source Viewer and dashboard loader.

## Content Extraction from Unit 1: Real Estate Brokerage and Agency

The chapter covers these major topic areas, which will become **modules**:

1. **Definition of Real Estate Broker** — NRS 645.030, five categories of broker activities, salesperson limitations, broker entities, designated broker, financial institutions
2. **Business Licenses & Place of Business** — State/local business licenses, office requirements, branch offices, license display
3. **Broker Supervision** — Legal duties, duty to monitor, recordkeeping (5 years), trust accounts, compensation rules
4. **Agency Relationships in Nevada** — Statutory definition (NRS 645.0045), single agency, dual agency, assigned agency, representing multiple buyers, IC vs employee
5. **Duties Owed by a Licensee** — NRS 645.252 (all parties), NRS 645.253 (assigned agency), NRS 645.254 (client duties), material facts, confidentiality (1 year)
6. **Disclosure Forms & Stigmatized Property** — Duties Owed form (5 sections), Consent to Act form (8 sections), NRS 40.770 stigmatized property, Residential Disclosure Guide
7. **Personal Assistants, Advertising & Termination** — Licensed/unlicensed assistants, team advertising rules, termination methods (performance, expiration, revocation, mutual agreement)

**Exam questions**: The chapter includes a 15-question quiz with full answer key and explanations — these will be converted directly into `ExamQuestion` objects.

**Activities**: Will generate 2-3 activities (case study on agency scenarios, role-play on form presentation).

## Changes

| File | Action |
|------|--------|
| `src/data/textbook-content.ts` | New file — Unit 1 modules (7), exam questions (15 from quiz), activities (2-3), all tagged `source: "Textbook"` |
| `src/pages/SourceViewer.tsx` | Add "Textbook" tab importing from textbook data |
| `src/pages/Index.tsx` | Add "Load Textbook Content" button to dashboard source loader (if pattern exists) |

## Technical Notes
- All IDs prefixed with `tb-` (e.g., `tb-mod-u1-broker-def`, `tb-eq-u1-01`)
- `sourceTag: "Textbook"` on all items
- Quiz questions from the document already have 4 options + correct answer + explanation — direct mapping to `ExamQuestion` type
- Key terms extracted from bold/defined terms throughout the chapter
- Nevada legal references preserved verbatim (NRS/NAC citations)
- File structured with `getTextbookModules()`, `getTextbookExamQuestions()`, `getTextbookActivities()` export functions matching existing pattern
- Will accommodate future units (2-17) being added to same file or split file

