

# Add QTI Export Button to Practice Exam Cards

## Changes — `src/pages/ExamPrep.tsx`

1. **Add imports**: `FileDown` from lucide-react, `generateQtiZip` from `@/lib/export-utils`
2. **Add handler** `handleQtiExport` that filters questions by practice exam's `questionIds`, calls `generateQtiZip`, and shows a toast
3. **Update practice exam card** (line 82–85): Replace the single "Take Exam" button with a flex row containing "Export QTI" (outline) and "Take Exam" (outline) buttons

### Technical Details

| Location | Change |
|----------|--------|
| Line 2 | Add `FileDown` to lucide imports |
| After line 8 | Import `generateQtiZip` from `@/lib/export-utils` |
| After line 16 | Add `handleQtiExport` async handler |
| Lines 82–85 | Replace single button with `<div className="flex gap-2">` containing both buttons |

