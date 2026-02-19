import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
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
import type { ExamQuestion, SourceAuthority, DifficultyLevel } from "@/types/course";

function generateId() {
  return crypto.randomUUID();
}

const emptyQuestion = (): ExamQuestion => ({
  id: generateId(),
  topic: "",
  question: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  explanation: "",
  wrongExplanations: ["", "", ""],
  difficulty: "intermediate",
  examTrap: false,
  examTrapNote: "",
  tags: [],
  source: "NRS/NAC",
});

export default function ExamQuestionForm() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { data, addExamQuestion, updateExamQuestion } = useCourse();

  const existing = questionId ? data.examQuestions.find((q) => q.id === questionId) : null;
  const [q, setQ] = useState<ExamQuestion>(existing ? { ...existing } : emptyQuestion());
  const [tagInput, setTagInput] = useState("");

  const update = <K extends keyof ExamQuestion>(field: K, value: ExamQuestion[K]) => {
    setQ((prev) => ({ ...prev, [field]: value }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...q.options] as [string, string, string, string];
    newOptions[index] = value;
    update("options", newOptions);
  };

  const updateWrongExplanation = (wrongIndex: number, value: string) => {
    const newWrong = [...q.wrongExplanations] as [string, string, string];
    newWrong[wrongIndex] = value;
    update("wrongExplanations", newWrong);
  };

  // Map wrong explanation indices: skip the correct answer index
  const getWrongExplanationIndex = (optIndex: number): number => {
    let wrongIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i === q.correctIndex) continue;
      if (i === optIndex) return wrongIdx;
      wrongIdx++;
    }
    return 0;
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !q.tags.includes(tag)) {
      update("tags", [...q.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    update("tags", q.tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!q.question.trim()) {
      toast({ title: "Question text is required", variant: "destructive" });
      return;
    }
    if (!q.topic.trim()) {
      toast({ title: "Topic is required", variant: "destructive" });
      return;
    }
    if (q.options.some((o) => !o.trim())) {
      toast({ title: "All 4 answer options are required", variant: "destructive" });
      return;
    }
    if (existing) {
      updateExamQuestion(q);
      toast({ title: "Question updated" });
    } else {
      addExamQuestion(q);
      toast({ title: "Question created" });
    }
    navigate("/exam-prep");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/exam-prep")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {existing ? "Edit Question" : "New Exam Question"}
          </h1>
          <p className="text-muted-foreground">Nevada-style multiple choice</p>
        </div>
        <Button onClick={handleSave}>Save Question</Button>
      </div>

      {/* Topic & Meta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topic *</Label>
              <Input
                placeholder="e.g., Agency Law, Fair Housing"
                value={q.topic}
                onChange={(e) => update("topic", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Source Authority</Label>
              <Select value={q.source} onValueChange={(v) => update("source", v as SourceAuthority)}>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Select value={q.difficulty} onValueChange={(v) => update("difficulty", v as DifficultyLevel)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
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
              {q.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {q.tags.map((tag) => (
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

      {/* Exam Trap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Exam Trap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              checked={q.examTrap}
              onCheckedChange={(v) => update("examTrap", v)}
            />
            <Label className="cursor-pointer">Flag as common licensing exam trap</Label>
          </div>
          {q.examTrap && (
            <div className="space-y-2">
              <Label>Exam Trap Note</Label>
              <Input
                placeholder="Why is this a trap? What do students commonly get wrong?"
                value={q.examTrapNote || ""}
                onChange={(e) => update("examTrapNote", e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question & Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question & Answer Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Question Text *</Label>
            <Textarea
              placeholder="Enter the question text..."
              className="min-h-[80px]"
              value={q.question}
              onChange={(e) => update("question", e.target.value)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-muted-foreground text-sm">Click the circle to mark the correct answer</Label>
            {q.options.map((opt, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => update("correctIndex", i)}
                    className={`h-7 w-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      q.correctIndex === i
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 hover:border-primary/50"
                    }`}
                  >
                    {q.correctIndex === i ? (
                      <span className="text-xs font-bold">✓</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                    )}
                  </button>
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                  />
                </div>
                {q.correctIndex !== i && (
                  <div className="ml-10">
                    <Input
                      placeholder={`Why is "${String.fromCharCode(65 + i)}" wrong?`}
                      className="text-sm border-dashed"
                      value={q.wrongExplanations[getWrongExplanationIndex(i)]}
                      onChange={(e) => updateWrongExplanation(getWrongExplanationIndex(i), e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Correct Answer Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Correct Answer Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Explain why the correct answer is right, referencing Nevada law when applicable..."
            className="min-h-[100px]"
            value={q.explanation}
            onChange={(e) => update("explanation", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/exam-prep")}>Cancel</Button>
        <Button onClick={handleSave}>Save Question</Button>
      </div>
    </div>
  );
}
