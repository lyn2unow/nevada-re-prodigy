import type { SourceAuthority, Module, ExamQuestion } from "@/types/course";

/** Authority rank: lower number = higher authority */
export const AUTHORITY_RANK: Record<SourceAuthority, number> = {
  "NRS/NAC": 1,
  "Pearson VUE": 2,
  "CE Shop": 3,
  "Lecture Notes": 4,
  "Textbook": 5,
};

export const AUTHORITY_COLORS: Record<SourceAuthority, { bg: string; text: string; label: string }> = {
  "NRS/NAC":      { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-800 dark:text-amber-300", label: "Primary Law" },
  "Pearson VUE":  { bg: "bg-blue-100 dark:bg-blue-900/30",   text: "text-blue-800 dark:text-blue-300",   label: "Exam Standard" },
  "CE Shop":      { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-800 dark:text-emerald-300", label: "CE Provider" },
  "Lecture Notes": { bg: "bg-slate-100 dark:bg-slate-800/50", text: "text-slate-600 dark:text-slate-400", label: "Instructor" },
  "Textbook":     { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-800 dark:text-orange-300", label: "Supplemental" },
};

export function getAuthorityRank(source: SourceAuthority): number {
  return AUTHORITY_RANK[source] ?? 99;
}

export function sortByAuthority<T extends { sourceTag?: SourceAuthority; source?: SourceAuthority }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const rankA = getAuthorityRank((a.sourceTag ?? a.source) as SourceAuthority);
    const rankB = getAuthorityRank((b.sourceTag ?? b.source) as SourceAuthority);
    return rankA - rankB;
  });
}

export interface Conflict {
  topic: string;
  textbookModule: Module;
  higherAuthorityModules: Module[];
}

/**
 * Detect topics where a textbook-sourced module coexists with a higher-authority module.
 * Groups by Pearson VUE area first, then by week number as fallback.
 */
export function detectConflicts(modules: Module[]): Conflict[] {
  const conflicts: Conflict[] = [];
  const textbookModules = modules.filter((m) => m.sourceTag === "Textbook");
  const higherModules = modules.filter((m) => m.sourceTag !== "Textbook");

  for (const tbMod of textbookModules) {
    const matchKey = tbMod.pearsonVueArea ?? `week-${tbMod.weekNumber}`;
    const overlapping = higherModules.filter((hm) => {
      const hmKey = hm.pearsonVueArea ?? `week-${hm.weekNumber}`;
      return hmKey === matchKey;
    });

    if (overlapping.length > 0) {
      conflicts.push({
        topic: tbMod.pearsonVueArea ?? `Week ${tbMod.weekNumber}: ${tbMod.title}`,
        textbookModule: tbMod,
        higherAuthorityModules: overlapping,
      });
    }
  }

  return conflicts;
}
