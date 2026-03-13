

# Activity Detail View with Copy-to-Clipboard

## What changes

1. **New page: `src/pages/ActivityDetail.tsx`** — Read-only view of a single activity showing all fields: title, type badge, description, topic, week, tags, instructor notes, and debrief prompts. Includes a "Copy to Clipboard" button that formats the activity as clean plain text (title, type, description, instructor notes, debrief prompts) so instructors can paste it into Word, Google Docs, email, etc.

2. **New route in `src/App.tsx`** — Add `/activities/view/:activityId` route pointing to the new detail page.

3. **Update `src/pages/ActivityGenerator.tsx`** — Make each activity card clickable (clicking the card body navigates to `/activities/view/:activityId`). The edit and delete icon buttons remain in-place with `stopPropagation`.

## Detail page layout

- Back arrow + title + type badge header
- "Copy Activity" button (top right, uses `navigator.clipboard.writeText`) and "Edit" button
- Full description (no truncation)
- Week and tags row
- Instructor Notes section (card)
- Debrief Prompts section (numbered list)
- Toast confirmation on copy

## Copy format (plain text)

```
ACTIVITY: [Title]
Type: [Role-Play]
Week: [3]
Topic: [Contracts]

DESCRIPTION:
[full description]

INSTRUCTOR NOTES:
[full notes]

DEBRIEF PROMPTS:
1. [prompt]
2. [prompt]

Tags: [tag1, tag2]
```

