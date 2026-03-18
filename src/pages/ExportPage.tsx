import { useState } from "react";
import { Copy, FileDown, Check, FileText, HardDriveDownload, MessageSquare, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";
import {
  formatModuleAsText,
  formatExamQuestionsAsText,
  formatActivityAsText,
  copyToClipboard,
  copyHtmlToClipboard,
  generatePdf,
  generateQtiZip,
  formatDiscussionsAsHtml,
  formatAssignmentsAsHtml,
} from "@/lib/export-utils";

export default function ExportPage() {
  const { data } = useCourse();
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleQuestion = (id: string) => {
    setSelectedQuestions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleActivity = (id: string) => {
    setSelectedActivities((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAllModules = () => {
    if (selectedModules.size === data.modules.length) {
      setSelectedModules(new Set());
    } else {
      setSelectedModules(new Set(data.modules.map((m) => m.id)));
    }
  };

  const selectAllQuestions = () => {
    if (selectedQuestions.size === data.examQuestions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(data.examQuestions.map((q) => q.id)));
    }
  };

  const selectAllActivities = () => {
    if (selectedActivities.size === data.activities.length) {
      setSelectedActivities(new Set());
    } else {
      setSelectedActivities(new Set(data.activities.map((a) => a.id)));
    }
  };

  const getSelectedContent = (): string => {
    const parts: string[] = [];

    if (selectedModules.size > 0) {
      const modules = data.modules.filter((m) => selectedModules.has(m.id));
      modules.forEach((m) => parts.push(formatModuleAsText(m)));
    }

    if (selectedQuestions.size > 0) {
      const questions = data.examQuestions.filter((q) => selectedQuestions.has(q.id));
      parts.push(formatExamQuestionsAsText(questions));
    }

    if (selectedActivities.size > 0) {
      const activities = data.activities.filter((a) => selectedActivities.has(a.id));
      activities.forEach((a) => parts.push(formatActivityAsText(a)));
    }

    return parts.join("\n\n---\n\n");
  };

  const totalSelected = selectedModules.size + selectedQuestions.size + selectedActivities.size;

  const handleCopy = async () => {
    if (totalSelected === 0) {
      toast({ title: "Select content to copy", variant: "destructive" });
      return;
    }
    const text = getSelectedContent();
    const success = await copyToClipboard(text);
    if (success) {
      toast({ title: "Copied to clipboard!" });
    } else {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handlePdf = () => {
    if (totalSelected === 0) {
      toast({ title: "Select content to export", variant: "destructive" });
      return;
    }
    const text = getSelectedContent();
    const title = [
      selectedModules.size > 0 && `${selectedModules.size} module(s)`,
      selectedQuestions.size > 0 && `${selectedQuestions.size} question(s)`,
      selectedActivities.size > 0 && `${selectedActivities.size} activit(ies)`,
    ].filter(Boolean).join(", ");
    generatePdf(`RE 103 Export — ${title}`, text);
    toast({ title: "PDF opened in new tab" });
  };

  const handleQti = async () => {
    if (selectedQuestions.size === 0) {
      toast({ title: "Select exam questions for QTI export", variant: "destructive" });
      return;
    }
    const questions = data.examQuestions.filter((q) => selectedQuestions.has(q.id));
    await generateQtiZip("RE103_Quiz", questions);
    toast({ title: `QTI ZIP downloaded with ${questions.length} question(s) — per-answer feedback included` });
  };

  const handleCanvasDiscussion = async () => {
    if (selectedModules.size === 0) {
      toast({ title: "Select modules to export as Canvas Discussions", variant: "destructive" });
      return;
    }
    const modules = data.modules.filter((m) => selectedModules.has(m.id));
    const html = formatDiscussionsAsHtml(modules);
    const ok = await copyHtmlToClipboard(html);
    toast({ title: ok ? `${modules.length} discussion(s) copied as rich HTML — paste into Canvas` : "Copy failed", variant: ok ? "default" : "destructive" });
  };

  const handleCanvasAssignment = async () => {
    if (selectedActivities.size === 0) {
      toast({ title: "Select activities to export as Canvas Assignments", variant: "destructive" });
      return;
    }
    const activities = data.activities.filter((a) => selectedActivities.has(a.id));
    const html = formatAssignmentsAsHtml(activities);
    const ok = await copyHtmlToClipboard(html);
    toast({ title: ok ? `${activities.length} assignment(s) copied as rich HTML — paste into Canvas` : "Copy failed", variant: ok ? "default" : "destructive" });
  };

  const handleJsonBackup = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `re103-course-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Backup downloaded!" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Export Content</h1>
        <p className="text-muted-foreground mt-1">
          Select content below, then copy or download as PDF
        </p>
      </div>

      {/* JSON Backup */}
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <HardDriveDownload className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-sm">Full Course Backup</p>
              <p className="text-xs text-muted-foreground">
                Download all course data as JSON — restore it anytime via Import
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleJsonBackup}>
            <HardDriveDownload className="h-4 w-4" />
            Download Backup (JSON)
          </Button>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {totalSelected} item{totalSelected !== 1 ? "s" : ""} selected
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" className="gap-2" onClick={handleCopy} disabled={totalSelected === 0}>
              <Copy className="h-4 w-4" />
              Copy Text
            </Button>
            <Button variant="outline" className="gap-2" onClick={handlePdf} disabled={totalSelected === 0}>
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleCanvasDiscussion} disabled={selectedModules.size === 0}>
              <MessageSquare className="h-4 w-4" />
              Canvas Discussion
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleCanvasAssignment} disabled={selectedActivities.size === 0}>
              <ClipboardList className="h-4 w-4" />
              Canvas Assignment
            </Button>
            <Button className="gap-2" onClick={handleQti} disabled={selectedQuestions.size === 0}>
              <FileText className="h-4 w-4" />
              QTI for Canvas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Selection */}
      <Tabs defaultValue="modules">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="modules">
            Modules ({data.modules.length})
          </TabsTrigger>
          <TabsTrigger value="questions">
            Questions ({data.examQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="activities">
            Activities ({data.activities.length})
          </TabsTrigger>
        </TabsList>

        {/* Modules Tab */}
        <TabsContent value="modules" className="mt-4 space-y-3">
          {data.modules.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No modules created yet</p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={selectAllModules}>
                  {selectedModules.size === data.modules.length ? "Deselect All" : "Select All"}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedModules.size} of {data.modules.length} selected
                </span>
              </div>
              {data.weeks.map((week) => {
                const weekModules = data.modules
                  .filter((m) => m.weekNumber === week.number)
                  .sort((a, b) => a.order - b.order);
                if (weekModules.length === 0) return null;
                return (
                  <div key={week.number}>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{week.title}</p>
                    {weekModules.map((m) => (
                      <label
                        key={m.id}
                        className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors mb-2"
                      >
                        <Checkbox
                          checked={selectedModules.has(m.id)}
                          onCheckedChange={() => toggleModule(m.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{m.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {m.keyTerms.length} terms · {m.knowledgeChecks.length} checks · {m.sourceTag}
                          </p>
                        </div>
                        {selectedModules.has(m.id) && <Check className="h-4 w-4 text-primary shrink-0" />}
                      </label>
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions" className="mt-4 space-y-3">
          {data.examQuestions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No exam questions created yet</p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={selectAllQuestions}>
                  {selectedQuestions.size === data.examQuestions.length ? "Deselect All" : "Select All"}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedQuestions.size} of {data.examQuestions.length} selected
                </span>
              </div>
              {data.examQuestions.map((q) => (
                <label
                  key={q.id}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors"
                >
                  <Checkbox
                    checked={selectedQuestions.has(q.id)}
                    onCheckedChange={() => toggleQuestion(q.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{q.question}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.topic} · {q.difficulty} · {q.source}
                      {q.examTrap && " · ⚠️ Trap"}
                    </p>
                  </div>
                  {selectedQuestions.has(q.id) && <Check className="h-4 w-4 text-primary shrink-0" />}
                </label>
              ))}
            </>
          )}
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="mt-4 space-y-3">
          {data.activities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No activities created yet</p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={selectAllActivities}>
                  {selectedActivities.size === data.activities.length ? "Deselect All" : "Select All"}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedActivities.size} of {data.activities.length} selected
                </span>
              </div>
              {data.activities.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors"
                >
                  <Checkbox
                    checked={selectedActivities.has(a.id)}
                    onCheckedChange={() => toggleActivity(a.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.type}{a.weekNumber ? ` · Week ${a.weekNumber}` : ""}
                      {a.topic ? ` · ${a.topic}` : ""}
                    </p>
                  </div>
                  {selectedActivities.has(a.id) && <Check className="h-4 w-4 text-primary shrink-0" />}
                </label>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Bottom action bar */}
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalSelected > 0
            ? `${totalSelected} item${totalSelected !== 1 ? "s" : ""} ready to export`
            : "Select items above to export"}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={handleCopy} disabled={totalSelected === 0}>
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" className="gap-2" onClick={handlePdf} disabled={totalSelected === 0}>
            <FileDown className="h-4 w-4" />
            PDF
          </Button>
          <Button className="gap-2" onClick={handleQti} disabled={selectedQuestions.size === 0}>
            <FileText className="h-4 w-4" />
            QTI
          </Button>
        </div>
      </div>
    </div>
  );
}
