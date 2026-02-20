import { useState } from "react";
import { useCourse } from "@/contexts/CourseContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FileText, Edit, Save, X, ChevronDown, Sparkles, GraduationCap, Calendar, BookOpen, Scale } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { SyllabusTemplate } from "@/types/course";

export default function SyllabusPage() {
  const { data, updateSyllabus, loadDefaultSyllabus } = useCourse();
  const syllabus = data.syllabusTemplate;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<SyllabusTemplate | null>(null);

  if (!syllabus) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Syllabus</h1>
          <p className="text-muted-foreground mt-1">Structured syllabus template for RE 103</p>
        </div>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Load Syllabus Template</p>
                <p className="text-sm text-muted-foreground">
                  Initialize the Fall 2025 syllabus with weekly schedule, grading, and policies
                </p>
              </div>
            </div>
            <Button onClick={() => { loadDefaultSyllabus(); toast({ title: "Syllabus loaded!", description: "Fall 2025 template initialized." }); }} className="gap-2 shrink-0">
              <Sparkles className="h-4 w-4" />
              Load Template
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const startEdit = () => {
    setDraft({ ...syllabus });
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(null);
    setEditing(false);
  };

  const saveEdit = () => {
    if (draft) {
      updateSyllabus(draft);
      toast({ title: "Syllabus updated!" });
    }
    setEditing(false);
    setDraft(null);
  };

  const d = editing ? draft! : syllabus;

  const updateField = (field: keyof SyllabusTemplate, value: string) => {
    if (draft) setDraft({ ...draft, [field]: value });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Syllabus</h1>
          <p className="text-muted-foreground mt-1">{d.courseCode} — {d.semester}</p>
        </div>
        {editing ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={cancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
            <Button size="sm" onClick={saveEdit}><Save className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={startEdit}><Edit className="h-4 w-4 mr-1" /> Edit</Button>
        )}
      </div>

      {/* Course Info Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Course Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editing ? (
              <>
                <div><Label>Course Code</Label><Input value={d.courseCode} onChange={(e) => updateField("courseCode", e.target.value)} /></div>
                <div><Label>Course Title</Label><Input value={d.courseTitle} onChange={(e) => updateField("courseTitle", e.target.value)} /></div>
                <div><Label>Semester</Label><Input value={d.semester} onChange={(e) => updateField("semester", e.target.value)} /></div>
                <div><Label>Instructor</Label><Input value={d.instructorName} onChange={(e) => updateField("instructorName", e.target.value)} /></div>
                <div><Label>Credentials</Label><Input value={d.instructorCredentials} onChange={(e) => updateField("instructorCredentials", e.target.value)} /></div>
                <div><Label>Meeting Days</Label><Input value={d.meetingDays} onChange={(e) => updateField("meetingDays", e.target.value)} /></div>
                <div><Label>Time</Label><Input value={d.meetingTime} onChange={(e) => updateField("meetingTime", e.target.value)} /></div>
                <div><Label>Location</Label><Input value={d.location} onChange={(e) => updateField("location", e.target.value)} /></div>
                <div><Label>Date Range</Label><Input value={d.dateRange} onChange={(e) => updateField("dateRange", e.target.value)} /></div>
                <div><Label>Textbook</Label><Input value={d.textbook} onChange={(e) => updateField("textbook", e.target.value)} /></div>
              </>
            ) : (
              <>
                <InfoRow label="Instructor" value={`${d.instructorName}, ${d.instructorCredentials}`} />
                <InfoRow label="Schedule" value={`${d.meetingDays}, ${d.meetingTime}`} />
                <InfoRow label="Location" value={d.location} />
                <InfoRow label="Dates" value={d.dateRange} />
                <InfoRow label="Textbook" value={d.textbook} />
                <InfoRow label="Platform" value={d.platform} />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Course Objectives</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {d.courseObjectives.map((obj, i) => (
              <li key={i} className="text-muted-foreground">{obj}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Weekly Schedule</CardTitle>
          </div>
          <CardDescription>Tentative — instructor reserves the right to change</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Week</TableHead>
                <TableHead className="w-28">Day</TableHead>
                <TableHead>Unit / Topic</TableHead>
                <TableHead>State Exam Alignment</TableHead>
                <TableHead>Assignment / Quiz</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {d.weeklySchedule.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell><Badge variant="secondary">{entry.week}</Badge></TableCell>
                  <TableCell className="text-sm">{entry.day}</TableCell>
                  <TableCell className="text-sm font-medium">{entry.unitTopic}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entry.examAlignment}</TableCell>
                  <TableCell className="text-sm">{entry.assignmentQuiz || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grading */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Grading Breakdown</CardTitle>
          </div>
          <CardDescription>Total: {d.totalPoints} points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Categories</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.gradingCategories.map((cat, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm">{cat.category}</TableCell>
                      <TableCell className="text-sm text-right">{cat.points} pts</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="text-sm font-semibold">Total</TableCell>
                    <TableCell className="text-sm text-right font-semibold">{d.totalPoints} pts</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Grade Scale</h4>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {d.gradeScale.map((g, i) => (
                  <div key={i} className="flex justify-between px-2 py-1 rounded bg-muted/50">
                    <span className="font-medium">{g.letter}</span>
                    <span className="text-muted-foreground">{g.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructor Policies */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Instructor Expectations & Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {d.instructorPolicies.map((p, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                {p}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Institutional Policies */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Institutional Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {d.institutionalPolicies.map((policy, i) => (
            <Collapsible key={i}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors">
                {policy.title}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground pb-3 pl-1">{policy.content}</p>
                <Separator />
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <p className="text-sm mt-0.5">{value}</p>
    </div>
  );
}
