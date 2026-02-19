import { BookOpen, ClipboardCheck, Gamepad2, Library, Download, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/contexts/CourseContext";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { label: "New Module", icon: Plus, path: "/modules", color: "bg-primary" },
  { label: "Exam Question", icon: ClipboardCheck, path: "/exam-prep", color: "bg-accent" },
  { label: "Activity", icon: Gamepad2, path: "/activities", color: "bg-primary" },
  { label: "Export", icon: Download, path: "/export", color: "bg-accent" },
];

export default function Index() {
  const { data } = useCourse();
  const navigate = useNavigate();

  const totalModules = data.modules.length;
  const totalQuestions = data.examQuestions.length;
  const totalActivities = data.activities.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Course Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real Estate 103 — Instructor Course Builder
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:border-accent"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Modules Created</CardDescription>
            <CardTitle className="text-3xl">{totalModules}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Across {data.weeks.filter((w) => w.moduleIds.length > 0).length} weeks
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Exam Questions</CardDescription>
            <CardTitle className="text-3xl">{totalQuestions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ClipboardCheck className="h-4 w-4" />
              {data.practiceExams.length} practice exams
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Activities</CardDescription>
            <CardTitle className="text-3xl">{totalActivities}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gamepad2 className="h-4 w-4" />
              Ready for Canvas
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">7-Week Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {data.weeks.map((week) => {
            const weekModules = data.modules.filter((m) => m.weekNumber === week.number);
            return (
              <Card
                key={week.number}
                className="cursor-pointer hover:border-accent transition-colors"
                onClick={() => navigate("/modules")}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{week.title}</CardTitle>
                    <Badge variant={weekModules.length > 0 ? "default" : "secondary"}>
                      {weekModules.length} modules
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {weekModules.length > 0 ? (
                    <ul className="space-y-1">
                      {weekModules.slice(0, 3).map((m) => (
                        <li key={m.id} className="text-sm text-muted-foreground truncate">
                          • {m.title}
                        </li>
                      ))}
                      {weekModules.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{weekModules.length - 3} more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No modules yet</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
