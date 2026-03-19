import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, AlertTriangle, Star, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";
import type { Module, KeyTerm, KnowledgeCheckQuestion, ExamAlert, SourceAuthority } from "@/types/course";

function generateId() {
  return crypto.randomUUID();
}

const emptyKeyTerm = (): KeyTerm => ({
  id: generateId(),
  term: "",
  definition: "",
  source: "NRS/NAC",
});

const emptyQuestion = (): KnowledgeCheckQuestion => ({
  id: generateId(),
  question: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  explanation: "",
});

const emptyExamAlert = (): ExamAlert => ({
  id: generateId(),
  text: "",
  type: "exam-alert",
});

const emptyModule = (weekNumber: number): Module => ({
  id: generateId(),
  weekNumber,
  title: "",
  order: 0,
  keyTerms: [emptyKeyTerm()],
  conceptExplanation: "",
  nevadaLegalRefs: "",
  realWorldScenario: "",
  commonMistakes: "",
  examKeyPoints: "",
  examAlerts: [],
  knowledgeChecks: [emptyQuestion()],
  discussionPrompt: "",
  assignmentSuggestion: "",
  estimatedTime: "",
  sourceTag: "NRS/NAC",
  correctsTextbook: false,
  federalVsNevada: "nevada",
});

export default function ModuleForm() {
  const navigate = useNavigate();
  const { weekNumber, moduleId } = useParams();
  const { data, addModule, updateModule } = useCourse();

  const existingModule = moduleId ? data.modules.find((m) => m.id === moduleId) : null;
  const week = Number(weekNumber || existingModule?.weekNumber || 1);

  const [module, setModule] = useState<Module>(
    existingModule ? { ...existingModule } : emptyModule(week)
  );

  const update = <K extends keyof Module>(field: K, value: Module[K]) => {
    setModule((prev) => ({ ...prev, [field]: value }));
  };

  // Key Terms
  const addKeyTerm = () => update("keyTerms", [...module.keyTerms, emptyKeyTerm()]);
  const removeKeyTerm = (id: string) =>
    update("keyTerms", module.keyTerms.filter((t) => t.id !== id));
  const updateKeyTerm = (id: string, field: keyof KeyTerm, value: string) =>
    update(
      "keyTerms",
      module.keyTerms.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );

  // Knowledge Checks
  const addQuestion = () => update("knowledgeChecks", [...module.knowledgeChecks, emptyQuestion()]);
  const removeQuestion = (id: string) =>
    update("knowledgeChecks", module.knowledgeChecks.filter((q) => q.id !== id));
  const updateQuestion = (id: string, field: string, value: any) =>
    update(
      "knowledgeChecks",
      module.knowledgeChecks.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  const updateQuestionOption = (qId: string, optIndex: number, value: string) =>
    update(
      "knowledgeChecks",
      module.knowledgeChecks.map((q) =>
        q.id === qId
          ? { ...q, options: q.options.map((o, i) => (i === optIndex ? value : o)) }
          : q
      )
    );

  // Exam Alerts
  const addExamAlert = () => update("examAlerts", [...module.examAlerts, emptyExamAlert()]);
  const removeExamAlert = (id: string) =>
    update("examAlerts", module.examAlerts.filter((a) => a.id !== id));
  const updateExamAlert = (id: string, field: keyof ExamAlert, value: string) =>
    update(
      "examAlerts",
      module.examAlerts.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  const handleSave = () => {
    if (!module.title.trim()) {
      toast({ title: "Module title is required", variant: "destructive" });
      return;
    }
    if (existingModule) {
      updateModule(module);
      toast({ title: "Module updated" });
    } else {
      const order = data.modules.filter((m) => m.weekNumber === week).length;
      addModule({ ...module, order });
      toast({ title: "Module created" });
    }
    navigate("/modules");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/modules")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {existingModule ? "Edit Module" : "New Module"}
          </h1>
          <p className="text-muted-foreground">Week {module.weekNumber}</p>
        </div>
        <Button onClick={handleSave}>Save Module</Button>
      </div>

      {/* Title & Meta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Module Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Module Title *</Label>
            <Input
              placeholder="e.g., Law of Agency Review"
              value={module.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Week</Label>
              <Select value={String(module.weekNumber)} onValueChange={(v) => update("weekNumber", Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 – Licensing, Commission & Agency Foundations</SelectItem>
                  <SelectItem value="2">2 – Agency Deep Dive</SelectItem>
                  <SelectItem value="3">3 – NV Disclosures + National Appraisal & Disclosures</SelectItem>
                  <SelectItem value="4">4 – Property Mgmt + Financing & Math</SelectItem>
                  <SelectItem value="5">5 – Nevada Contracts Part I & II</SelectItem>
                  <SelectItem value="6">6 – Record Keeping + National Practice + Special Topics</SelectItem>
                  <SelectItem value="7">7 – Final Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Source Authority</Label>
              <Select value={module.sourceTag} onValueChange={(v) => update("sourceTag", v as SourceAuthority)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="NRS/NAC">NRS/NAC</SelectItem>
                  <SelectItem value="Pearson VUE">Pearson VUE</SelectItem>
                  <SelectItem value="CE Shop">CE Shop</SelectItem>
                  <SelectItem value="Lecture Notes">Lecture Notes</SelectItem>
                  <SelectItem value="Textbook">Textbook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Jurisdiction</Label>
              <Select value={module.federalVsNevada} onValueChange={(v) => update("federalVsNevada", v as Module["federalVsNevada"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nevada">Nevada</SelectItem>
                  <SelectItem value="federal">Federal</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estimated Time</Label>
              <Input
                placeholder="e.g., 45 minutes"
                value={module.estimatedTime}
                onChange={(e) => update("estimatedTime", e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={module.correctsTextbook}
              onCheckedChange={(v) => update("correctsTextbook", v)}
            />
            <Label className="cursor-pointer">Corrects outdated textbook material</Label>
          </div>
        </CardContent>
      </Card>

      {/* Key Terms */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Key Terms</CardTitle>
          <Button variant="outline" size="sm" onClick={addKeyTerm} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Term
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {module.keyTerms.map((term, i) => (
            <div key={term.id} className="flex gap-3 items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Term"
                  value={term.term}
                  onChange={(e) => updateKeyTerm(term.id, "term", e.target.value)}
                />
                <Input
                  placeholder="Definition"
                  value={term.definition}
                  onChange={(e) => updateKeyTerm(term.id, "definition", e.target.value)}
                />
              </div>
              {module.keyTerms.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeKeyTerm(term.id)} className="shrink-0 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Concept Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Concept Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Plain-English explanation of the concept..."
            className="min-h-[120px]"
            value={module.conceptExplanation}
            onChange={(e) => update("conceptExplanation", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Nevada Legal References */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-accent" />
            Nevada Legal References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="NRS/NAC citations and references..."
            className="min-h-[100px]"
            value={module.nevadaLegalRefs}
            onChange={(e) => update("nevadaLegalRefs", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Real-World Scenario */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Real-World Transaction Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="A Nevada-specific real estate scenario..."
            className="min-h-[100px]"
            value={module.realWorldScenario}
            onChange={(e) => update("realWorldScenario", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Student Mistakes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Common errors students make on this topic..."
            className="min-h-[80px]"
            value={module.commonMistakes}
            onChange={(e) => update("commonMistakes", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Exam Key Points */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Exam-Focused Key Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Critical points for the Nevada licensing exam..."
            className="min-h-[80px]"
            value={module.examKeyPoints}
            onChange={(e) => update("examKeyPoints", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Exam Alerts */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Exam Alerts
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addExamAlert} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Alert
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {module.examAlerts.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No exam alerts added.</p>
          )}
          {module.examAlerts.map((alert) => (
            <div key={alert.id} className="flex gap-3 items-start">
              <Select
                value={alert.type}
                onValueChange={(v) => updateExamAlert(alert.id, "type", v)}
              >
                <SelectTrigger className="w-[180px] shrink-0"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="exam-alert">Exam Alert</SelectItem>
                  <SelectItem value="high-probability">High Probability</SelectItem>
                  <SelectItem value="exam-trap">Exam Trap</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Alert text..."
                className="flex-1"
                value={alert.text}
                onChange={(e) => updateExamAlert(alert.id, "text", e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeExamAlert(alert.id)} className="shrink-0 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Knowledge Check Questions */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Knowledge Check Questions</CardTitle>
          <Button variant="outline" size="sm" onClick={addQuestion} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Question
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {module.knowledgeChecks.map((q, qIndex) => (
            <div key={q.id} className="space-y-3 p-4 rounded-lg border bg-muted/30">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Question {qIndex + 1}</Badge>
                {module.knowledgeChecks.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeQuestion(q.id)} className="text-muted-foreground hover:text-destructive h-7 w-7">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Question text..."
                value={q.question}
                onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
              />
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuestion(q.id, "correctIndex", optIndex)}
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        q.correctIndex === optIndex
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 hover:border-primary/50"
                      }`}
                    >
                      {q.correctIndex === optIndex && (
                        <span className="text-[10px] font-bold">✓</span>
                      )}
                    </button>
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                      value={opt}
                      onChange={(e) => updateQuestionOption(q.id, optIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <Textarea
                placeholder="Explanation of the correct answer..."
                className="min-h-[60px]"
                value={q.explanation}
                onChange={(e) => updateQuestion(q.id, "explanation", e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Canvas Discussion Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canvas Discussion Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Discussion prompt for Canvas..."
            className="min-h-[80px]"
            value={module.discussionPrompt}
            onChange={(e) => update("discussionPrompt", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Canvas Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canvas Assignment / Activity Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Suggested assignment or activity..."
            className="min-h-[80px]"
            value={module.assignmentSuggestion}
            onChange={(e) => update("assignmentSuggestion", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/modules")}>Cancel</Button>
        <Button onClick={handleSave}>Save Module</Button>
      </div>
    </div>
  );
}
