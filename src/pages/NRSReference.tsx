import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scale, Search, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { useCourse } from "@/contexts/CourseContext";
import { runCrossReference, type CrossReferenceResult } from "@/lib/cross-reference";
import { supabase } from "@/integrations/supabase/client";

interface NRSUpdateResult {
  section: string;
  status: "changed" | "no_change" | "unknown";
  summary?: string;
  billNumber?: string;
  sourceUrl?: string;
  checkedAt: string;
}

const CATEGORIES = [
  "All",
  "Definitions",
  "Administration",
  "Regulation",
  "Advance Fees",
  "Licensing",
  "Continuing Education",
  "Property Management",
  "Discipline",
  "Recovery Fund",
  "Commercial Brokerage",
  "Other NRS",
  "NAC",
] as const;

export default function NRSReference() {
  const { data } = useCourse();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // NRS Update Checker state
  const [checkerSections, setCheckerSections] = useState<string[]>([]);
  const [checkerResults, setCheckerResults] = useState<NRSUpdateResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [checkerInitialized, setCheckerInitialized] = useState(false);

  const statutes = data.statuteSections ?? [];

  // Pre-populate checker sections with first 10 on first tab visit
  const initializeChecker = () => {
    if (!checkerInitialized && statutes.length > 0) {
      setCheckerSections(statutes.slice(0, 10).map((s) => s.sectionNumber));
      setCheckerInitialized(true);
    }
  };

  const filtered = useMemo(() => {
    return statutes.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesSearch =
        !search ||
        s.sectionNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.text.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [statutes, category, search]);

  const crossRefResults = useMemo(() => {
    if (statutes.length === 0) return [];
    return runCrossReference(data.modules, data.examQuestions, data.activities, statutes);
  }, [data.modules, data.examQuestions, data.activities, statutes]);

  const filteredCrossRef = useMemo(() => {
    return crossRefResults.filter((r) => {
      if (statusFilter === "review") return r.status === "review";
      if (statusFilter === "verified") return r.status === "verified";
      return true;
    });
  }, [crossRefResults, statusFilter]);

  const reviewCount = crossRefResults.filter((r) => r.status === "review").length;
  const verifiedCount = crossRefResults.filter((r) => r.status === "verified").length;

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getLegUrl = (sectionNumber: string) => {
    const match = sectionNumber.match(/NRS\s+(\d+)\.(\d+[A-Za-z]*)/);
    if (match) return `https://www.leg.state.nv.us/nrs/nrs-${match[1]}.html#NRS${match[1]}Sec${match[2]}`;
    return "https://www.leg.state.nv.us/nrs/nrs-645.html";
  };

  const toggleCheckerSection = (sectionNumber: string) => {
    setCheckerSections((prev) =>
      prev.includes(sectionNumber)
        ? prev.filter((s) => s !== sectionNumber)
        : [...prev, sectionNumber]
    );
  };

  const handleCheckUpdates = async () => {
    if (checkerSections.length === 0) return;
    setIsChecking(true);
    setCheckerResults([]);
    try {
      const { data: responseData, error } = await supabase.functions.invoke("check-nrs-updates", {
        body: { sections: checkerSections },
      });
      if (error) throw error;
      setCheckerResults(responseData?.results ?? []);
      setLastChecked(new Date().toLocaleString());
    } catch (err) {
      console.error("Check NRS updates error:", err);
    } finally {
      setIsChecking(false);
    }
  };

  if (statutes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Scale className="h-8 w-8 text-primary" />
            NRS 645 Reference
          </h1>
          <p className="text-muted-foreground mt-1">
            Scoped statutory reference for cross-referencing course content
          </p>
        </div>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-8 text-center space-y-3">
            <Scale className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-semibold">NRS 645 Reference Not Loaded</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Load the NRS 645 reference data from the Dashboard to enable statute lookup and automatic cross-referencing with your course content.
            </p>
            <Button onClick={() => window.location.href = "/"} variant="outline">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Scale className="h-8 w-8 text-primary" />
          NRS 645 Reference
        </h1>
        <p className="text-muted-foreground mt-1">
          {statutes.length} statute sections • {crossRefResults.length} cross-references found
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold">{statutes.length}</div>
            <div className="text-xs text-muted-foreground">Statute Sections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold">{crossRefResults.length}</div>
            <div className="text-xs text-muted-foreground">Cross-References</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold text-green-600">{verifiedCount}</div>
            <div className="text-xs text-muted-foreground">Verified (NRS/NAC source)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{reviewCount}</div>
            <div className="text-xs text-muted-foreground">Needs Review</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="statutes">
        <TabsList>
          <TabsTrigger value="statutes">Statute Reference</TabsTrigger>
          <TabsTrigger value="crossref">
            Cross-Reference Report
            {reviewCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">{reviewCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="checker" onClick={initializeChecker}>
            NRS Update Checker
          </TabsTrigger>
        </TabsList>

        {/* === STATUTE REFERENCE TAB === */}
        <TabsContent value="statutes" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search statutes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filtered.map((statute) => {
              const isExpanded = expandedIds.has(statute.id);
              const refs = crossRefResults.filter((r) => r.statuteId === statute.id);
              return (
                <Card key={statute.id} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors py-3"
                    onClick={() => toggleExpand(statute.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-sm font-mono">
                            {statute.sectionNumber}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {statute.category}
                          </Badge>
                          {refs.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {refs.length} ref{refs.length !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="mt-1">{statute.title}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={getLegUrl(statute.sectionNumber)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="pt-0 space-y-4">
                      <div className="bg-muted/50 rounded-md p-4 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {statute.text}
                      </div>
                      {refs.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Referenced By
                          </h4>
                          <div className="space-y-1">
                            {refs.map((ref, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                {ref.status === "verified" ? (
                                  <CheckCircle className="h-3.5 w-3.5 text-green-600 shrink-0" />
                                ) : (
                                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                )}
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {ref.contentType}
                                </Badge>
                                <span className="truncate">{ref.contentTitle}</span>
                                <Badge variant="secondary" className="text-xs shrink-0">
                                  {ref.source}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
            {filtered.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No statutes match your search.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* === CROSS-REFERENCE REPORT TAB === */}
        <TabsContent value="crossref" className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All ({crossRefResults.length})
            </Button>
            <Button
              variant={statusFilter === "review" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("review")}
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Needs Review ({reviewCount})
            </Button>
            <Button
              variant={statusFilter === "verified" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("verified")}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Verified ({verifiedCount})
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Items sourced from <strong>NRS/NAC</strong> are marked verified. Items from <strong>Lecture Notes</strong>, <strong>CE Shop</strong>, <strong>Textbook</strong>, or <strong>Pearson VUE</strong> are flagged for review — compare the content claim against the verbatim statute text below.
          </p>

          <div className="space-y-3">
            {filteredCrossRef.map((result, i) => (
              <Card key={`${result.contentId}-${result.statuteId}-${i}`} className={result.status === "review" ? "border-amber-500/30" : ""}>
                <CardContent className="py-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {result.status === "verified" ? (
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                      )}
                      <span className="font-mono text-sm font-semibold">{result.sectionNumber}</span>
                      <Badge variant="outline" className="text-xs">{result.contentType}</Badge>
                      <Badge variant="secondary" className="text-xs">{result.source}</Badge>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{result.contentTitle}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Content Claim</div>
                      <div className="text-sm bg-muted/50 rounded p-3 max-h-32 overflow-y-auto">
                        {result.contentClaim}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Verbatim Statute</div>
                      <div className="text-sm bg-primary/5 rounded p-3 font-mono max-h-32 overflow-y-auto">
                        {result.statuteText.substring(0, 300)}
                        {result.statuteText.length > 300 && "..."}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredCrossRef.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No cross-references match the current filter.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* === NRS UPDATE CHECKER TAB === */}
        <TabsContent value="checker" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    NRS Update Checker
                  </CardTitle>
                  <CardDescription>
                    Powered by Perplexity Sonar — checks Nevada Legislature for amendments to NRS 645 &amp; NAC 645 in the last 2 years
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Button
                    onClick={handleCheckUpdates}
                    disabled={isChecking || checkerSections.length === 0}
                  >
                    {isChecking ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    Check for Updates
                  </Button>
                  {lastChecked && (
                    <span className="text-xs text-muted-foreground">Last checked: {lastChecked}</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sections to check:</span>
                  <Badge variant="secondary">{checkerSections.length} selected</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCheckerSections(statutes.map((s) => s.sectionNumber))}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCheckerSections([])}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[220px] border rounded-md p-3">
                <div className="space-y-2">
                  {statutes.map((statute) => (
                    <label
                      key={statute.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
                    >
                      <Checkbox
                        checked={checkerSections.includes(statute.sectionNumber)}
                        onCheckedChange={() => toggleCheckerSection(statute.sectionNumber)}
                      />
                      <span className="text-sm font-mono">{statute.sectionNumber}</span>
                      <span className="text-sm text-muted-foreground truncate">— {statute.title}</span>
                    </label>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Results */}
          {checkerResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Results</h3>
              {checkerResults.map((result, i) => {
                const statute = statutes.find((s) => s.sectionNumber === result.section);
                const badgeVariant = result.status === "changed" ? "destructive" : result.status === "no_change" ? "default" : "secondary";
                const badgeLabel = result.status === "changed" ? "Change Found" : result.status === "no_change" ? "No Changes" : "Uncertain";
                const linkUrl = result.sourceUrl || getLegUrl(result.section);

                return (
                  <Card key={`${result.section}-${i}`} className={result.status === "changed" ? "border-amber-500/30" : ""}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm font-semibold">{result.section}</span>
                            <Badge variant={badgeVariant} className={
                              result.status === "changed" ? "bg-amber-500 hover:bg-amber-600" :
                              result.status === "no_change" ? "bg-green-600 hover:bg-green-700 text-white" : ""
                            }>
                              {badgeLabel}
                            </Badge>
                            {result.billNumber && (
                              <Badge variant="outline" className="text-xs">{result.billNumber}</Badge>
                            )}
                          </div>
                          {statute && (
                            <div className="text-sm text-muted-foreground">{statute.title}</div>
                          )}
                          {result.status === "changed" && result.summary && (
                            <p className="text-sm mt-2">{result.summary}</p>
                          )}
                        </div>
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Requires PERPLEXITY_API_KEY set in backend function secrets.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
