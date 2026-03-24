import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Presentation, Copy, Loader2, Sparkles, BookOpen, Save, Trash2, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { exportLectureAsSlides } from "@/lib/lecture-slides-export";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const TOPICS = [
  "Property Ownership & Transfer",
  "Land Use Controls & Regulations",
  "Valuation & Market Analysis (CMA & Appraisal)",
  "Real Estate Financing & Lending",
  "Agency Law & Fiduciary Duties",
  "Property Disclosures (NRS 113, NRS 645)",
  "Contracts: Listing, Purchase & Lease Agreements",
  "Leasing & Property Management",
  "Fair Housing (Federal & Nevada)",
  "Closing Procedures & Settlement Statements",
  "Nevada Licensing Requirements (NRS 645, NAC 645)",
  "Nevada Real Estate Commission: Duties & Powers",
  "Nevada Brokerage Operations",
  "Nevada Disciplinary Actions & Recovery Fund",
  "Ethics & Professional Conduct",
];

const DURATIONS = [15, 30, 45, 60, 75, 90, 105, 120];

const SESSION_OPTIONS: Array<{
  id: string;
  label: string;
  week: number;
  date: string;
  sessionTitle: string;
  topics: string[];
}> = [
  {
    id: "w1-tue",
    label: "Week 1 · Tue Mar 31 — Nevada Licensing & NRED Commission",
    week: 1, date: "Tue Mar 31",
    sessionTitle: "Nevada Licensing Requirements & Duties/Powers of NRED",
    topics: ["Nevada Licensing Requirements (NRS 645, NAC 645)", "Nevada Real Estate Commission: Duties & Powers"],
  },
  {
    id: "w1-thu",
    label: "Week 1 · Thu Apr 2 — Agency: Fiduciary Duties & Disclosures",
    week: 1, date: "Thu Apr 2",
    sessionTitle: "Agency: Nevada-Specific Rules, Fiduciary Duties & Disclosure Requirements",
    topics: ["Agency Law & Fiduciary Duties", "Property Disclosures (NRS 113, NRS 645)"],
  },
  {
    id: "w2-tue",
    label: "Week 2 · Tue Apr 7 — Agency Deep Dive & Compensation",
    week: 2, date: "Tue Apr 7",
    sessionTitle: "Agency Deep Dive: Termination, Compensation Rules & Common Violations",
    topics: ["Agency Law & Fiduciary Duties", "Nevada Brokerage Operations"],
  },
  {
    id: "w2-thu",
    label: "Week 2 · Thu Apr 9 — Nevada Disclosures",
    week: 2, date: "Thu Apr 9",
    sessionTitle: "Nevada Disclosures: SRPD, Residential Disclosure Guide, CIC & Licensee as Principal",
    topics: ["Property Disclosures (NRS 113, NRS 645)"],
  },
  {
    id: "w3-tue",
    label: "Week 3 · Tue Apr 14 — Appraisal & Environmental Disclosures",
    week: 3, date: "Tue Apr 14",
    sessionTitle: "Property Value & Appraisal Approaches + Environmental Disclosures",
    topics: ["Valuation & Market Analysis (CMA & Appraisal)"],
  },
  {
    id: "w3-thu",
    label: "Week 3 · Thu Apr 16 — Property Characteristics, Legal Descriptions & Title",
    week: 3, date: "Thu Apr 16",
    sessionTitle: "Property Characteristics, Legal Descriptions, Forms of Ownership & Title",
    topics: ["Property Ownership & Transfer"],
  },
  {
    id: "w4-tue",
    label: "Week 4 · Tue Apr 21 — Contracts & Agency National Overlap",
    week: 4, date: "Tue Apr 21",
    sessionTitle: "Real Estate Contracts & Agency — National Overlap Deep Dive",
    topics: ["Contracts: Listing, Purchase & Lease Agreements", "Agency Law & Fiduciary Duties"],
  },
  {
    id: "w4-tue2",
    label: "Week 4 · Tue Apr 28 — Nevada Property Management",
    week: 4, date: "Tue Apr 28",
    sessionTitle: "Nevada Property Management: PM Agreements, Lease Types, Trust Funds & NRED Rules",
    topics: ["Leasing & Property Management"],
  },
  {
    id: "w5-thu",
    label: "Week 5 · Thu Apr 30 — Mortgage Types, Financing & Real Estate Math",
    week: 5, date: "Thu Apr 30",
    sessionTitle: "Mortgage Types, Financing Concepts, Settlement & Real Estate Math",
    topics: ["Real Estate Financing & Lending"],
  },
  {
    id: "w5-tue",
    label: "Week 5 · Tue May 5 — Nevada Contracts I",
    week: 5, date: "Tue May 5",
    sessionTitle: "Nevada Contracts I: Brokerage & Listing Agreements, Advance Fees & Earnest Money",
    topics: ["Contracts: Listing, Purchase & Lease Agreements"],
  },
  {
    id: "w6-thu",
    label: "Week 6 · Thu May 7 — Nevada Contracts II",
    week: 6, date: "Thu May 7",
    sessionTitle: "Nevada Contracts II: Purchase Agreements, Offers, Counteroffers & Settlement Statements",
    topics: ["Contracts: Listing, Purchase & Lease Agreements", "Closing Procedures & Settlement Statements"],
  },
  {
    id: "w6-tue",
    label: "Week 6 · Tue May 12 — Record Keeping, Ethics & Fair Housing",
    week: 6, date: "Tue May 12",
    sessionTitle: "Record Keeping + National Real Estate Practice, Ethics & Fair Housing",
    topics: ["Nevada Brokerage Operations", "Ethics & Professional Conduct", "Fair Housing (Federal & Nevada)"],
  },
  {
    id: "w7-thu",
    label: "Week 7 · Thu May 14 — Special Topics",
    week: 7, date: "Thu May 14",
    sessionTitle: "Special Topics: Water Rights, Solar Easements, Timeshares & Subdivisions",
    topics: ["Property Ownership & Transfer", "Land Use Controls & Regulations"],
  },
];

const STREAM_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-lecture`;

type SavedLecture = {
  id: string;
  title: string;
  content: string;
  topics: string[];
  week_label: string | null;
  duration_minutes: number | null;
  created_at: string | null;
};

export default function LectureGenerator() {
  const { user } = useAuth();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState("");
  const [customTopicEnabled, setCustomTopicEnabled] = useState(false);
  const [duration, setDuration] = useState("60");
  const [selectedSession, setSelectedSession] = useState<string>("none");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lectureTitle, setLectureTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedLectures, setSavedLectures] = useState<SavedLecture[]>([]);
  const [expandedLecture, setExpandedLecture] = useState<string | null>(null);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const { toast } = useToast();

  const loadSessionTopics = (sessionId: string) => {
    setSelectedSession(sessionId);
    if (sessionId === "none") return;
    const session = SESSION_OPTIONS.find(s => s.id === sessionId);
    if (session) {
      setSelectedTopics(session.topics);
      setLectureTitle(session.sessionTitle);
    }
  };

  const allTopics = [
    ...selectedTopics,
    ...(customTopic.trim() ? [customTopic.trim()] : []),
  ];

  const durationNum = parseInt(duration);
  const perTopicMinutes = allTopics.length > 0 ? Math.round(durationNum / allTopics.length) : 0;

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Load saved lectures
  useEffect(() => {
    if (!user) return;
    setLoadingSaved(true);
    supabase
      .from("saved_lectures")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSavedLectures(data || []);
        setLoadingSaved(false);
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) { toast({ title: "Sign in to save lectures", variant: "destructive" }); return; }
    if (!output) { toast({ title: "Generate a lecture first", variant: "destructive" }); return; }
    if (!lectureTitle.trim()) { toast({ title: "Enter a title before saving", variant: "destructive" }); return; }
    setIsSaving(true);
    const { data, error } = await supabase.from("saved_lectures").insert({
      user_id: user.id,
      title: lectureTitle.trim(),
      content: output,
      topics: allTopics,
      week_label: selectedWeek !== "none" ? WEEK_LABELS[Number(selectedWeek)] : null,
      duration_minutes: durationNum,
    }).select().single();
    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" });
    } else if (data) {
      setSavedLectures((prev) => [data, ...prev]);
      toast({ title: `"${lectureTitle.trim()}" saved!` });
      setLectureTitle("");
    }
    setIsSaving(false);
  };

  const handleDeleteLecture = async (id: string, title: string) => {
    await supabase.from("saved_lectures").delete().eq("id", id);
    setSavedLectures((prev) => prev.filter((l) => l.id !== id));
    toast({ title: `"${title}" deleted` });
  };

  const handleGenerate = useCallback(async () => {
    if (allTopics.length === 0) {
      toast({ title: "Select at least one topic", description: "Choose topics or enter a custom one.", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    setOutput("");

    try {
      const resp = await fetch(STREAM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ topics: allTopics, durationMinutes: durationNum }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Unknown error" }));
        toast({ title: "Generation failed", description: err.error || `Error ${resp.status}`, variant: "destructive" });
        setIsGenerating(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setOutput(accumulated);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setOutput(accumulated);
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e) {
      console.error("Stream error:", e);
      toast({ title: "Error", description: "Failed to generate lecture notes.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  }, [allTopics, durationNum, toast]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Lecture notes copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy to clipboard.", variant: "destructive" });
    }
  }, [output, toast]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-['Playfair_Display']">
          Lecture Generator
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered lecture notes aligned with TMCC objectives and NRS/NAC authority hierarchy
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Configuration
            </CardTitle>
            <CardDescription>Select topics and lecture duration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-accent" />
                Load Week's Topics
              </Label>
              <Select value={selectedWeek} onValueChange={loadWeekTopics}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a week..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Select a week...</SelectItem>
                  {Object.entries(WEEK_LABELS).map(([num, label]) => (
                    <SelectItem key={num} value={num}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Pre-selects topics for that class session — adjust as needed.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Topics</Label>
                  <p className="text-xs text-muted-foreground">Select one or more — time is divided proportionally</p>
                </div>
                {allTopics.length > 0 && (
                  <Badge variant="secondary">{allTopics.length} selected</Badge>
                )}
              </div>
              <ScrollArea className="h-[220px] w-full rounded-md border border-border p-2">
                <div className="space-y-1">
                  {TOPICS.map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        checked={selectedTopics.includes(t)}
                        onCheckedChange={() => toggleTopic(t)}
                      />
                      <span className="leading-tight">{t}</span>
                    </label>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <label className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 transition-colors">
                      <Checkbox
                        checked={customTopicEnabled}
                        onCheckedChange={(checked) => {
                          setCustomTopicEnabled(!!checked);
                          if (!checked) setCustomTopic("");
                        }}
                      />
                      <span className="leading-tight">Custom Topic…</span>
                    </label>
                    {customTopicEnabled && (
                      <Input
                        placeholder="Enter your custom topic..."
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        className="mt-1 ml-6 w-[calc(100%-1.5rem)]"
                      />
                    )}
                  </div>
                </div>
              </ScrollArea>
              {allTopics.length > 1 && (
                <p className="text-xs text-muted-foreground">
                  {allTopics.length} topics × {durationNum} min ≈ {perTopicMinutes} min each
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Lecture Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => (
                    <SelectItem key={d} value={d.toString()}>
                      {d} minutes ({d / 60 >= 1 ? `${Math.floor(d / 60)}h ${d % 60 ? `${d % 60}m` : ""}` : `${d}m`})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={isGenerating || allTopics.length === 0}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Presentation className="h-4 w-4" />
                  Generate Lecture
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
              <p className="font-medium">Source hierarchy used:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>NRS/NAC (ground truth)</li>
                <li>Pearson VUE (exam alignment)</li>
                <li>CE Shop</li>
                <li>Lecture Notes</li>
                <li>Textbook (supplemental)</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Generated Lecture Notes</CardTitle>
                <CardDescription>
                  {isGenerating
                    ? "Streaming..."
                    : output
                      ? allTopics.length > 1
                        ? `Covering: ${allTopics.join(", ")}`
                        : "Ready — copy and use"
                      : "Notes will appear here"}
                </CardDescription>
              </div>
              {output && !isGenerating && (
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              )}
            </div>
            {/* Save section */}
            {output && !isGenerating && user && (
              <div className="flex items-center gap-2 pt-2">
                <Input
                  placeholder="e.g., Week 1 — Agency & Licensing"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSave} disabled={isSaving || !lectureTitle.trim()} size="sm">
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full rounded-md border border-border bg-muted/30 p-4">
              {output ? (
                <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-['Source_Sans_3']">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-20">
                  <Presentation className="h-12 w-12 mb-4 opacity-30" />
                  <p className="text-sm">Select topics and duration, then click Generate</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Saved Lectures */}
      {user && savedLectures.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground font-['Playfair_Display']">Saved Lectures</h2>
            <Badge variant="secondary">{savedLectures.length}</Badge>
          </div>
          <div className="grid gap-3">
            {savedLectures.map((lecture) => (
              <Card key={lecture.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <CardTitle className="text-base">{lecture.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {lecture.week_label && (
                          <Badge variant="outline" className="text-xs">{lecture.week_label}</Badge>
                        )}
                        {lecture.topics.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                        ))}
                        {lecture.duration_minutes && (
                          <span className="text-xs text-muted-foreground">{lecture.duration_minutes} min</span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {lecture.created_at ? new Date(lecture.created_at).toLocaleDateString() : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {expandedLecture === lecture.id && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Export as Slides PDF"
                            onClick={() => exportLectureAsSlides(lecture)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={async () => {
                              await navigator.clipboard.writeText(lecture.content);
                              toast({ title: "Copied to clipboard!" });
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedLecture(expandedLecture === lecture.id ? null : lecture.id)}
                      >
                        {expandedLecture === lecture.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLecture(lecture.id, lecture.title)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {expandedLecture === lecture.id && (
                  <CardContent className="pt-0">
                    <div className="h-[500px] w-full overflow-y-auto rounded-md border border-border bg-muted/30 p-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-['Source_Sans_3']">
                        {lecture.content}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
