

# Add "Load Week's Topics" Feature to Lecture Generator

## Changes — `src/pages/LectureGenerator.tsx`

### 1. Add imports
Add `BookOpen` to the lucide-react import (line 11).

### 2. Add constants (after line 31, after `DURATIONS`)
Add `WEEK_TOPICS` (mapping week numbers 1–7 to arrays of topic strings from the existing `TOPICS` list) and `WEEK_LABELS` (mapping week numbers to display titles).

### 3. Add state (after line 39)
Add `selectedWeek` state initialized to `"none"`.

### 4. Add handler
Add `loadWeekTopics(week)` function that sets `selectedWeek`, and if not `"none"`, sets `selectedTopics` to the matching `WEEK_TOPICS` array.

### 5. Update UI — Configuration CardContent
Insert a new block **above** the existing Topics label/ScrollArea:
- A `Label` with `BookOpen` icon: "Load Week's Topics"
- A `Select` dropdown with placeholder "Select a week..." and 7 week options from `WEEK_LABELS`
- Helper text: "Pre-selects topics for that class session — adjust as needed."
- A `Separator` (thin divider) below

### 6. Add Separator import
Import `Separator` from `@/components/ui/separator`.

| File | Change |
|------|--------|
| `src/pages/LectureGenerator.tsx` | Add imports, constants, state, handler, and week-select UI block |

