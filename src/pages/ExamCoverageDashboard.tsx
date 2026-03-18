import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, BookOpen, HelpCircle, BarChart3, Target } from "lucide-react";
import { PEARSON_VUE_WEIGHTS, getModuleArea, getQuestionArea, getQuestionCognitive, type PearsonVueWeight } from "@/data/pearson-vue-mappings";
import type { PearsonVueArea, Module, ExamQuestion } from "@/types/course";
import { getSeedModules, getSeedExamQuestions } from "@/data/seed-content";
import { getPearsonVueModules, getPearsonVueExamQuestions } from "@/data/pearson-vue-content";
import { getCEShopModules, getCEShopExamQuestions } from "@/data/ce-shop-content";
import { getLectureNotesModules, getLectureNotesExamQuestions } from "@/data/lecture-notes-content";
import { getTextbookModules, getTextbookExamQuestions } from "@/data/textbook-content";

interface AreaData {
  weight: PearsonVueWeight;
  modules: Module[];
  questions: ExamQuestion[];
  cognitiveCounts: { knowledge: number; application: number; analysis: number };
}

function getAllContent() {
  const modules = [
    ...getSeedModules(),
    ...getPearsonVueModules(),
    ...getCEShopModules(),
    ...getLectureNotesModules(),
    ...getTextbookModules(),
  ];
  const questions = [
    ...getSeedExamQuestions(),
    ...getPearsonVueExamQuestions(),
    ...getCEShopExamQuestions(),
    ...getLectureNotesExamQuestions(),
    ...getTextbookExamQuestions(),
  ];
  // Deduplicate by ID
  const seenMods = new Set<string>();
  const seenQs = new Set<string>();
  return {
    modules: modules.filter((m) => { if (seenMods.has(m.id)) return false; seenMods.add(m.id); return true; }),
    questions: questions.filter((q) => { if (seenQs.has(q.id)) return false; seenQs.add(q.id); return true; }),
  };
}

export default function ExamCoverageDashboard() {
  const { modules, questions } = useMemo(() => getAllContent(), []);

  const areaData = useMemo(() => {
    const map = new Map<PearsonVueArea, AreaData>();

    for (const w of PEARSON_VUE_WEIGHTS) {
      map.set(w.area, {
        weight: w,
        modules: [],
        questions: [],
        cognitiveCounts: { knowledge: 0, application: 0, analysis: 0 },
      });
    }

    for (const mod of modules) {
      const area = getModuleArea(mod.id);
      if (area && map.has(area)) {
        map.get(area)!.modules.push(mod);
      }
    }

    for (const q of questions) {
      const area = getQuestionArea(q.id);
      if (area && map.has(area)) {
        const entry = map.get(area)!;
        entry.questions.push(q);
        const cog = getQuestionCognitive(q.id);
        if (cog) entry.cognitiveCounts[cog]++;
      }
    }

    return Array.from(map.values());
  }, [modules, questions]);

  const totalModules = modules.length;
  const totalQuestions = questions.length;
  const taggedModules = modules.filter((m) => getModuleArea(m.id)).length;
  const taggedQuestions = questions.filter((q) => getQuestionArea(q.id)).length;

  // Global cognitive level distribution
  const globalCognitive = useMemo(() => {
    const counts = { knowledge: 0, application: 0, analysis: 0 };
    for (const q of questions) {
      const cog = getQuestionCognitive(q.id);
      if (cog) counts[cog]++;
    }
    return counts;
  }, [questions]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Exam Coverage Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Content mapped to Pearson VUE exam areas — 80 national + 40 state scored items
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard icon={BookOpen} label="Modules Tagged" value={`${taggedModules}/${totalModules}`} />
        <SummaryCard icon={HelpCircle} label="Questions Tagged" value={`${taggedQuestions}/${totalQuestions}`} />
        <SummaryCard icon={Target} label="Exam Areas Covered" value={`${areaData.filter((a) => a.questions.length > 0).length}/16`} />
        <SummaryCard icon={BarChart3} label="Cognitive Split" value={`K:${globalCognitive.knowledge} A:${globalCognitive.application} An:${globalCognitive.analysis}`} />
      </div>

      {/* National portion */}
      <Section
        title="National Portion (80 items)"
        areas={areaData.filter((a) => a.weight.area.startsWith("National"))}
        totalQuestions={totalQuestions}
      />

      {/* State portion */}
      <Section
        title="State Portion (40 items)"
        areas={areaData.filter((a) => a.weight.area.startsWith("State"))}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Section({ title, areas, totalQuestions }: { title: string; areas: AreaData[]; totalQuestions: number }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-4 pt-0">
        {areas.map((a) => (
          <AreaRow key={a.weight.area} data={a} totalQuestions={totalQuestions} />
        ))}
      </CardContent>
    </Card>
  );
}

function AreaRow({ data, totalQuestions }: { data: AreaData; totalQuestions: number }) {
  const [open, setOpen] = useState(false);
  const { weight, modules: areaMods, questions: areaQs, cognitiveCounts } = data;

  // Calculate proportional coverage: actual question share vs expected weight
  const actualShare = totalQuestions > 0 ? areaQs.length / totalQuestions : 0;
  const coverageRatio = weight.weight > 0 ? Math.min(actualShare / weight.weight, 2) : 0;
  const coveragePct = Math.round(coverageRatio * 100);

  const label = weight.area.replace(/^(National|State) [IVX]+ - /, "");
  const areaCode = weight.area.match(/^(National|State) ([IVX]+)/)?.[0] ?? "";
  const examItems = weight.nationalItems + weight.stateItems;

  let coverageColor = "text-destructive";
  if (coveragePct >= 80) coverageColor = "text-green-600 dark:text-green-400";
  else if (coveragePct >= 50) coverageColor = "text-yellow-600 dark:text-yellow-400";

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-3 py-2.5 px-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
          {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
          <span className="text-xs font-mono text-muted-foreground w-16 shrink-0 text-left">{areaCode}</span>
          <span className="text-sm text-foreground flex-1 text-left truncate">{label}</span>
          <span className="text-xs text-muted-foreground w-12 text-right shrink-0">{examItems} items</span>
          <span className="text-xs text-muted-foreground w-10 text-right shrink-0">{(weight.weight * 100).toFixed(1)}%</span>
          <div className="w-24 shrink-0">
            <Progress value={Math.min(coveragePct, 100)} className="h-2" />
          </div>
          <span className={`text-xs font-medium w-10 text-right shrink-0 ${coverageColor}`}>{coveragePct}%</span>
          <div className="flex gap-1 shrink-0">
            <Badge variant="secondary" className="text-[10px] px-1.5">{areaMods.length} mod</Badge>
            <Badge variant="outline" className="text-[10px] px-1.5">{areaQs.length} Q</Badge>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-8 mr-2 mb-3 space-y-3">
          {/* Cognitive level breakdown */}
          {areaQs.length > 0 && (
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">Cognitive:</span>
              <Badge variant="secondary" className="text-[10px]">K: {cognitiveCounts.knowledge}</Badge>
              <Badge variant="secondary" className="text-[10px]">A: {cognitiveCounts.application}</Badge>
              <Badge variant="secondary" className="text-[10px]">An: {cognitiveCounts.analysis}</Badge>
            </div>
          )}

          {/* Modules list */}
          {areaMods.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Modules ({areaMods.length})</p>
              <ScrollArea className="max-h-32">
                <div className="space-y-0.5">
                  {areaMods.map((m) => (
                    <div key={m.id} className="text-xs text-foreground/80 flex items-center gap-2 py-0.5">
                      <Badge variant="outline" className="text-[9px] px-1 shrink-0">{m.sourceTag}</Badge>
                      <span className="truncate">{m.title}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Questions list */}
          {areaQs.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Questions ({areaQs.length})</p>
              <ScrollArea className="max-h-32">
                <div className="space-y-0.5">
                  {areaQs.map((q) => (
                    <div key={q.id} className="text-xs text-foreground/80 flex items-center gap-2 py-0.5">
                      <Badge variant="outline" className="text-[9px] px-1 shrink-0">{q.source}</Badge>
                      <Badge variant={q.difficulty === "advanced" ? "destructive" : "secondary"} className="text-[9px] px-1 shrink-0">{q.difficulty}</Badge>
                      <span className="truncate">{q.topic}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {areaMods.length === 0 && areaQs.length === 0 && (
            <p className="text-xs text-muted-foreground italic">No content mapped to this area yet.</p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
