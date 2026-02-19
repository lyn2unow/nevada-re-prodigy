

# Pre-loaded Course Content + Bulk Import Tool

## Overview

Two features to fill the app with real content:
1. **Starter Content Seed** -- Ship the app with ready-made RE 103 modules, exam questions, and activities covering core Nevada real estate topics
2. **Bulk Import from Files** -- A drag-and-drop import page where you can upload Word docs, PDFs, or text files and have them parsed into the app's data structures

---

## Part 1: Starter Content Seed

A new file (`src/data/seed-content.ts`) containing pre-built course material covering the 7-week RE 103 structure. On first launch (empty localStorage), the app will offer a "Load Starter Content" button on the Dashboard.

### Content to seed (representative set across all 7 weeks):

**Modules (7-10 starter modules):**
- Week 1: Law of Agency (duties, types of agency, disclosure requirements under NRS 645)
- Week 2: Nevada License Law (NRS 645 requirements, continuing education, disciplinary actions)
- Week 3: Contracts in Nevada Real Estate (purchase agreements, contingencies, earnest money)
- Week 4: Property Ownership & Transfer (deeds, title, recording statutes)
- Week 5: Fair Housing & Ethics (federal Fair Housing Act + Nevada-specific protections)
- Week 6: Real Estate Finance (loan types, RESPA, Truth in Lending)
- Week 7: Closing & Settlement (prorations, closing statements, Nevada-specific procedures)

Each module will include: key terms with definitions, concept explanation, NRS/NAC citations, a real-world scenario, common mistakes, exam key points, exam alerts, 3 knowledge check questions, a discussion prompt, and an assignment suggestion.

**Exam Questions (20-30 starter questions):**
- Mix of difficulty levels (basic, intermediate, advanced)
- Tagged with exam traps where applicable
- Covering agency, contracts, fair housing, finance, and Nevada-specific law

**Activities (5-7 starter activities):**
- Role-play: Buyer/seller agency disclosure scenario
- Case study: Contract dispute resolution
- Contract drill: Completing a Nevada purchase agreement
- Ethical debate: Dual agency pros and cons
- Closing simulation: Proration calculations

### How it loads:
- A "Load Starter Content" button appears on the Dashboard when the app is empty
- Clicking it merges the seed data into the store
- Users can edit or delete any seeded content freely
- A "Reset to Starter Content" option in settings for starting over

---

## Part 2: Bulk Import from Files

A new Import page (`/import`) accessible from the sidebar that lets users upload files and parse them into course content.

### Supported formats:
- **Plain text / Markdown (.txt, .md)** -- parsed directly in the browser
- **JSON (.json)** -- import a previously exported course data backup (we'll add a matching JSON export)

### Import flow:
1. User drags or selects a file
2. The app reads the file content in the browser (FileReader API)
3. For JSON: validates the structure matches `CourseData` and merges it into the store
4. For text/markdown: presents the raw content in a text area where the user can copy sections into module forms (since unstructured text can't be reliably auto-parsed without AI)
5. Toast confirmation with count of imported items

### JSON round-trip (backup/restore):
- **Export**: A "Download Backup (JSON)" button on the Export page that saves the entire `CourseData` as a `.json` file
- **Import**: The Import page accepts that JSON file and restores all content
- This provides full data portability and protects against localStorage loss

---

## Technical Details

### New files:
| File | Purpose |
|------|---------|
| `src/data/seed-content.ts` | All starter modules, questions, and activities |
| `src/pages/ImportPage.tsx` | File upload UI with drag-and-drop, format detection, and import logic |

### Modified files:
| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Add "Load Starter Content" button when app is empty |
| `src/pages/ExportPage.tsx` | Add "Download Backup (JSON)" button |
| `src/stores/course-store.ts` | Add `importData` and `loadSeedContent` methods |
| `src/App.tsx` | Add `/import` route |
| `src/components/AppSidebar.tsx` | Add Import link to sidebar navigation |

### Import validation (JSON):
- Zod schema validation to ensure imported JSON matches `CourseData` structure
- Deduplication check by ID to avoid duplicates on re-import
- User choice: "Replace all" or "Merge with existing"

### No external dependencies needed:
- File reading uses the browser's native `FileReader` API
- JSON parsing and validation use existing `zod` dependency
- No server-side processing required

