

# Source Viewer Page

## Overview
A new `/source-viewer` page that lets you browse all hardcoded content organized by source (CE Shop, Pearson VUE, Lecture Notes, NRS 645). Each source tab shows its modules (with key terms, exam alerts, knowledge checks), exam questions, and activities — all fully expanded and readable for accuracy verification.

## Layout

- **Top**: Page title + search bar for filtering across all content
- **Source tabs**: CE Shop | Pearson VUE | Lecture Notes | NRS 645
- **Within each tab**, three collapsible sections:
  - **Modules** — each module as an expandable card showing: title, week, key terms table, concept explanation, legal refs, exam key points, exam alerts, knowledge checks, common mistakes
  - **Exam Questions** — each question with all 4 options, correct answer highlighted in green, explanation, wrong explanations, difficulty badge, tags
  - **Activities** — full activity detail (title, type, description, instructor notes, debrief prompts)
- **NRS 645 tab** pulls from `getNRS645Sections()` and shows statute sections grouped by category
- **Summary counts** at top of each tab (e.g., "8 Modules · 40 Questions · 3 Activities")

## Changes

| File | Action |
|------|--------|
| `src/pages/SourceViewer.tsx` | New page — imports directly from all 4 data files, renders tabbed source browser with search |
| `src/App.tsx` | Add route `/source-viewer` |
| `src/components/AppSidebar.tsx` | Add "Source Viewer" nav item with `Eye` icon |

## Technical Notes
- Reads directly from data files (`getCEShopModules()`, etc.) — not from the store — so you always see exactly what's hardcoded
- Search filters across module titles, key term names, question text, and activity titles
- Uses existing Tabs, Card, Collapsible, Badge components
- Correct answers on exam questions shown with green highlight; wrong answer explanations shown inline

