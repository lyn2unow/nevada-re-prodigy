import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import type { Module, ExamQuestion, Activity, StatuteSection } from "@/types/course";

import { getCEShopModules, getCEShopExamQuestions, getCEShopActivities } from "@/data/ce-shop-content";
import { getPearsonVueModules, getPearsonVueExamQuestions, getPearsonVueActivities } from "@/data/pearson-vue-content";
import { getLectureNotesModules, getLectureNotesExamQuestions, getLectureNotesActivities } from "@/data/lecture-notes-content";
import { getNRS645Sections } from "@/data/nrs-reference";

interface SourceData {
  modules: Module[];
  examQuestions: ExamQuestion[];
  activities: Activity[];
}

function matchesSearch(text: string, query: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

function filterSource(data: SourceData, query: string): SourceData {
  if (!query) return data;
  return {
    modules: data.modules.filter(
      (m) =>
        matchesSearch(m.title, query) ||
        m.keyTerms.some((kt) => matchesSearch(kt.term, query) || matchesSearch(kt.definition, query)) ||
        matchesSearch(m.conceptExplanation, query)
    ),
    examQuestions: data.examQuestions.filter(
      (q) => matchesSearch(q.question, query) || matchesSearch(q.topic, query) || q.tags.some((t) => matchesSearch(t, query))
    ),
    activities: data.activities.filter(
      (a) => matchesSearch(a.title, query) || matchesSearch(a.description, query)
    ),
  };
}

function ModuleCard({ mod }: { mod: Module }) {
  return (
    <Collapsible>
      <Card className="mb-3">
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-base">{mod.title}</CardTitle>
                <Badge variant="secondary" className="text-[10px]">Week {mod.weekNumber}</Badge>
                <Badge variant="outline" className="text-[10px]">{mod.sourceTag}</Badge>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4 text-sm">
            {mod.keyTerms.length > 0 && (
              <div>
                <h4 className="font-semibold text-muted-foreground mb-1">Key Terms</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-muted/50"><th className="text-left p-2 font-medium">Term</th><th className="text-left p-2 font-medium">Definition</th></tr></thead>
                    <tbody>
                      {mod.keyTerms.map((kt) => (
                        <tr key={kt.id} className="border-t">
                          <td className="p-2 font-medium whitespace-nowrap align-top">{kt.term}</td>
                          <td className="p-2">{kt.definition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <Section title="Concept Explanation" content={mod.conceptExplanation} />
            <Section title="Nevada Legal References" content={mod.nevadaLegalRefs} />
            <Section title="Real-World Scenario" content={mod.realWorldScenario} />
            <Section title="Common Mistakes" content={mod.commonMistakes} />
            <Section title="Exam Key Points" content={mod.examKeyPoints} />
            {mod.examAlerts.length > 0 && (
              <div>
                <h4 className="font-semibold text-muted-foreground mb-1">Exam Alerts</h4>
                <div className="space-y-1">
                  {mod.examAlerts.map((ea) => (
                    <div key={ea.id} className="flex items-start gap-2 p-2 rounded bg-destructive/10 text-destructive text-xs">
                      <Badge variant="destructive" className="text-[9px] shrink-0">{ea.type}</Badge>
                      <span>{ea.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {mod.knowledgeChecks.length > 0 && (
              <div>
                <h4 className="font-semibold text-muted-foreground mb-1">Knowledge Checks</h4>
                {mod.knowledgeChecks.map((kc) => (
                  <div key={kc.id} className="mb-2 p-2 border rounded text-xs">
                    <p className="font-medium mb-1">{kc.question}</p>
                    {kc.options.map((opt, i) => (
                      <p key={i} className={i === kc.correctIndex ? "text-green-600 dark:text-green-400 font-medium" : ""}>
                        {String.fromCharCode(65 + i)}. {opt}
                      </p>
                    ))}
                    <p className="mt-1 text-muted-foreground italic">{kc.explanation}</p>
                  </div>
                ))}
              </div>
            )}
            {mod.discussionPrompt && <Section title="Discussion Prompt" content={mod.discussionPrompt} />}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  if (!content) return null;
  return (
    <div>
      <h4 className="font-semibold text-muted-foreground mb-1">{title}</h4>
      <p className="whitespace-pre-line">{content}</p>
    </div>
  );
}

function QuestionCard({ q }: { q: ExamQuestion }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4 text-sm space-y-2">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <Badge variant="secondary" className="text-[10px]">{q.difficulty}</Badge>
          {q.examTrap && <Badge variant="destructive" className="text-[10px]">Exam Trap</Badge>}
          {q.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
        </div>
        <p className="font-medium">{q.question}</p>
        {q.options.map((opt, i) => (
          <p key={i} className={i === q.correctIndex ? "text-green-600 dark:text-green-400 font-medium" : ""}>
            {String.fromCharCode(65 + i)}. {opt}
          </p>
        ))}
        <div className="pt-1 border-t mt-2 space-y-1 text-xs text-muted-foreground">
          <p><span className="font-medium">Explanation:</span> {q.explanation}</p>
          {q.wrongExplanations.map((we, i) => {
            const idx = i >= q.correctIndex ? i + 1 : i;
            return <p key={i}><span className="font-medium">Why not {String.fromCharCode(65 + idx)}:</span> {we}</p>;
          })}
          {q.examTrapNote && <p className="text-destructive"><span className="font-medium">Trap note:</span> {q.examTrapNote}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityCard({ a }: { a: Activity }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4 text-sm space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">{a.title}</span>
          <Badge variant="secondary" className="text-[10px]">{a.type}</Badge>
          {a.weekNumber && <Badge variant="outline" className="text-[10px]">Week {a.weekNumber}</Badge>}
        </div>
        <p>{a.description}</p>
        {a.instructorNotes && (
          <div>
            <h4 className="font-semibold text-muted-foreground text-xs mb-0.5">Instructor Notes</h4>
            <p className="text-xs">{a.instructorNotes}</p>
          </div>
        )}
        {a.debriefPrompts.length > 0 && (
          <div>
            <h4 className="font-semibold text-muted-foreground text-xs mb-0.5">Debrief Prompts</h4>
            <ul className="list-disc list-inside text-xs">
              {a.debriefPrompts.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatuteCard({ s }: { s: StatuteSection }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{s.sectionNumber}</span>
          <Badge variant="outline" className="text-[10px]">{s.category}</Badge>
        </div>
        <p className="font-medium text-muted-foreground">{s.title}</p>
        <p className="whitespace-pre-line text-xs">{s.text}</p>
        {s.referencedBy.length > 0 && (
          <p className="text-xs text-muted-foreground">Referenced by: {s.referencedBy.join(", ")}</p>
        )}
      </CardContent>
    </Card>
  );
}

function SourceTab({ data, label }: { data: SourceData; label: string }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {data.modules.length} Modules · {data.examQuestions.length} Questions · {data.activities.length} Activities
      </p>
      {data.modules.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 font-semibold text-sm mb-2">
            <ChevronDown className="h-4 w-4" /> Modules ({data.modules.length})
          </CollapsibleTrigger>
          <CollapsibleContent>
            {data.modules.map((m) => <ModuleCard key={m.id} mod={m} />)}
          </CollapsibleContent>
        </Collapsible>
      )}
      {data.examQuestions.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 font-semibold text-sm mb-2">
            <ChevronDown className="h-4 w-4" /> Exam Questions ({data.examQuestions.length})
          </CollapsibleTrigger>
          <CollapsibleContent>
            {data.examQuestions.map((q) => <QuestionCard key={q.id} q={q} />)}
          </CollapsibleContent>
        </Collapsible>
      )}
      {data.activities.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 font-semibold text-sm mb-2">
            <ChevronDown className="h-4 w-4" /> Activities ({data.activities.length})
          </CollapsibleTrigger>
          <CollapsibleContent>
            {data.activities.map((a) => <ActivityCard key={a.id} a={a} />)}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

export default function SourceViewer() {
  const [search, setSearch] = useState("");

  const ceShop = useMemo(() => filterSource({
    modules: getCEShopModules(),
    examQuestions: getCEShopExamQuestions(),
    activities: getCEShopActivities(),
  }, search), [search]);

  const pearsonVue = useMemo(() => filterSource({
    modules: getPearsonVueModules(),
    examQuestions: getPearsonVueExamQuestions(),
    activities: getPearsonVueActivities(),
  }, search), [search]);

  const lectureNotes = useMemo(() => filterSource({
    modules: getLectureNotesModules(),
    examQuestions: getLectureNotesExamQuestions(),
    activities: getLectureNotesActivities(),
  }, search), [search]);

  const nrsSections = useMemo(() => {
    const all = getNRS645Sections();
    if (!search) return all;
    return all.filter(
      (s) => matchesSearch(s.sectionNumber, search) || matchesSearch(s.title, search) || matchesSearch(s.text, search)
    );
  }, [search]);

  const nrsGrouped = useMemo(() => {
    const groups: Record<string, StatuteSection[]> = {};
    nrsSections.forEach((s) => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, [nrsSections]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Source Viewer</h1>
        <p className="text-sm text-muted-foreground">Browse all hardcoded content exactly as it exists in the data files.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search modules, key terms, questions, activities…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="ce-shop">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="ce-shop">CE Shop</TabsTrigger>
          <TabsTrigger value="pearson-vue">Pearson VUE</TabsTrigger>
          <TabsTrigger value="lecture-notes">Lecture Notes</TabsTrigger>
          <TabsTrigger value="nrs-645">NRS 645</TabsTrigger>
        </TabsList>

        <TabsContent value="ce-shop">
          <SourceTab data={ceShop} label="CE Shop" />
        </TabsContent>
        <TabsContent value="pearson-vue">
          <SourceTab data={pearsonVue} label="Pearson VUE" />
        </TabsContent>
        <TabsContent value="lecture-notes">
          <SourceTab data={lectureNotes} label="Lecture Notes" />
        </TabsContent>
        <TabsContent value="nrs-645">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{nrsSections.length} Statute Sections</p>
            {Object.entries(nrsGrouped).map(([cat, sections]) => (
              <Collapsible key={cat} defaultOpen>
                <CollapsibleTrigger className="flex items-center gap-2 font-semibold text-sm mb-2">
                  <ChevronDown className="h-4 w-4" /> {cat} ({sections.length})
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {sections.map((s) => <StatuteCard key={s.id} s={s} />)}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
