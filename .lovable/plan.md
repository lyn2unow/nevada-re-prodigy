

# Fix Week Filter + Add Question Preview Modal

## Changes — `src/pages/PracticeExamBuilder.tsx`

### 1. Replace TOPIC_WEEK_MAP with weekNumber field

Remove the entire `TOPIC_WEEK_MAP` constant (lines 29–84). Update all three references to use `q.weekNumber` instead:

- **Line 109** (topicOptions): `TOPIC_WEEK_MAP[q.topic] === Number(weekFilter)` → `q.weekNumber === Number(weekFilter)`
- **Line 128** (filtered): same replacement
- Keep `WEEK_OPTIONS` as-is (still needed for the dropdown labels)

### 2. Add Question Preview Modal

**New state**: `previewQuestion` — holds the `ExamQuestion | null` currently being previewed.

**New import**: `Eye` from lucide-react, `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle` from `@/components/ui/dialog`.

**Eye button on each question card** (line 463 area): Add an `Eye` icon button next to the checkbox. On click, `e.stopPropagation()` (prevent toggle) and set `previewQuestion` to that question.

**Modal content** (rendered once at bottom of component):
- Top row: badges for topic, difficulty, source, week, and red "Exam Trap" if applicable
- Full question text in large readable font
- 4 answer option cards: correct answer has green background + checkmark icon, wrong answers neutral
- Below correct answer: explanation text
- Below each wrong answer: wrong explanation (from `wrongExplanations` array) if available
- Dialog close button (built-in X from Dialog component)

| Area | Lines | Change |
|------|-------|--------|
| Remove TOPIC_WEEK_MAP | 29–84 | Delete entirely |
| topicOptions memo | 109 | Use `q.weekNumber` |
| filtered memo | 128 | Use `q.weekNumber` |
| Imports | 3 | Add `Eye`, Dialog components |
| State | ~90 | Add `previewQuestion` |
| Question cards | 448–478 | Add Eye button with stopPropagation |
| New Dialog | after line 503 | Full question preview modal |

