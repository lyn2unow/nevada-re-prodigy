import { Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/contexts/CourseContext";

const typeLabels: Record<string, string> = {
  "role-play": "Role-Play",
  "case-study": "Case Study",
  "contract-drill": "Contract Drill",
  "closing-simulation": "Closing Simulation",
  "ethical-debate": "Ethical Debate",
  other: "Other",
};

export default function ActivityGenerator() {
  const { data } = useCourse();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Generator</h1>
          <p className="text-muted-foreground mt-1">
            In-class and Canvas activities with instructor notes
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/activities/new")}>
          <Plus className="h-4 w-4" />
          New Activity
        </Button>
      </div>

      {data.activities.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">
              No activities yet. Create role-plays, case studies, and more.
            </p>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/activities/new")}>
              <Plus className="h-4 w-4" />
              Create First Activity
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.activities.map((activity) => (
            <Card key={activity.id} className="hover:border-accent transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <Badge variant="secondary">{typeLabels[activity.type] || activity.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activity.weekNumber && (
                    <Badge variant="outline" className="text-[10px]">
                      Week {activity.weekNumber}
                    </Badge>
                  )}
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
