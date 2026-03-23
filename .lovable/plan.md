

# Export Lectures as Slides PDF

## Summary
Create a utility that parses lecture markdown into branded HTML slides and triggers print-to-PDF, then add an "Export as Slides PDF" button to each saved lecture card.

## New File: `src/lib/lecture-slides-export.ts`

### `exportLectureAsSlides(lecture)` — main entry
Opens a new browser tab with a complete HTML document styled as presentation slides, then triggers `window.print()` after 800ms.

### `parseLectureToSlides(lecture)` — content parser
- Split content by `##` headings
- Each section becomes a slide with `{ title, subtitle, content, type }`
- Type detection from heading text:
  - "Learning Objectives" / "Objectives" → `objectives`
  - "Key Terms" → `terms`
  - "Exam Alert" / "Exam Alerts" / "Key Numbers" → `alerts`
  - "Discussion" → `discussion`
  - Default → `content`

### `buildSlidesHtml(lecture, slides)` — HTML generator
- Print stylesheet: landscape A4, page-break per slide, 1122×794px slide dimensions
- **Title slide**: full teal (#1B6B6B) background, white text, title, subtitle with duration, week label
- **Content slides**: teal header bar, 4px left accent bar, markdown→HTML conversion (bold, bullets, subheadings), gray footer with "RE 103 · TMCC · [title]" + page number
- **Alerts slides**: 3-column card grid with rotating accent colors
- **Objectives slides**: 2×2 card grid
- **Terms slides**: term cards with teal bold name + definition
- Accent color rotation: teal, crimson, gold, navy, purple
- Exam trap highlights: #C0392B red bold
- Real-world example boxes: #FFFDE7 bg, #B8860B border
- Footer: "RE 103 · TMCC · [topic] | [NRS refs]"

## Edit: `src/pages/LectureGenerator.tsx`

- Add import: `FileText` from lucide-react, `exportLectureAsSlides` from utility
- Add "Export as Slides PDF" button in each saved lecture card's action buttons row (next to Copy, expand, delete)

| File | Change |
|------|--------|
| `src/lib/lecture-slides-export.ts` | New file — slide export utility |
| `src/pages/LectureGenerator.tsx` | Add import + Export button in saved lectures panel |

