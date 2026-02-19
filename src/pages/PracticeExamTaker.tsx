import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCourse } from "@/contexts/CourseContext";
import type { ExamQuestion } from "@/types/course";

type ExamState = "taking" | "reviewing";

export default function PracticeExamTaker() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const { data } = useCourse();

  const exam = data.practiceExams.find((pe) => pe.id === examId);
  const questions = useMemo(() => {
    if (!exam) return [];
    return exam.questionIds
      .map((id) => data.examQuestions.find((q) => q.id === id))
      .filter(Boolean) as ExamQuestion[];
  }, [exam, data.examQuestions]);

  const totalSeconds = questions.length * 90; // 1.5 min per question
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [state, setState] = useState<ExamState>("taking");

  useEffect(() => {
    if (state !== "taking" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setState("reviewing");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, timeLeft]);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }, []);

  if (!exam || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/exam-prep")}>
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
        <p className="text-muted-foreground text-center py-12">Exam not found or has no questions.</p>
      </div>
    );
  }

  const q = questions[currentIdx];
  const answered = Object.keys(answers).length;
  const score = questions.reduce(
    (acc, question) => acc + (answers[question.id] === question.correctIndex ? 1 : 0),
    0
  );

  const selectAnswer = (optIdx: number) => {
    if (state === "reviewing") return;
    setAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  const submitExam = () => setState("reviewing");

  const restart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(totalSeconds);
    setState("taking");
  };

  const pct = state === "reviewing" ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/exam-prep")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{exam.title}</h1>
          <p className="text-muted-foreground text-sm">
            {questions.length} questions · {state === "taking" ? "In progress" : "Complete"}
          </p>
        </div>
        {state === "taking" && (
          <div className="flex items-center gap-2 text-sm font-mono">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={timeLeft < 60 ? "text-destructive font-bold" : "text-foreground"}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Results banner */}
      {state === "reviewing" && (
        <Card className={pct >= 75 ? "border-success/50 bg-success/5" : "border-destructive/50 bg-destructive/5"}>
          <CardContent className="py-6 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                {score}/{questions.length} correct — {pct}%
              </p>
              <p className="text-sm text-muted-foreground">
                {pct >= 75 ? "Passing score! Great work." : "Below 75% passing threshold. Keep studying!"}
              </p>
            </div>
            <Button variant="outline" onClick={restart}>
              <RotateCcw className="h-4 w-4 mr-2" /> Retake
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>{answered} answered</span>
        </div>
        <Progress value={((currentIdx + 1) / questions.length) * 100} className="h-2" />
      </div>

      {/* Question card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="outline">{q.topic}</Badge>
            <Badge variant="outline">{q.difficulty}</Badge>
            {q.examTrap && <Badge variant="destructive" className="text-[10px]">Trap</Badge>}
          </div>
          <CardTitle className="text-lg mt-3 font-sans font-medium leading-relaxed">
            {q.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {q.options.map((opt, i) => {
            const isSelected = answers[q.id] === i;
            const isCorrect = q.correctIndex === i;
            const showResult = state === "reviewing";

            let optionClass =
              "flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors text-sm";

            if (showResult) {
              if (isCorrect) {
                optionClass += " border-success bg-success/10";
              } else if (isSelected && !isCorrect) {
                optionClass += " border-destructive bg-destructive/10";
              } else {
                optionClass += " opacity-60";
              }
            } else {
              optionClass += isSelected
                ? " border-primary bg-primary/5"
                : " hover:bg-muted/50";
            }

            return (
              <div key={i} className={optionClass} onClick={() => selectAnswer(i)}>
                <span className="h-7 w-7 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-medium border-border">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-success shrink-0" />}
                {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
              </div>
            );
          })}

          {/* Explanation in review mode */}
          {state === "reviewing" && (
            <div className="mt-4 p-3 rounded-md bg-muted/50 border border-border text-sm space-y-2">
              <p className="font-medium">Explanation:</p>
              <p className="text-muted-foreground">{q.explanation || "No explanation provided."}</p>
              {q.examTrap && q.examTrapNote && (
                <p className="text-destructive text-xs">⚠ Exam trap: {q.examTrapNote}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx((i) => i - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        {/* Question dots */}
        <div className="flex gap-1 flex-wrap justify-center max-w-md">
          {questions.map((question, i) => {
            const isAnswered = question.id in answers;
            const isCurrent = i === currentIdx;
            let dotClass = "h-3 w-3 rounded-full cursor-pointer transition-colors";
            if (state === "reviewing") {
              const correct = answers[question.id] === question.correctIndex;
              dotClass += isAnswered
                ? correct
                  ? " bg-success"
                  : " bg-destructive"
                : " bg-muted-foreground/30";
            } else {
              dotClass += isAnswered ? " bg-primary" : " bg-muted-foreground/30";
            }
            if (isCurrent) dotClass += " ring-2 ring-ring ring-offset-2 ring-offset-background";
            return <div key={i} className={dotClass} onClick={() => setCurrentIdx(i)} />;
          })}
        </div>

        {currentIdx < questions.length - 1 ? (
          <Button variant="outline" onClick={() => setCurrentIdx((i) => i + 1)}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : state === "taking" ? (
          <Button onClick={submitExam}>Submit Exam</Button>
        ) : (
          <Button variant="outline" onClick={() => navigate("/exam-prep")}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
