

# Scoped NRS 645 Reference with Automatic Cross-Referencing

## Overview

Instead of ingesting all ~130 sections of NRS 645, this plan creates a targeted reference containing only the statute sections actually cited in your course content (modules, exam questions, activities). It also adds an automatic cross-reference system that flags any content where your lecture notes or textbook material may conflict with the verbatim statutory text.

## Step 1: Identify All Referenced Statutes

From scanning all content files, the following NRS/NAC sections are explicitly referenced:

**NRS 645 sections (~25):**
- 645.0005 (Definitions intro)
- 645.0045 (Agency defined)
- 645.005 (Brokerage agreement defined)
- 645.030 (Real-estate broker defined)
- 645.252 (Duties of licensee acting as agent)
- 645.253 (Duties owed by broker to each party)
- 645.254 (Disclosure of agency relationship)
- 645.300 (Delivery of agreements)
- 645.320 (Exclusive agreement requirements)
- 645.330 (Broker exam requirements)
- 645.343 (Salesperson exam requirements)
- 645.570 (CE requirements)
- 645.575 (CE course content)
- 645.580 (CE waivers)
- 645.585 (CE reporting)
- 645.610 (Grounds for discipline)
- 645.630 (Additional grounds for discipline)
- 645.633 (Disciplinary actions)
- 645.635 (Prohibited acts, including 635(2) exclusive client interference)
- 645.8701-645.8811 (Commercial broker lien)

**Other NRS chapters (~5):**
- NRS 40.770 (Stigmatized property)
- NRS 118 (Fair housing)
- NRS 148.110 (Probate sales)
- NRS 598A (Antitrust/unfair trade practices)

**NAC sections (~2):**
- NAC 645.605 (Duties Owed form)
- NAC 645.675 (Advance fee contracts)

Total: approximately 30-35 statute entries -- far more manageable than 130+.

## Step 2: Create the Reference Data

### New file: `src/data/nrs-reference.ts`

Each entry contains:
- Section number and title
- Verbatim statutory text (scraped from leg.state.nv.us)
- Category for grouping
- List of content IDs that reference this section (for cross-referencing)

## Step 3: Add Cross-Reference Detection

### New file: `src/lib/cross-reference.ts`

A utility that:
1. Scans all modules, exam questions, and activities for NRS/NAC citations
2. Compares claims made in the content against the verbatim statute text
3. Returns a list of potential conflicts or discrepancies

This is a pattern-matching system -- it identifies where content *cites* a statute and surfaces both the content claim and the actual statute text side-by-side so you can verify accuracy.

## Step 4: NRS Reference Page

### New file: `src/pages/NRSReference.tsx`

Route: `/nrs-reference`

Features:
- Searchable list of all referenced statutes
- Filter by category (Definitions, Agency, Licensing, Discipline, etc.)
- Each statute card shows the verbatim text plus a "Referenced by" list showing which modules/questions cite it
- A "Cross-Reference Report" tab that highlights potential conflicts between content sources and the statute text

## Step 5: Integration Updates

### Modified files:
- `src/types/course.ts` -- add `StatuteSection` type and `statuteSections` to `CourseData`
- `src/stores/course-store.ts` -- add `loadNRS645()` method
- `src/App.tsx` -- add `/nrs-reference` route
- `src/components/AppSidebar.tsx` -- add "NRS Reference" nav link with Scale icon
- `src/pages/Index.tsx` -- add "Load NRS 645 Reference" CTA card

## Technical Details

### StatuteSection type

```text
StatuteSection {
  id: string                    // e.g., "nrs-645-252"
  sectionNumber: string         // e.g., "NRS 645.252"
  title: string                 // e.g., "Duties of licensee acting as agent"
  text: string                  // Verbatim statutory text
  category: string              // Definitions, Agency, Licensing, etc.
  referencedBy: string[]        // Module/question IDs that cite this section
}
```

### Cross-reference output

```text
CrossReferenceResult {
  statuteId: string
  contentId: string
  contentType: "module" | "exam-question" | "activity"
  contentTitle: string
  contentClaim: string          // The text in the content that references this statute
  statuteText: string           // The actual verbatim statute text
  status: "verified" | "review" // Whether the claim aligns with statute
}
```

### Data sourcing

The verbatim statute text will be extracted from https://www.leg.state.nv.us/nrs/nrs-645.html for all identified sections. For non-645 statutes (NRS 40.770, NRS 118, NRS 148.110, NRS 598A), abbreviated summaries will be included with links to the full text since those are outside the primary chapter.

## Sequencing

This is planned as the last content source to add (per your instruction). It will be implemented after all lecture note units are ingested, ensuring the cross-reference captures the complete content library.
