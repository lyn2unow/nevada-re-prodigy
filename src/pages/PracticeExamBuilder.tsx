import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckSquare, Square, Search, Zap, BookOpen } from "lucide-react";
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

// Week definitions — mirrors getSeedWeeks() so no extra import needed
const WEEK_OPTIONS = [
  { number: 1, title: "Week 1: Licensing, Commission & Agency Foundations" },
  { number: 2, title: "Week 2: Agency Deep Dive" },
  { number: 3, title: "Week 3: Nevada Disclosures + National Appraisal & Disclosures" },
  { number: 4, title: "Week 4: Property Management + Guest Speaker + Financing & Math" },
  { number: 5, title: "Week 5: Nevada Contracts Part I & II" },
  { number: 6, title: "Week 6: Record Keeping + National Practice + Special Topics" },
  { number: 7, title: "Week 7: Final Exam" },
];

const TOPIC_WEEK_MAP: Record<string, number> = {
  // Week 1 — Licensing, Commission & Agency Foundations
  "Licensing": 1, "License Law": 1, "License Practice": 1, "Commission Powers": 1,
  "Exam Procedures": 1, "Exam Structure": 1, "Content Outline": 1,
  "Real Estate License Law": 1, "Post-License Education": 1, "Appraiser Licensing": 1,

  // Week 2 — Agency Deep Dive
  "Agency": 2, "Assigned Agency": 2, "Broker Liability": 2, "Salesperson Authority": 2,
  "Salesperson Liability": 2, "Termination of Agency": 2, "Disclosure Duties": 2,
  "Stigmatized Property": 2, "Personal Assistants": 2, "Unlicensed Referral Fees": 2,
  "Steering": 2,

  // Week 3 — Nevada Disclosures + National Appraisal & Disclosures
  "Disclosures": 3, "Seller Disclosures": 3, "SRPD Rescission": 3, "SRPD Cancellation": 3,
  "Treble Damages": 3, "Residential Appraisal": 3, "Broker Price Opinions": 3,
  "Phase I vs Phase II": 3, "State Environmental Commission": 3,
  "Legal Descriptions": 3, "Metes and Bounds": 3, "Rectangular Survey System": 3,

  // Week 4 — Property Management + Guest Speaker + Financing & Math
  "Leases": 4, "Security Deposit": 4, "Security Deposits": 4, "Summary Eviction": 4,
  "Summary Eviction Timeline": 4, "Finance": 4, "Real Estate Financing": 4,
  "Lien Priority": 4, "Tax Lien Enforcement": 4, "Tax Abatement": 4,
  "Property Taxes": 4, "Property Tax Calculation": 4,
  "TRID": 4, "TRID Timeline": 4, "TRID Triggers": 4, "TRID Disclosures": 4,
  "Loan Estimate": 4, "Short Sales & Deficiencies": 4, "Proration": 4,

  // Week 5 — Nevada Contracts Part I & II
  "Contracts": 5, "Listing Agreements": 5, "Net Listings": 5, "Procuring Cause": 5,
  "Procuring Cause & Broker Compensation": 5, "Specific Performance": 5,
  "Statute of Frauds": 5, "Oral Agreements": 5, "Paperwork Delivery": 5,
  "Paperwork Submission": 5, "Trust Accounts": 5, "Supervision, Records & Trust Accounts": 5,
  "Closing": 5,

  // Week 6 — Record Keeping + National Practice + Special Topics
  "Record Keeping": 6, "Recordkeeping": 6, "Record Retention": 6,
  "Fair Housing": 6, "Fair Housing Protected Classes": 6,
  "Property Ownership": 6, "Forms of Ownership": 6, "Community Property": 6,
  "Condominium Ownership": 6, "Trust Ownership": 6, "Subchapter S Corporation": 6,
  "Transfer of Title": 6, "Transfer Tax": 6, "Transfer Tax Calculation": 6,
  "Transfer Tax & Involuntary Alienation": 6, "Straw-Man Conveyance": 6,
  "Adverse Possession": 6, "Deed Validity": 6, "Nevada Standard Deed": 6,
  "Probate Sales": 6, "Probate Commission": 6,
  "Recording Purpose": 6, "Title Records": 6, "UCC-1 Filing": 6,
  "Unrecorded Deed": 6, "Title Insurance": 6, "Title Insurance Coverage": 6,
  "Title Policy Payment": 6,

  // Week 7 — Final Exam
  "Special Topics": 7, "Water Rights": 7, "Water Rights Doctrine": 7,
  "Solar Easements": 7, "Time-Shares": 7, "Time-Share Ownership": 7,
  "Time-Share Sales Agent": 7, "Subdivision Law": 7, "Subdivided Land": 7,
  "Subdivided Land Exemptions": 7, "Subdivided Land Administration": 7,
  "Zoning Authority": 7, "Land Use Controls": 7, "Nonconforming Use": 7,
  "Prescriptive Easement": 7, "Prescriptive Easements": 7, "Trespasser Liability": 7,
  "Right of Reinstatement": 7, "Statutory Redemption": 7,
  "Appraiser Exemptions": 7,
};

export default function PracticeExamBuilder() {
  const navigate = useNavigate();
  const { data, addPracticeExam } = useCourse();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [weekFilter, setWeekFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Weighted mode state
  const [mode, setMode] = useState<BuildMode>("manual");
  const [weightedCount, setWeightedCount] = useState(120);
  const [weightedPortion, setWeightedPortion] = useState<"both" | "national" | "state">("both");
  const [allocations, setAllocations] = useState<AreaAllocation[] | null>(null);

  // Topic options scoped to the selected week — if a week is chosen, only show
  // topics that exist within that week's questions so the list stays short.
  const topicOptions = useMemo(() => {
    const topics = new Set<string>();
    data.examQuestions.forEach((q) => {
      if (!q.topic) return;
      const weekMatch = weekFilter === "all" || TOPIC_WEEK_MAP[q.topic] === Number(weekFilter);
      if (weekMatch) topics.add(q.topic);
    });
    return Array.from(topics).sort();
  }, [data.examQuestions, weekFilter]);

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
      const matchesWeek = weekFilter === "all" || TOPIC_WEEK_MAP[q.topic] === Number(weekFilter);
      const matchesTopic = topicFilter === "all" || q.topic === topicFilter;
      const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;
      const matchesSource = sourceFilter === "all" || q.source === sourceFilter;
      return matchesSearch && matchesWeek && matchesTopic && matchesDifficulty && matchesSource;
    });
  }, [data.examQuestions, search, weekFilter, topicFilter, difficultyFilter, sourceFilter]);

  // Reset topic filter when week changes so a stale topic selection doesn't
  // produce an empty list when switching weeks.
  const handleWeekChange = (value: string) => {
    setWeekFilter(value);
    setTopicFilter("all");
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addAllShown = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((q) => next.add(q.id));
      return next;
    });
    toast({ title: `Added ${filtered.length} questions to selection` });
  };

  const removeAllShown = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((q) => next.delete(q.id));
      return next;
    });
    toast({ title: `Removed ${filtered.length} questions from selection` });
  };

  const clearAll = () => {
    setSelected(new Set());
    toast({ title: "Selection cleared" });
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

  // How many of the currently-shown filtered questions are already selected
  const selectedInView = filtered.filter((q) => selected.has(q.id)).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/exam-prep")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Build Practice Exam</h1>
          <p className="text-muted-foreground">Select questions manually or auto-generate a weighted exam</p>
        </div>
        <Button onClick={handleCreate} disabled={selected.size === 0 || !title.trim()}>
          Create Exam
        </Button>
      </div>

      {/* Exam Details */}
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

      {/* Question Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg">
              {mode === "weighted" ? "Selected" : "Select"} Questions ({selected.size} of {data.examQuestions.length})
            </CardTitle>
            {mode === "manual" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={addAllShown}>
                  <CheckSquare className="h-3.5 w-3.5 mr-1" />
                  Add all shown
                  {filtered.length > 0 && (
                    <span className="ml-1 text-muted-foreground">({filtered.length})</span>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={removeAllShown} disabled={selectedInView === 0}>
                  <Square className="h-3.5 w-3.5 mr-1" />
                  Remove all shown
                  {selectedInView > 0 && (
                    <span className="ml-1 text-muted-foreground">({selectedInView})</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Row 1 — Week filter (new) + Source filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={weekFilter} onValueChange={handleWeekChange}>
              <SelectTrigger className="w-full sm:w-64">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                <SelectValue placeholder="All Weeks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weeks</SelectItem>
                {WEEK_OPTIONS.map((w) => (
                  <SelectItem key={w.number} value={String(w.number)}>
                    {w.title}
                  </SelectItem>
                ))}
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

          {/* Row 2 — Search + Topic (scoped) + Difficulty */}
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
              <SelectTrigger className="w-full sm:w-52">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {weekFilter === "all" ? "All Topics" : "All topics this week"}
                </SelectItem>
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
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {data.examQuestions.length} questions
            {weekFilter !== "all" && (
              <span className="ml-1 text-primary font-medium">
                · {WEEK_OPTIONS.find(w => String(w.number) === weekFilter)?.title}
              </span>
            )}
          </p>

          {/* Question list */}
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
                  className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                    selected.has(q.id)
                      ? "bg-primary/5 border-primary/30"
                      : "hover:bg-muted/50"
                  }`}
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
                      {q.weekNumber && (
                        <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                          Wk {q.weekNumber}
                        </Badge>
                      )}
                      {q.examTrap && <Badge variant="destructive" className="text-[10px]">Trap</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Sticky selection tray ── */}
      {selected.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">
                {selected.size} question{selected.size !== 1 ? "s" : ""} selected
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Selection persists as you change filters — keep adding!
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground shrink-0">
              Clear all
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim()} className="shrink-0">
              Create Exam →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
