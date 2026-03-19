import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Presentation, Copy, Loader2, Sparkles } from "lucide-react";

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

const STREAM_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-lecture`;

export default function LectureGenerator() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState("");
  const [customTopicEnabled, setCustomTopicEnabled] = useState(false);
  const [duration, setDuration] = useState("60");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

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

      // Final flush
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
          <CardHeader className="flex flex-row items-center justify-between">
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
    </div>
  );
}
