// Cross-reference detection: scans content for NRS/NAC citations and compares against statute text
import type { Module, ExamQuestion, Activity, StatuteSection } from "@/types/course";

export interface CrossReferenceResult {
  statuteId: string;
  sectionNumber: string;
  contentId: string;
  contentType: "module" | "exam-question" | "activity";
  contentTitle: string;
  contentClaim: string;
  statuteText: string;
  source: string;
  status: "verified" | "review";
}

// Extract all text fields from a module that might contain NRS references
function getModuleText(m: Module): string {
  return [
    m.conceptExplanation,
    m.nevadaLegalRefs,
    m.realWorldScenario,
    m.commonMistakes,
    m.examKeyPoints,
    ...m.keyTerms.map((kt) => `${kt.term}: ${kt.definition}`),
    ...m.examAlerts.map((ea) => ea.text),
    ...m.knowledgeChecks.map((kc) => `${kc.question} ${kc.explanation}`),
  ].join("\n");
}

function getExamQuestionText(q: ExamQuestion): string {
  return [q.question, q.explanation, ...q.wrongExplanations, ...q.options].join("\n");
}

function getActivityText(a: Activity): string {
  return [a.description, a.instructorNotes, ...a.debriefPrompts].join("\n");
}

// Find NRS/NAC section references in a text string
const NRS_PATTERN = /(?:NRS|NAC)\s+(\d+[A-Z]?)\.(\d+[A-Za-z]*)/gi;

function findCitations(text: string): string[] {
  const matches = new Set<string>();
  let match;
  const regex = new RegExp(NRS_PATTERN.source, "gi");
  while ((match = regex.exec(text)) !== null) {
    const prefix = match[0].startsWith("NAC") ? "NAC" : "NRS";
    matches.add(`${prefix} ${match[1]}.${match[2]}`);
  }
  return Array.from(matches);
}

// Normalize section numbers for matching (e.g. "645.252" matches "NRS 645.252")
function normalizeSection(s: string): string {
  return s.replace(/\s+/g, " ").trim().toUpperCase();
}

// Extract the sentence(s) containing a citation from the content text
function extractClaim(text: string, citation: string): string {
  const lines = text.split(/[.\n]/);
  const matching = lines.filter((line) =>
    line.toUpperCase().includes(citation.toUpperCase().replace("NRS ", "").replace("NAC ", ""))
  );
  if (matching.length > 0) {
    return matching.slice(0, 2).map((l) => l.trim()).join(". ").substring(0, 500);
  }
  return `References ${citation}`;
}

// Determine status based on whether content claims align with statute
// This is a conservative heuristic — it flags for review when sources differ from NRS/NAC
function determineStatus(source: string): "verified" | "review" {
  if (source === "NRS/NAC") return "verified";
  // Lecture Notes, Textbook, CE Shop, Pearson VUE — flag for review
  return "review";
}

export function runCrossReference(
  modules: Module[],
  examQuestions: ExamQuestion[],
  activities: Activity[],
  statutes: StatuteSection[]
): CrossReferenceResult[] {
  const results: CrossReferenceResult[] = [];
  const statuteMap = new Map<string, StatuteSection>();

  for (const s of statutes) {
    statuteMap.set(normalizeSection(s.sectionNumber), s);
  }

  // Scan modules
  for (const m of modules) {
    const text = getModuleText(m);
    const citations = findCitations(text);
    for (const citation of citations) {
      const normalized = normalizeSection(citation);
      const statute = statuteMap.get(normalized);
      if (statute) {
        results.push({
          statuteId: statute.id,
          sectionNumber: statute.sectionNumber,
          contentId: m.id,
          contentType: "module",
          contentTitle: m.title,
          contentClaim: extractClaim(text, citation),
          statuteText: statute.text,
          source: m.sourceTag,
          status: determineStatus(m.sourceTag),
        });
      }
    }
  }

  // Scan exam questions
  for (const q of examQuestions) {
    const text = getExamQuestionText(q);
    const citations = findCitations(text);
    for (const citation of citations) {
      const normalized = normalizeSection(citation);
      const statute = statuteMap.get(normalized);
      if (statute) {
        results.push({
          statuteId: statute.id,
          sectionNumber: statute.sectionNumber,
          contentId: q.id,
          contentType: "exam-question",
          contentTitle: `${q.topic}: ${q.question.substring(0, 60)}...`,
          contentClaim: extractClaim(text, citation),
          statuteText: statute.text,
          source: q.source,
          status: determineStatus(q.source),
        });
      }
    }
  }

  // Scan activities
  for (const a of activities) {
    const text = getActivityText(a);
    const citations = findCitations(text);
    for (const citation of citations) {
      const normalized = normalizeSection(citation);
      const statute = statuteMap.get(normalized);
      if (statute) {
        results.push({
          statuteId: statute.id,
          sectionNumber: statute.sectionNumber,
          contentId: a.id,
          contentType: "activity",
          contentTitle: a.title,
          contentClaim: extractClaim(text, citation),
          statuteText: statute.text,
          source: "Activity",
          status: "review",
        });
      }
    }
  }

  return results;
}
