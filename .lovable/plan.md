

# Plan: Full Syllabus Editing + Export

## What Changes

### 1. Make All Syllabus Cards Editable

Currently only the Course Information card switches to edit mode. Every card needs an editing state:

- **Course Objectives**: Editable list — each objective becomes a text input, with add/remove buttons
- **Weekly Schedule**: Each row's fields (day, unitTopic, examAlignment, assignmentQuiz) become inline inputs; add/remove row buttons
- **Grading Breakdown**: Category name + points become editable inputs; grade scale letter + range become editable; total auto-calculates
- **Instructor Policies**: Each policy becomes a text input with add/remove
- **Institutional Policies**: Each policy title + content becomes editable inputs with add/remove

All use the existing `draft` state pattern — the `updateField` helper will be extended with array-specific helpers (`updateArrayItem`, `addArrayItem`, `removeArrayItem`, etc.).

### 2. Syllabus Export (Copy + Download)

Add export buttons to the syllabus page header (visible in non-edit mode):

- **Copy to Clipboard**: Formats the entire syllabus as structured plain text and copies it using the existing `copyToClipboard` utility
- **Download as PDF**: Uses the existing `generatePdf` utility (HTML→print) to render a formatted syllabus document

A new `formatSyllabusAsText(syllabus: SyllabusTemplate): string` function will be added to `export-utils.ts` that renders all sections (course info, objectives, weekly schedule as a table, grading, policies) as clean text.

### Files to Modify

| File | Change |
|---|---|
| `src/pages/SyllabusPage.tsx` | Add editing UI for all cards; add Copy/Download buttons in header |
| `src/lib/export-utils.ts` | Add `formatSyllabusAsText()` and `generateSyllabusPdf()` functions |

### Technical Details

- Array editing helpers will be local to SyllabusPage (no new components needed)
- Weekly schedule edit rows use compact inputs within the existing table layout
- Copy button uses `copyToClipboard` from export-utils + toast confirmation
- PDF button uses `generatePdf` with a syllabus-specific HTML formatter
- Add/remove buttons use small icon buttons (Plus, Trash2) to keep the UI clean

