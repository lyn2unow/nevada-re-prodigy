

# Fix Slide Export: Intro Skip, Markdown Parsing, Card Layouts & Overflow

## Changes — `src/lib/lecture-slides-export.ts`

### 1. Skip Intro Block (parseLectureToSlides, lines 74–84)
In the `flush()` function, before pushing a slide, check if `currentContent.join("\n")` contains `# RE 103` or both `Instructor:` and `Duration:`. If so, skip it — this content is already on the title slide.

### 2. Fix Bold/Italic Rendering (mdToHtml, lines 106–110)
The bold regex is already present but numbered-list lines are intercepting bold text before it gets rendered. The real issue: in the objectives/terms/alerts card renderers (lines 186–214), raw content is sometimes passed through `mdToHtml` after partial stripping, or bold markers in term names aren't fully cleaned. Fix:
- In **terms** card renderer (line 208): the `replace(/\*\*/g, "")` on `termName` is correct, but also strip from `termDef`
- In **objectives** card renderer: ensure `mdToHtml` is called on the full cleaned item text
- In **alerts** card renderer: same — ensure `mdToHtml` processes the full item

### 3. Objectives → 2×2 Card Grid (lines 194–202)
Replace current objectives renderer with:
- Split content by lines matching `^\d+\.`
- Each card: white bg, `border: 1px solid #e0e0e0`, `border-top: 3px solid #1B6B6B`, `padding: 20px`, `border-radius: 4px`
- Extract first 5 words as teal bold title, full text below in normal weight
- Grid: `grid-template-columns: repeat(2, 1fr)`, gap 14px

### 4. Terms → 3-Column Card Grid (lines 203–214)
Replace current terms renderer with:
- Split by lines starting with `*` or `-`
- Each card: white bg, `border: 1px solid #e0e0e0`, `padding: 16px`, `border-radius: 4px`
- Term name in teal bold at top (strip `**` markers)
- Extract NRS/NAC references as gray pill badge (`background: #e0e0e0; border-radius: 12px; padding: 2px 8px; font-size: 11px`) floated top-right
- Definition text below
- Grid: `grid-template-columns: repeat(3, 1fr)`, gap 12px

### 5. Alerts → 3-Column Cards with Accent Bars (lines 185–193)
Current implementation is close but needs:
- Extract first sentence as bold title in the card's accent color
- Body text below in `#1B2A4A`
- Card border: `1px solid #e0e0e0`, accent bar is `border-top: 3px solid ${color}`

### 6. Content Slides — Section Headers & Special Boxes (lines 120–161)
In `mdToHtml`, add detection for:
- Roman numeral or letter section headers (`/^[IVX]+\.\s/` or `/^[A-Z]\.\s/`) → `<h3>` in teal, Georgia, 15px bold
- Already handles blockquotes and real-world boxes — verify these render with `print-color-adjust: exact`

### 7. Overflow Safety (line 225)
Add `max-height: 620px` to the content body div to prevent bleeding past footer.

| Area | Lines | Change |
|------|-------|--------|
| parseLectureToSlides flush() | 74–84 | Skip slides with intro block content |
| mdToHtml | 106–161 | Add Roman numeral headers, ensure bold/italic applied first |
| Objectives renderer | 194–202 | 2×2 card grid with teal top accent |
| Terms renderer | 203–214 | 3-column grid with NRS pill badges |
| Alerts renderer | 185–193 | First sentence as bold colored title |
| Content body div | 225 | Add max-height: 620px |

