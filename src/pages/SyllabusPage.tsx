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
import { Textarea } from "@/components/ui/textarea";
import { FileText, Edit, Save, X, ChevronDown, Sparkles, GraduationCap, Calendar, BookOpen, Scale, Plus, Trash2, Copy, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { copyToClipboard, formatSyllabusAsText, generateSyllabusPdf } from "@/lib/export-utils";
import type { SyllabusTemplate, SyllabusWeekEntry, GradingCategory, GradeScaleEntry, PolicySection } from "@/types/course";

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
    setDraft(JSON.parse(JSON.stringify(syllabus)));
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

  const updateField = (field: keyof SyllabusTemplate, value: any) => {
    if (draft) setDraft({ ...draft, [field]: value });
  };

  // Array helpers
  const updateArrayItem = <T,>(field: keyof SyllabusTemplate, index: number, value: T) => {
    if (!draft) return;
    const arr = [...(draft[field] as T[])];
    arr[index] = value;
    setDraft({ ...draft, [field]: arr });
  };

  const addArrayItem = <T,>(field: keyof SyllabusTemplate, item: T) => {
    if (!draft) return;
    setDraft({ ...draft, [field]: [...(draft[field] as T[]), item] });
  };

  const removeArrayItem = (field: keyof SyllabusTemplate, index: number) => {
    if (!draft) return;
    const arr = [...(draft[field] as any[])];
    arr.splice(index, 1);
    setDraft({ ...draft, [field]: arr });
  };

  const insertArrayItemAfter = <T,>(field: keyof SyllabusTemplate, index: number, item: T) => {
    if (!draft) return;
    const arr = [...(draft[field] as T[])];
    arr.splice(index + 1, 0, item);
    setDraft({ ...draft, [field]: arr });
  };

  const handleCopy = async () => {
    const text = formatSyllabusAsText(d);
    const ok = await copyToClipboard(text);
    toast({ title: ok ? "Copied to clipboard!" : "Copy failed", description: ok ? "Syllabus text copied." : "Please try again." });
  };

  const handleDownloadPdf = () => {
    generateSyllabusPdf(d);
  };

  const autoTotal = editing
    ? draft!.gradingCategories.reduce((sum, c) => sum + (Number(c.points) || 0), 0)
    : d.totalPoints;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Syllabus</h1>
          <p className="text-muted-foreground mt-1">{d.courseCode} — {d.semester}</p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" size="sm" onClick={cancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
              <Button size="sm" onClick={saveEdit}><Save className="h-4 w-4 mr-1" /> Save</Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-4 w-4 mr-1" /> Copy</Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPdf}><Download className="h-4 w-4 mr-1" /> PDF</Button>
              <Button variant="outline" size="sm" onClick={startEdit}><Edit className="h-4 w-4 mr-1" /> Edit</Button>
            </>
          )}
        </div>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Course Objectives</CardTitle>
            </div>
            {editing && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem("courseObjectives", "")}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-2">
              {d.courseObjectives.map((obj, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-sm text-muted-foreground mt-2.5 w-6 shrink-0">{i + 1}.</span>
                  <Input value={obj} onChange={(e) => updateArrayItem("courseObjectives", i, e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => removeArrayItem("courseObjectives", i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {d.courseObjectives.map((obj, i) => (
                <li key={i} className="text-muted-foreground">{obj}</li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Weekly Schedule</CardTitle>
              </div>
              <CardDescription>Tentative — instructor reserves the right to change</CardDescription>
            </div>
            {editing && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem<SyllabusWeekEntry>("weeklySchedule", { week: d.weeklySchedule.length > 0 ? d.weeklySchedule[d.weeklySchedule.length - 1].week : 1, day: "", unitTopic: "", examAlignment: "", assignmentQuiz: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add Row
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Week</TableHead>
                <TableHead className="w-28">Day</TableHead>
                <TableHead>Unit / Topic</TableHead>
                <TableHead>Assignment / Quiz</TableHead>
                {editing && <TableHead className="w-20" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {d.weeklySchedule.map((entry, i) => (
                <TableRow key={i}>
                  {editing ? (
                    <>
                      <TableCell><Input type="number" className="w-14 h-8 text-sm" value={entry.week} onChange={(e) => updateArrayItem<SyllabusWeekEntry>("weeklySchedule", i, { ...entry, week: Number(e.target.value) })} /></TableCell>
                      <TableCell><Input className="w-24 h-8 text-sm" value={entry.day} onChange={(e) => updateArrayItem<SyllabusWeekEntry>("weeklySchedule", i, { ...entry, day: e.target.value })} /></TableCell>
                      <TableCell><Input className="h-8 text-sm" value={entry.unitTopic} onChange={(e) => updateArrayItem<SyllabusWeekEntry>("weeklySchedule", i, { ...entry, unitTopic: e.target.value })} /></TableCell>
                      <TableCell><Input className="h-8 text-sm" value={entry.assignmentQuiz} onChange={(e) => updateArrayItem<SyllabusWeekEntry>("weeklySchedule", i, { ...entry, assignmentQuiz: e.target.value })} /></TableCell>
                      <TableCell className="flex gap-0.5">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="Insert row below" onClick={() => insertArrayItemAfter<SyllabusWeekEntry>("weeklySchedule", i, { week: entry.week, day: "", unitTopic: "", examAlignment: "", assignmentQuiz: "" })}><Plus className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeArrayItem("weeklySchedule", i)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell><Badge variant="secondary">{entry.week}</Badge></TableCell>
                      <TableCell className="text-sm">{entry.day}</TableCell>
                      <TableCell className="text-sm font-medium">{entry.unitTopic}</TableCell>
                      <TableCell className="text-sm">{entry.assignmentQuiz || "—"}</TableCell>
                    </>
                  )}
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
          <CardDescription>Total: {autoTotal} points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Categories</h4>
                {editing && (
                  <Button variant="outline" size="sm" onClick={() => addArrayItem<GradingCategory>("gradingCategories", { category: "", points: 0 })}>
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                )}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                    {editing && <TableHead className="w-10" />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.gradingCategories.map((cat, i) => (
                    <TableRow key={i}>
                      {editing ? (
                        <>
                          <TableCell><Input className="h-8 text-sm" value={cat.category} onChange={(e) => updateArrayItem<GradingCategory>("gradingCategories", i, { ...cat, category: e.target.value })} /></TableCell>
                          <TableCell><Input type="number" className="h-8 text-sm w-20 text-right" value={cat.points} onChange={(e) => updateArrayItem<GradingCategory>("gradingCategories", i, { ...cat, points: Number(e.target.value) })} /></TableCell>
                          <TableCell><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeArrayItem("gradingCategories", i)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="text-sm">{cat.category}</TableCell>
                          <TableCell className="text-sm text-right">{cat.points} pts</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="text-sm font-semibold">Total</TableCell>
                    <TableCell className="text-sm text-right font-semibold">{autoTotal} pts</TableCell>
                    {editing && <TableCell />}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Grade Scale</h4>
                {editing && (
                  <Button variant="outline" size="sm" onClick={() => addArrayItem<GradeScaleEntry>("gradeScale", { letter: "", range: "" })}>
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {d.gradeScale.map((g, i) => (
                  editing ? (
                    <div key={i} className="flex items-center gap-1 px-1 py-0.5">
                      <Input className="h-7 text-sm w-12" value={g.letter} onChange={(e) => updateArrayItem<GradeScaleEntry>("gradeScale", i, { ...g, letter: e.target.value })} />
                      <Input className="h-7 text-sm flex-1" value={g.range} onChange={(e) => updateArrayItem<GradeScaleEntry>("gradeScale", i, { ...g, range: e.target.value })} />
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => removeArrayItem("gradeScale", i)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-between px-2 py-1 rounded bg-muted/50">
                      <span className="font-medium">{g.letter}</span>
                      <span className="text-muted-foreground">{g.range}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructor Policies */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Instructor Expectations & Policies</CardTitle>
            {editing && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem("instructorPolicies", "")}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-2">
              {d.instructorPolicies.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={p} onChange={(e) => updateArrayItem("instructorPolicies", i, e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => removeArrayItem("instructorPolicies", i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {d.instructorPolicies.map((p, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Institutional Policies */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Institutional Policies</CardTitle>
            {editing && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem<PolicySection>("institutionalPolicies", { title: "", content: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {editing ? (
            <div className="space-y-4">
              {d.institutionalPolicies.map((policy, i) => (
                <div key={i} className="border rounded-md p-3 space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Policy title" value={policy.title} onChange={(e) => updateArrayItem<PolicySection>("institutionalPolicies", i, { ...policy, title: e.target.value })} className="flex-1" />
                    <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => removeArrayItem("institutionalPolicies", i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea value={policy.content} onChange={(e) => updateArrayItem<PolicySection>("institutionalPolicies", i, { ...policy, content: e.target.value })} rows={3} />
                </div>
              ))}
            </div>
          ) : (
            d.institutionalPolicies.map((policy, i) => (
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
            ))
          )}
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
