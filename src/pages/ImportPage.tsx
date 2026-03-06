import { useState, useCallback, useRef } from "react";
import type { CourseData } from "@/types/course";
import { Upload, FileJson, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const KeyTermSchema = z.object({
  id: z.string(),
  term: z.string(),
  definition: z.string(),
  source: z.enum(["NRS/NAC", "Pearson VUE", "CE Shop", "Lecture Notes", "Textbook"]),
});

const KnowledgeCheckSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  explanation: z.string(),
});

const ExamAlertSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(["exam-alert", "high-probability", "exam-trap"]),
});

const ModuleSchema = z.object({
  id: z.string(),
  weekNumber: z.number(),
  title: z.string(),
  order: z.number(),
  keyTerms: z.array(KeyTermSchema),
  conceptExplanation: z.string(),
  nevadaLegalRefs: z.string(),
  realWorldScenario: z.string(),
  commonMistakes: z.string(),
  examKeyPoints: z.string(),
  examAlerts: z.array(ExamAlertSchema),
  knowledgeChecks: z.array(KnowledgeCheckSchema),
  discussionPrompt: z.string(),
  assignmentSuggestion: z.string(),
  estimatedTime: z.string(),
  sourceTag: z.enum(["NRS/NAC", "Pearson VUE", "CE Shop", "Lecture Notes", "Textbook"]),
  correctsTextbook: z.boolean(),
  federalVsNevada: z.enum(["federal", "nevada", "both"]),
});

const ExamQuestionSchema = z.object({
  id: z.string(),
  topic: z.string(),
  question: z.string(),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  correctIndex: z.number(),
  explanation: z.string(),
  wrongExplanations: z.tuple([z.string(), z.string(), z.string()]),
  difficulty: z.enum(["basic", "intermediate", "advanced"]),
  examTrap: z.boolean(),
  examTrapNote: z.string().optional(),
  tags: z.array(z.string()),
  source: z.enum(["NRS/NAC", "Pearson VUE", "CE Shop", "Lecture Notes", "Textbook"]),
});

const ActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["role-play", "case-study", "contract-drill", "closing-simulation", "ethical-debate", "other"]),
  description: z.string(),
  instructorNotes: z.string(),
  debriefPrompts: z.array(z.string()),
  topic: z.string(),
  weekNumber: z.number().nullable(),
  tags: z.array(z.string()),
});

const WeekSchema = z.object({
  number: z.number(),
  title: z.string(),
  moduleIds: z.array(z.string()),
});

const CourseDataSchema = z.object({
  weeks: z.array(WeekSchema),
  modules: z.array(ModuleSchema),
  examQuestions: z.array(ExamQuestionSchema),
  practiceExams: z.array(z.object({
    id: z.string(),
    title: z.string(),
    questionIds: z.array(z.string()),
    createdAt: z.string(),
  })),
  activities: z.array(ActivitySchema),
});

type ImportMode = "replace" | "merge";

export default function ImportPage() {
  const { importData } = useCourse();
  const [dragOver, setDragOver] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<"json" | "text" | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>("merge");
  const [validationResult, setValidationResult] = useState<{ valid: boolean; error?: string; summary?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    const isJson = file.name.endsWith(".json");
    setFileType(isJson ? "json" : "text");
    setValidationResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);

      if (isJson) {
        try {
          const parsed = JSON.parse(content);
          const result = CourseDataSchema.safeParse(parsed);
          if (result.success) {
            const d = result.data;
            setValidationResult({
              valid: true,
              summary: `${d.modules.length} modules, ${d.examQuestions.length} exam questions, ${d.activities.length} activities, ${d.practiceExams.length} practice exams`,
            });
          } else {
            console.error("Import validation errors:", result.error.issues);
            setValidationResult({
              valid: false,
              error: "Invalid file format. Please use a JSON file exported from this app.",
            });
          }
        } catch {
          setValidationResult({ valid: false, error: "Invalid JSON format" });
        }
      }
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleImportJson = () => {
    if (!fileContent || !validationResult?.valid) return;
    try {
      const parsed = JSON.parse(fileContent);
      CourseDataSchema.parse(parsed);
      const d = parsed as CourseData;
      importData(d, importMode);
      toast({
        title: "Import successful!",
        description: `${importMode === "replace" ? "Replaced" : "Merged"} ${d.modules.length} modules, ${d.examQuestions.length} questions, ${d.activities.length} activities`,
      });
      clearFile();
    } catch {
      toast({ title: "Import failed", variant: "destructive" });
    }
  };

  const clearFile = () => {
    setFileContent(null);
    setFileName("");
    setFileType(null);
    setValidationResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Import Content</h1>
        <p className="text-muted-foreground mt-1">
          Upload a JSON backup or text file to add content to your course
        </p>
      </div>

      {/* Drop Zone */}
      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">Drop a file here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports .json (course backup), .txt, .md (text content)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.txt,.md"
            className="hidden"
            onChange={handleFileSelect}
          />
        </CardContent>
      </Card>

      {/* File loaded */}
      {fileContent && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {fileType === "json" ? (
                    <FileJson className="h-5 w-5 text-primary" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <CardTitle className="text-base">{fileName}</CardTitle>
                    <CardDescription>
                      {fileType === "json" ? "JSON course backup" : "Text / Markdown file"}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={clearFile}>
                  Clear
                </Button>
              </div>
            </CardHeader>

            {fileType === "json" && validationResult && (
              <CardContent className="pt-0">
                <Separator className="mb-4" />
                {validationResult.valid ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Valid course data</p>
                        <p className="text-sm text-muted-foreground">{validationResult.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Import mode:</span>
                      <div className="flex gap-2">
                        <Badge
                          variant={importMode === "merge" ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => setImportMode("merge")}
                        >
                          Merge with existing
                        </Badge>
                        <Badge
                          variant={importMode === "replace" ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => setImportMode("replace")}
                        >
                          Replace all
                        </Badge>
                      </div>
                    </div>

                    <Button onClick={handleImportJson} className="w-full">
                      {importMode === "replace" ? "Replace All Content" : "Merge Into Course"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Validation failed</p>
                      <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{validationResult.error}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
            )}

            {fileType === "text" && (
              <CardContent className="pt-0">
                <Separator className="mb-4" />
                <p className="text-sm text-muted-foreground mb-3">
                  Text files can't be auto-parsed into structured modules. Use the content below as reference while creating modules manually.
                </p>
                <Textarea
                  value={fileContent}
                  readOnly
                  className="min-h-[300px] font-mono text-xs"
                />
              </CardContent>
            )}
          </Card>
        </>
      )}

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How Import Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <FileJson className="h-4 w-4 shrink-0 mt-0.5" />
            <p><strong>JSON files</strong> — Import a previously exported course backup. The data is validated and you can choose to merge or replace your existing content.</p>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 shrink-0 mt-0.5" />
            <p><strong>Text / Markdown</strong> — View the file content and use it as reference while building modules through the Module Builder forms.</p>
          </div>
          <Separator />
          <p>To create a JSON backup, go to the <strong>Export</strong> page and click <strong>Download Backup (JSON)</strong>.</p>
        </CardContent>
      </Card>
    </div>
  );
}
