import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";

const typeLabels: Record<string, string> = {
  "role-play": "Role-Play",
  "case-study": "Case Study",
  "contract-drill": "Contract Drill",
  "closing-simulation": "Closing Simulation",
  "ethical-debate": "Ethical Debate",
  other: "Other",
};

export default function ActivityDetail() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { data } = useCourse();

  const activity = data.activities.find((a) => a.id === activityId);

  if (!activity) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-muted-foreground">Activity not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/activities")}>
          Back to Activities
        </Button>
      </div>
    );
  }

  const handleCopy = async () => {
    const lines = [
      `ACTIVITY: ${activity.title}`,
      `Type: ${typeLabels[activity.type] || activity.type}`,
      activity.weekNumber ? `Week: ${activity.weekNumber}` : null,
      activity.topic ? `Topic: ${activity.topic}` : null,
      "",
      "DESCRIPTION:",
      activity.description,
      "",
      "INSTRUCTOR NOTES:",
      activity.instructorNotes || "(none)",
      "",
      "DEBRIEF PROMPTS:",
      ...(activity.debriefPrompts.length > 0
        ? activity.debriefPrompts.map((p, i) => `${i + 1}. ${p}`)
        : ["(none)"]),
      "",
      activity.tags.length > 0 ? `Tags: ${activity.tags.join(", ")}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    await navigator.clipboard.writeText(lines);
    toast({ title: "Copied to clipboard", description: "Paste into Word, Google Docs, or any document." });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="mt-1 shrink-0" onClick={() => navigate("/activities")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">{activity.title}</h1>
              <Badge variant="secondary">{typeLabels[activity.type] || activity.type}</Badge>
            </div>
            {activity.topic && <p className="text-muted-foreground mt-1">{activity.topic}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" className="gap-2" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            Copy Activity
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => navigate(`/activities/edit/${activity.id}`)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-2">
        {activity.weekNumber && <Badge variant="outline">Week {activity.weekNumber}</Badge>}
        {activity.tags.map((tag) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{activity.description}</p>
        </CardContent>
      </Card>

      {/* Instructor Notes */}
      {activity.instructorNotes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Instructor Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{activity.instructorNotes}</p>
          </CardContent>
        </Card>
      )}

      {/* Debrief Prompts */}
      {activity.debriefPrompts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Debrief Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {activity.debriefPrompts.map((prompt, i) => (
                <li key={i}>{prompt}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
