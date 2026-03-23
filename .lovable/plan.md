

# Add Save, Load & Delete for Lectures in LectureGenerator

## Summary
Wire up the `saved_lectures` table to the Lecture Generator page: save generated lectures, list saved ones with expand/collapse, and delete.

## Changes — `src/pages/LectureGenerator.tsx`

### 1. Imports
- Add `useEffect` to the React import
- Add `Save, Trash2, ChevronDown, ChevronUp` to lucide-react
- Add `import { supabase } from "@/integrations/supabase/client"`
- Add `import { useAuth } from "@/hooks/useAuth"` (corrected path — not `@/contexts/AuthContext`)

### 2. New state
```ts
const { user } = useAuth();
const [lectureTitle, setLectureTitle] = useState("");
const [isSaving, setIsSaving] = useState(false);
const [savedLectures, setSavedLectures] = useState<Array<{...}>>([]);
const [expandedLecture, setExpandedLecture] = useState<string | null>(null);
const [loadingSaved, setLoadingSaved] = useState(false);
```

### 3. useEffect — load saved lectures
Fetch from `saved_lectures` ordered by `created_at desc` when `user` is available.

### 4. handleSave
Insert into `saved_lectures` with `user_id`, `title`, `content`, `topics`, `week_label`, `duration_minutes`. Prepend to local state on success.

### 5. handleDeleteLecture
Delete by `id`, remove from local state, show toast.

### 6. UI — Save section in output card
Above the content ScrollArea, when `output` exists and not generating, show:
- Title input + Save button (inline row)
- Placed in the CardHeader area next to the Copy button

### 7. UI — Saved Lectures section
Below the main grid, conditionally rendered when user is logged in and has saved lectures:
- Heading with count badge
- Cards with title, week label + topic badges, date, expand toggle, delete button
- Expanded view: ScrollArea with full content (max-h 400px)

| File | Change |
|------|--------|
| `src/pages/LectureGenerator.tsx` | All changes above — imports, state, handlers, UI sections |

