import { useNavigate } from "react-router-dom";
import { Plus, AlertTriangle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";

export default function ExamPrep() {
  const { data, deleteExamQuestion } = useCourse();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteExamQuestion(id);
    toast({ title: "Question deleted" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Prep Generator</h1>
          <p className="text-muted-foreground mt-1">
            Nevada-style multiple choice questions aligned with Pearson VUE standards
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/exam-prep/new")}>
          <Plus className="h-4 w-4" />
          New Question
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.examQuestions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Exam Traps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {data.examQuestions.filter((q) => q.examTrap).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Practice Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.practiceExams.length}</p>
          </CardContent>
        </Card>
      </div>

      {data.examQuestions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">
              No exam questions created yet. Generate Nevada-style MCQs to build your question bank.
            </p>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/exam-prep/new")}>
              <Plus className="h-4 w-4" />
              Create First Question
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {data.examQuestions.map((q) => (
            <Card key={q.id} className="hover:border-accent transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-base font-medium leading-snug">
                    {q.question}
                  </CardTitle>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant="outline">{q.difficulty}</Badge>
                    {q.examTrap && (
                      <Badge variant="destructive" className="text-[10px]">Trap</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => navigate(`/exam-prep/edit/${q.id}`)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(q.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span>{q.topic}</span>
                  <span>•</span>
                  <span>{q.source}</span>
                  {q.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{q.tags.join(", ")}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
