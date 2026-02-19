import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";
import type { Activity, ActivityType } from "@/types/course";

function generateId() {
  return crypto.randomUUID();
}

const activityTypes: { value: ActivityType; label: string }[] = [
  { value: "role-play", label: "Role-Play" },
  { value: "case-study", label: "Case Study" },
  { value: "contract-drill", label: "Contract Drill" },
  { value: "closing-simulation", label: "Closing Simulation" },
  { value: "ethical-debate", label: "Ethical Debate" },
  { value: "other", label: "Other" },
];

const emptyActivity = (): Activity => ({
  id: generateId(),
  title: "",
  type: "role-play",
  description: "",
  instructorNotes: "",
  debriefPrompts: [""],
  topic: "",
  weekNumber: null,
  tags: [],
});

export default function ActivityForm() {
  const navigate = useNavigate();
  const { addActivity, data } = useCourse();

  const [activity, setActivity] = useState<Activity>(emptyActivity());
  const [tagInput, setTagInput] = useState("");

  const update = <K extends keyof Activity>(field: K, value: Activity[K]) => {
    setActivity((prev) => ({ ...prev, [field]: value }));
  };

  const updateDebriefPrompt = (index: number, value: string) => {
    const newPrompts = [...activity.debriefPrompts];
    newPrompts[index] = value;
    update("debriefPrompts", newPrompts);
  };

  const addDebriefPrompt = () => {
    update("debriefPrompts", [...activity.debriefPrompts, ""]);
  };

  const removeDebriefPrompt = (index: number) => {
    if (activity.debriefPrompts.length <= 1) return;
    update("debriefPrompts", activity.debriefPrompts.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !activity.tags.includes(tag)) {
      update("tags", [...activity.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    update("tags", activity.tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!activity.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (!activity.description.trim()) {
      toast({ title: "Description is required", variant: "destructive" });
      return;
    }
    // Filter out empty debrief prompts
    const cleaned: Activity = {
      ...activity,
      debriefPrompts: activity.debriefPrompts.filter((p) => p.trim()),
    };
    addActivity(cleaned);
    toast({ title: "Activity created" });
    navigate("/activities");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/activities")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">New Activity</h1>
          <p className="text-muted-foreground">Create an in-class or Canvas activity</p>
        </div>
        <Button onClick={handleSave}>Save Activity</Button>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              placeholder="e.g., Fair Housing Role-Play Scenario"
              value={activity.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Activity Type</Label>
              <Select value={activity.type} onValueChange={(v) => update("type", v as ActivityType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {activityTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Topic</Label>
              <Input
                placeholder="e.g., Agency Law, Contracts"
                value={activity.topic}
                onChange={(e) => update("topic", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              placeholder="Describe the activity, learning objectives, and how students should engage..."
              className="min-h-[100px]"
              value={activity.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Week & Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Week & Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assign to Week</Label>
              <Select
                value={activity.weekNumber?.toString() || "none"}
                onValueChange={(v) => update("weekNumber", v === "none" ? null : parseInt(v))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No week assigned</SelectItem>
                  {data.weeks.map((w) => (
                    <SelectItem key={w.number} value={w.number.toString()}>
                      {w.title} (Week {w.number})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                />
                <Button variant="outline" size="sm" onClick={addTag} className="shrink-0">Add</Button>
              </div>
              {activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructor Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Instructor Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Private notes for the instructor: setup instructions, timing guidance, materials needed, facilitation tips..."
            className="min-h-[120px]"
            value={activity.instructorNotes}
            onChange={(e) => update("instructorNotes", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Debrief Prompts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Debrief Prompts</CardTitle>
            <Button variant="outline" size="sm" onClick={addDebriefPrompt} className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Add Prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Questions to guide the post-activity discussion
          </p>
          {activity.debriefPrompts.map((prompt, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-sm text-muted-foreground mt-2.5 shrink-0 w-6 text-right">{i + 1}.</span>
              <Input
                placeholder={`Debrief question ${i + 1}...`}
                value={prompt}
                onChange={(e) => updateDebriefPrompt(i, e.target.value)}
                className="flex-1"
              />
              {activity.debriefPrompts.length > 1 && (
                <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10" onClick={() => removeDebriefPrompt(i)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/activities")}>Cancel</Button>
        <Button onClick={handleSave}>Save Activity</Button>
      </div>
    </div>
  );
}
