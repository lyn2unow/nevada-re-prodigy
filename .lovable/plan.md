

# Fix Saved Lectures: Scrollable Content + Copy Button

## Changes — `src/pages/LectureGenerator.tsx`

### 1. Fix ScrollArea for expanded content (line 497)
Replace `ScrollArea` with a plain `div` using fixed height and overflow-y-auto. The shadcn `ScrollArea` with `max-h` doesn't reliably create a scrollable container. Change to:
```tsx
<div className="h-[500px] w-full overflow-y-auto rounded-md border border-border bg-muted/30 p-4">
```
Inner `div` keeps `whitespace-pre-wrap` (already present).

### 2. Add Copy button next to Delete button (lines 476–492)
When `expandedLecture === lecture.id`, show a Copy button before the expand toggle:
```tsx
{expandedLecture === lecture.id && (
  <Button variant="ghost" size="icon"
    onClick={async () => {
      await navigator.clipboard.writeText(lecture.content);
      toast({ title: "Copied to clipboard!" });
    }}>
    <Copy className="h-4 w-4" />
  </Button>
)}
```
`Copy` icon is already imported.

| Line Range | What Changes |
|------------|-------------|
| 476–483 | Insert Copy button conditionally before expand toggle |
| 497 | Replace `ScrollArea` with scrollable `div` |

