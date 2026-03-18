import { useState, useMemo } from "react";
import { Library, BookOpen, Scale, Search, ClipboardCheck, Gamepad2, X, AlertTriangle, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/contexts/CourseContext";
import { SourceAuthority } from "@/types/course";
import { AuthorityBadge } from "@/components/AuthorityBadge";
import { detectConflicts, getAuthorityRank, AUTHORITY_COLORS } from "@/lib/authority-utils";

const ALL_SOURCES: SourceAuthority[] = ["NRS/NAC", "Pearson VUE", "CE Shop", "Lecture Notes", "Textbook"];

export default function ContentLibrary() {
  const { data } = useCourse();
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [weekFilter, setWeekFilter] = useState<string>("all");
  const [sortByAuth, setSortByAuth] = useState(false);

  const lowerSearch = search.toLowerCase();

  const conflicts = useMemo(() => detectConflicts(data.modules), [data.modules]);

  const filteredModules = useMemo(() => {
    let result = data.modules.filter((m) => {
      if (sourceFilter !== "all" && m.sourceTag !== sourceFilter) return false;
      if (weekFilter !== "all" && m.weekNumber !== Number(weekFilter)) return false;
      if (lowerSearch && !m.title.toLowerCase().includes(lowerSearch) && !m.conceptExplanation.toLowerCase().includes(lowerSearch) && !m.keyTerms.some((kt) => kt.term.toLowerCase().includes(lowerSearch))) return false;
      return true;
    });
    if (sortByAuth) {
      result = [...result].sort((a, b) => getAuthorityRank(a.sourceTag) - getAuthorityRank(b.sourceTag));
    }
    return result;
  }, [data.modules, sourceFilter, weekFilter, lowerSearch, sortByAuth]);

  const filteredQuestions = useMemo(() => {
    let result = data.examQuestions.filter((q) => {
      if (sourceFilter !== "all" && q.source !== sourceFilter) return false;
      if (lowerSearch && !q.question.toLowerCase().includes(lowerSearch) && !q.topic.toLowerCase().includes(lowerSearch) && !q.tags.some((t) => t.toLowerCase().includes(lowerSearch))) return false;
      return true;
    });
    if (sortByAuth) {
      result = [...result].sort((a, b) => getAuthorityRank(a.source) - getAuthorityRank(b.source));
    }
    return result;
  }, [data.examQuestions, sourceFilter, lowerSearch, sortByAuth]);

  const filteredActivities = useMemo(() => {
    return data.activities.filter((a) => {
      if (weekFilter !== "all" && a.weekNumber !== Number(weekFilter)) return false;
      if (lowerSearch && !a.title.toLowerCase().includes(lowerSearch) && !a.topic.toLowerCase().includes(lowerSearch) && !a.description.toLowerCase().includes(lowerSearch) && !a.tags.some((t) => t.toLowerCase().includes(lowerSearch))) return false;
      return true;
    });
  }, [data.activities, weekFilter, lowerSearch]);

  const totalContent = data.modules.length + data.examQuestions.length + data.activities.length;
  const totalFiltered = filteredModules.length + filteredQuestions.length + filteredActivities.length;
  const correctedCount = data.modules.filter((m) => m.correctsTextbook).length;

  const sourceCounts = data.modules.reduce(
    (acc, m) => ({ ...acc, [m.sourceTag]: (acc[m.sourceTag] || 0) + 1 }),
    {} as Record<string, number>
  );

  const hasFilters = search !== "" || sourceFilter !== "all" || weekFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setSourceFilter("all");
    setWeekFilter("all");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
        <p className="text-muted-foreground mt-1">
          All content tagged by source authority and legal jurisdiction
        </p>
      </div>

      {/* Source Authority Legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Source Authority Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {ALL_SOURCES.map((source, i) => {
              const style = AUTHORITY_COLORS[source];
              return (
                <div key={source} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-mono">{i + 1}.</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}>
                    {source}
                    {source === "Textbook" && <span className="opacity-70 ml-0.5">· Supplemental</span>}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({sourceCounts[source] || 0})
                  </span>
                </div>
              );
            })}
          </div>
          {correctedCount > 0 && (
            <p className="mt-3 text-sm text-destructive flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {correctedCount} module(s) correct outdated textbook material
            </p>
          )}
        </CardContent>
      </Card>

      {/* Conflict Banner */}
      {conflicts.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-destructive">
                  {conflicts.length} topic{conflicts.length !== 1 ? "s" : ""} with supplemental textbook content alongside higher-authority sources
                </p>
                <ul className="mt-2 space-y-1">
                  {conflicts.slice(0, 5).map((c) => (
                    <li key={c.textbookModule.id} className="text-xs text-muted-foreground">
                      <span className="font-medium">{c.topic}</span>: textbook module "{c.textbookModule.title}" overlaps with {c.higherAuthorityModules.length} higher-authority module(s)
                    </li>
                  ))}
                  {conflicts.length > 5 && (
                    <li className="text-xs text-muted-foreground italic">
                      …and {conflicts.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, topic, term, or tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Sources</SelectItem>
            {ALL_SOURCES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={weekFilter} onValueChange={setWeekFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Week" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Weeks</SelectItem>
            {data.weeks.map((w) => (
              <SelectItem key={w.number} value={String(w.number)}>Week {w.number}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={sortByAuth ? "default" : "outline"}
          size="icon"
          onClick={() => setSortByAuth(!sortByAuth)}
          title="Sort by authority level"
          className="shrink-0"
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
        {hasFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {hasFilters && (
        <p className="text-sm text-muted-foreground">
          Showing {totalFiltered} of {totalContent} items
        </p>
      )}

      {/* Content Tabs */}
      {totalContent === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Library className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              Content will appear here as you create modules, questions, and activities.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="modules">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="modules">
              Modules ({filteredModules.length})
            </TabsTrigger>
            <TabsTrigger value="questions">
              Questions ({filteredQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="activities">
              Activities ({filteredActivities.length})
            </TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="mt-4 space-y-3">
            {filteredModules.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No modules match your filters</p>
            ) : (
              filteredModules.map((module) => (
                <Card key={module.id} className="hover:border-accent transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{module.title}</CardTitle>
                      <div className="flex gap-2 flex-wrap justify-end items-center">
                        <AuthorityBadge source={module.sourceTag} correctsTextbook={module.correctsTextbook} />
                        <Badge variant="outline">
                          {module.federalVsNevada === "both"
                            ? "Federal + NV"
                            : module.federalVsNevada === "federal"
                            ? "Federal"
                            : "Nevada"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-muted-foreground">
                      Week {module.weekNumber} · {module.keyTerms.length} terms · {module.knowledgeChecks.length} questions · {module.examAlerts.length} alerts
                    </span>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="mt-4 space-y-3">
            {filteredQuestions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No questions match your filters</p>
            ) : (
              filteredQuestions.map((q) => (
                <Card key={q.id} className="hover:border-accent transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-sm font-medium line-clamp-2">{q.question}</CardTitle>
                      <div className="flex gap-2 shrink-0 items-center">
                        <Badge variant="outline">{q.difficulty}</Badge>
                        <AuthorityBadge source={q.source} compact />
                        {q.examTrap && <Badge variant="destructive">Trap</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 flex-wrap">
                      <ClipboardCheck className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{q.topic}</span>
                      <span className="text-muted-foreground">·</span>
                      {q.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-4 space-y-3">
            {filteredActivities.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No activities match your filters</p>
            ) : (
              filteredActivities.map((a) => (
                <Card key={a.id} className="hover:border-accent transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">{a.title}</CardTitle>
                      <Badge variant="outline" className="capitalize shrink-0">{a.type.replace("-", " ")}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{a.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Gamepad2 className="h-3.5 w-3.5 text-muted-foreground" />
                      {a.weekNumber && <span className="text-sm text-muted-foreground">Week {a.weekNumber}</span>}
                      {a.topic && (
                        <>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-sm text-muted-foreground">{a.topic}</span>
                        </>
                      )}
                      {a.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
