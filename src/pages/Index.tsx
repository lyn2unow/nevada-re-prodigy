import { BookOpen, ClipboardCheck, Gamepad2, Library, Download, Plus, Sparkles, FileText, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/contexts/CourseContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const quickActions = [
  { label: "New Module", icon: Plus, path: "/modules", color: "bg-primary" },
  { label: "Exam Question", icon: ClipboardCheck, path: "/exam-prep", color: "bg-accent" },
  { label: "Activity", icon: Gamepad2, path: "/activities", color: "bg-primary" },
  { label: "Export", icon: Download, path: "/export", color: "bg-accent" },
];

export default function Index() {
  const { data, loadSeedContent, loadPearsonVueContent, loadCEShopContent, loadLectureNotesContent, loadTextbookContent, loadDefaultSyllabus, loadNRS645 } = useCourse();
  const navigate = useNavigate();

  const totalModules = data.modules.length;
  const totalQuestions = data.examQuestions.length;
  const totalActivities = data.activities.length;
  const isEmpty = totalModules === 0 && totalQuestions === 0 && totalActivities === 0;
  const hasPearsonVue = data.modules.some((m) => m.sourceTag === "Pearson VUE");
  const hasCEShop = data.modules.some((m) => m.sourceTag === "CE Shop");
  const hasLectureNotes = data.modules.some((m) => m.sourceTag === "Lecture Notes");
  const hasTextbook = data.modules.some((m) => m.sourceTag === "Textbook");
  const hasNRS = !!data.statuteSections && data.statuteSections.length > 0;

  const handleLoadSyllabus = () => {
    loadDefaultSyllabus();
    toast({ title: "Syllabus loaded!", description: "Fall 2025 template with weekly schedule, grading, and policies." });
  };

  const handleLoadCEShop = () => {
    loadCEShopContent();
    toast({ title: "CE Shop content loaded!", description: "8 modules, 40 exam questions, and 3 activities added from CE Shop study sheets." });
  };

  const handleLoadLectureNotes = () => {
    loadLectureNotesContent();
    toast({ title: "Lecture Notes loaded!", description: "21 modules, 20 exam questions, and 4 activities added from Units 1–2 lecture notes." });
  };

  const handleLoadTextbook = () => {
    loadTextbookContent();
    toast({ title: "Textbook content loaded!", description: "7 modules, 15 exam questions, and 3 activities added from Unit 1: Real Estate Brokerage and Agency." });
  };

  const handleLoadNRS645 = () => {
    loadNRS645();
    toast({ title: "NRS 645 Reference loaded!", description: `${28} statute sections loaded for cross-referencing.` });
  };

  const hasSyllabus = !!data.syllabusTemplate;

  const handleLoadSeed = () => {
    loadSeedContent();
    toast({ title: "Starter content loaded!", description: "7 modules, 25 exam questions, and 6 activities added." });
  };

  const handleLoadPearsonVue = () => {
    loadPearsonVueContent();
    toast({ title: "Pearson VUE content loaded!", description: "3 modules, 15 exam questions, and 1 activity added from the Candidate Handbook." });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Course Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real Estate 103 — Instructor Course Builder
        </p>
      </div>

      {/* Seed Content CTA */}
      {isEmpty && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Get started with pre-built content</p>
                <p className="text-sm text-muted-foreground">
                  Load 7 modules, 25+ exam questions, and 6 activities covering all 7 weeks of RE 103
                </p>
              </div>
            </div>
            <Button onClick={handleLoadSeed} className="gap-2 shrink-0">
              <Sparkles className="h-4 w-4" />
              Load Starter Content
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pearson VUE Content CTA */}
      {!isEmpty && !hasPearsonVue && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium">Pearson VUE Candidate Handbook</p>
                <p className="text-sm text-muted-foreground">
                  Add 3 modules, 15 exam questions, and 1 activity from the official exam handbook
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLoadPearsonVue} className="gap-2 shrink-0">
              <FileText className="h-4 w-4" />
              Load Pearson VUE Content
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CE Shop Content CTA */}
      {!isEmpty && !hasCEShop && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium">CE Shop Nevada Exam Prep</p>
                <p className="text-sm text-muted-foreground">
                  Add 8 modules, 40 exam questions, and 3 activities from CE Shop study sheets
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLoadCEShop} className="gap-2 shrink-0">
              <FileText className="h-4 w-4" />
              Load CE Shop Content
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lecture Notes CTA */}
      {!isEmpty && !hasLectureNotes && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium">Instructor Lecture Notes — Units 1 & 2</p>
                <p className="text-sm text-muted-foreground">
                  Add 21 modules, 20 exam questions, and 4 activities from your lecture scripts
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLoadLectureNotes} className="gap-2 shrink-0">
              <FileText className="h-4 w-4" />
              Load Lecture Notes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Syllabus CTA */}
      {!hasSyllabus && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Load Syllabus Template</p>
                <p className="text-sm text-muted-foreground">
                  Initialize the Fall 2025 syllabus with weekly schedule, grading breakdown, and policies
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLoadSyllabus} className="gap-2 shrink-0">
              <FileText className="h-4 w-4" />
              Load Syllabus
            </Button>
          </CardContent>
        </Card>
      )}

      {/* NRS 645 Reference CTA */}
      {!isEmpty && !hasNRS && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">NRS 645 Statute Reference</p>
                <p className="text-sm text-muted-foreground">
                  Load 28 referenced statute sections with automatic cross-referencing against your content
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLoadNRS645} className="gap-2 shrink-0">
              <Scale className="h-4 w-4" />
              Load NRS 645 Reference
            </Button>
          </CardContent>
        </Card>
      )}

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
