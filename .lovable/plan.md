

# Fix Slide Export: Print Colors, Content Splitting & Visual Hierarchy

## Problem
1. Browser print strips background colors — teal title slide prints white
2. Long content sections get truncated instead of splitting across slides
3. Content slides lack visual hierarchy for numbered sections, exam traps, and examples

## Changes — `src/lib/lecture-slides-export.ts`

### 1. Print Color Preservation (CSS)
Add to both the global styles and the `@media print` block:
```css
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
```
This forces browsers to render all background colors and images when printing.

### 2. Long Content Splitting (parseLectureToSlides)
After the initial `##`-based split, add a second pass:
- For each slide, count words in `content`
- If > 600 words, split at the nearest paragraph break (`\n\n`) before the 600-word mark
- Create continuation slides with title `"Original Title (continued)"` preserving same type and subtitle
- Repeat until all chunks are ≤ 600 words

### 3. Enhanced Content Rendering (mdToHtml / content slides)
Enhance the `mdToHtml` function and content slide body:
- Lines matching `^\d+\.\s+` → styled section headers (teal bold, Georgia font)
- Lines starting with `>` → exam trap boxes (red left border, `#FFF5F5` bg, red bold text)
- Lines containing "Real-World" or "Nevada Example" → yellow highlight box (`#FFFDE7` bg, `#B8860B` border)
- Bullet points remain as `<li>` items
- Keep 4px left teal accent bar on content slides

### 4. Title Slide Print Fix
Already has inline `background:#1B6B6B` — the CSS fix in step 1 ensures it prints. No structural change needed.

| Area | Lines Affected | Change |
|------|---------------|--------|
| CSS block | 182–205 | Add print-color-adjust rules globally |
| parseLectureToSlides | 27–57 | Add word-count splitting pass after initial parse |
| mdToHtml | 65–102 | Add numbered header + blockquote exam trap rendering |
| Content slide body | 157–158 | Enhanced content parsing for visual hierarchy |

