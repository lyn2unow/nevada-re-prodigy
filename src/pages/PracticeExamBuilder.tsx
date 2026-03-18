import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckSquare, Square, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";
import { generateWeightedExam, type AreaAllocation } from "@/lib/weighted-exam";

type BuildMode = "manual" | "weighted";

export default function PracticeExamBuilder() {
  const navigate = useNavigate();
  const { data, addPracticeExam } = useCourse();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Weighted mode state
  const [mode, setMode] = useState<BuildMode>("manual");
  const [weightedCount, setWeightedCount] = useState(120);
  const [weightedPortion, setWeightedPortion] = useState<"both" | "national" | "state">("both");
  const [allocations, setAllocations] = useState<AreaAllocation[] | null>(null);

  const topicOptions = useMemo(() => {
    const topics = new Set<string>();
    data.examQuestions.forEach((q) => { if (q.topic) topics.add(q.topic); });
    return Array.from(topics).sort();
  }, [data.examQuestions]);

  const sourceOptions = useMemo(() => {
    const sources = new Set<string>();
    data.examQuestions.forEach((q) => { if (q.source) sources.add(q.source); });
    return Array.from(sources).sort();
  }, [data.examQuestions]);

  const filtered = useMemo(() => {
    return data.examQuestions.filter((q) => {
      const matchesSearch =
        !search ||
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.topic.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesTopic = topicFilter === "all" || q.topic === topicFilter;
      const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;
      const matchesSource = sourceFilter === "all" || q.source === sourceFilter;
      return matchesSearch && matchesTopic && matchesDifficulty && matchesSource;
    });
  }, [data.examQuestions, search, topicFilter, difficultyFilter, sourceFilter]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((q) => next.add(q.id));
      return next;
    });
  };

  const deselectFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((q) => next.delete(q.id));
      return next;
    });
  };

  const handleGenerateWeighted = () => {
    const result = generateWeightedExam(data.examQuestions, {
      totalQuestions: weightedCount,
      portion: weightedPortion === "both" ? undefined : weightedPortion,
    });
    setSelected(new Set(result.questionIds));
    setAllocations(result.allocations);
    toast({
      title: `${result.questionIds.length} questions selected`,
      description: "Proportionally distributed across Pearson VUE exam areas",
    });
  };

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
          <p className="text-muted-foreground">Select questions manually or auto-generate a weighted exam</p>
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

      {/* Mode Tabs */}
      <div className="flex gap-2">
        <Button
          variant={mode === "manual" ? "default" : "outline"}
          onClick={() => setMode("manual")}
        >
          Manual Selection
        </Button>
        <Button
          variant={mode === "weighted" ? "default" : "outline"}
          className="gap-2"
          onClick={() => setMode("weighted")}
        >
          <Zap className="h-4 w-4" />
          Pearson VUE Weighted
        </Button>
      </div>

      {/* Weighted Mode Panel */}
      {mode === "weighted" && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Weighted Exam Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Auto-select questions proportionally to Pearson VUE exam area weights.
              The real exam has 80 national + 40 state scored items = 120 total.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label>Total Questions</Label>
                <Input
                  type="number"
                  min={10}
                  max={200}
                  value={weightedCount}
                  onChange={(e) => setWeightedCount(Number(e.target.value) || 10)}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label>Portion</Label>
                <Select value={weightedPortion} onValueChange={(v) => setWeightedPortion(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both (National + State)</SelectItem>
                    <SelectItem value="national">National Only (80 items)</SelectItem>
                    <SelectItem value="state">State Only (40 items)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleGenerateWeighted} className="gap-2">
                  <Zap className="h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>

            {/* Allocation breakdown */}
            {allocations && (
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-sm font-medium">Area Breakdown</p>
                <div className="grid gap-1.5">
                  {allocations.map((a) => (
                    <div key={a.area} className="flex items-center gap-3 text-sm">
                      <span className="flex-1 truncate text-muted-foreground">{a.area}</span>
                      <span className="tabular-nums w-16 text-right">
                        {a.selected}/{a.target}
                      </span>
                      <Progress
                        value={a.target > 0 ? (a.selected / a.target) * 100 : 0}
                        className="w-24 h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Manual Question Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {mode === "weighted" ? "Selected" : "Select"} Questions ({selected.size} of {data.examQuestions.length})
            </CardTitle>
            {mode === "manual" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectFiltered}>
                  <CheckSquare className="h-3.5 w-3.5 mr-1" /> Select Filtered
                </Button>
                <Button variant="outline" size="sm" onClick={deselectFiltered}>
                  <Square className="h-3.5 w-3.5 mr-1" /> Deselect Filtered
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, topic, term, or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topicOptions.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulty</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sourceOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {data.examQuestions.length} questions
          </p>

          {data.examQuestions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No questions available. Create exam questions first.
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No questions match your filters.
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((q) => (
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
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-[10px]">{q.topic}</Badge>
                      <Badge variant="outline" className="text-[10px]">{q.difficulty}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{q.source}</Badge>
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
