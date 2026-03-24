

# Replace Week Select with Session Select in LectureGenerator

## Summary
Replace the `WEEK_TOPICS`, `WEEK_LABELS` constants and week-based select with a `SESSION_OPTIONS` constant mapping to individual class sessions from the Spring 2026 syllabus. Update state, handler, select UI, and save logic.

## Changes — `src/pages/LectureGenerator.tsx`

### 1. Remove constants (lines 37–55)
Delete `WEEK_TOPICS` and `WEEK_LABELS`.

### 2. Add `SESSION_OPTIONS` constant (after `DURATIONS`, line 35)
13 session objects with `id`, `label`, `week`, `date`, `sessionTitle`, and `topics` arrays — exactly as provided by the user.

### 3. Replace state (line 75)
`selectedWeek` → `selectedSession`, initialized to `"none"`.

### 4. Replace handler (lines 85–90)
`loadWeekTopics` → `loadSessionTopics(sessionId)`: finds session by id, sets topics, and auto-suggests the session title in `lectureTitle`.

### 5. Update Select UI (lines 269–289)
- Label: "Load Session Topics"
- Placeholder: "Select a session..."
- Options: `SESSION_OPTIONS.map(s => <SelectItem>)` with `s.label` as display text
- Bind to `selectedSession` / `loadSessionTopics`

### 6. Update handleSave (line 130)
Change `week_label` from `WEEK_LABELS[Number(selectedWeek)]` to the selected session's `date + " — " + sessionTitle` when a session is selected.

| Area | Lines | Change |
|------|-------|--------|
| Constants | 37–55 | Remove WEEK_TOPICS & WEEK_LABELS, add SESSION_OPTIONS after line 35 |
| State | 75 | `selectedWeek` → `selectedSession` |
| Handler | 85–90 | `loadWeekTopics` → `loadSessionTopics` |
| Select UI | 269–289 | Session select with SESSION_OPTIONS |
| handleSave | 130 | Use session date + title for week_label |

