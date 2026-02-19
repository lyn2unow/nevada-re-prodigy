import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";

export default function PracticeExamBuilder() {
  const navigate = useNavigate();
  const { data, addPracticeExam } = useCourse();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(data.examQuestions.map((q) => q.id)));
  const deselectAll = () => setSelected(new Set());

  const handleCreate = () => {
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (selected.size === 0) {
      toast({ title: "Select at least one question", variant: "destructive" });
      return;
    }
    const pe = {
      id: crypto.randomUUID(),
      title: title.trim(),
      questionIds: Array.from(selected),
      createdAt: new Date().toISOString(),
    };
    addPracticeExam(pe);
    toast({ title: `Practice exam "${pe.title}" created with ${pe.questionIds.length} questions` });
    navigate("/exam-prep");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/exam-prep")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Build Practice Exam</h1>
          <p className="text-muted-foreground">Select questions and set a time limit</p>
        </div>
        <Button onClick={handleCreate}>Create Exam</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exam Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Exam Title *</Label>
            <Input
              placeholder="e.g., Midterm Practice — Agency & Contracts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Timer: 1.5 minutes per question (industry standard for licensing exams)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Select Questions ({selected.size} of {data.examQuestions.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                <CheckSquare className="h-3.5 w-3.5 mr-1" /> All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>
                <Square className="h-3.5 w-3.5 mr-1" /> None
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {data.examQuestions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No questions available. Create exam questions first.
            </p>
          ) : (
            <div className="space-y-2">
              {data.examQuestions.map((q) => (
                <div
                  key={q.id}
                  className="flex items-start gap-3 p-3 rounded-md border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => toggle(q.id)}
                >
                  <Checkbox
                    checked={selected.has(q.id)}
                    onCheckedChange={() => toggle(q.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{q.question}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px]">{q.topic}</Badge>
                      <Badge variant="outline" className="text-[10px]">{q.difficulty}</Badge>
                      {q.examTrap && <Badge variant="destructive" className="text-[10px]">Trap</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
