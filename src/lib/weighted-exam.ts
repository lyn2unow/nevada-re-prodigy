// Weighted practice exam generator — distributes questions proportionally to Pearson VUE area weights
import type { ExamQuestion, PearsonVueArea } from "@/types/course";
import { PEARSON_VUE_WEIGHTS } from "@/data/pearson-vue-mappings";
import { getQuestionArea } from "@/data/pearson-vue-mappings";

interface WeightedExamOptions {
  totalQuestions: number;
  /** If true, only national areas. If false, only state. If undefined, both. */
  portion?: "national" | "state";
}

export interface AreaAllocation {
  area: PearsonVueArea;
  target: number;
  available: number;
  selected: number;
}

/**
 * Auto-select questions proportionally to Pearson VUE area weights.
 * Returns selected question IDs and a breakdown of how many were drawn from each area.
 */
export function generateWeightedExam(
  allQuestions: ExamQuestion[],
  options: WeightedExamOptions
): { questionIds: string[]; allocations: AreaAllocation[] } {
  const { totalQuestions, portion } = options;

  // Filter weights by portion
  const weights = PEARSON_VUE_WEIGHTS.filter((w) => {
    if (portion === "national") return w.nationalItems > 0;
    if (portion === "state") return w.stateItems > 0;
    return true;
  });

  const totalWeight = weights.reduce((s, w) => s + w.weight, 0);

  // Group questions by area
  const byArea = new Map<PearsonVueArea, ExamQuestion[]>();
  for (const q of allQuestions) {
    const area = q.pearsonVueArea ?? getQuestionArea(q.id);
    if (!area) continue;
    if (!byArea.has(area)) byArea.set(area, []);
    byArea.get(area)!.push(q);
  }

  // Calculate target counts per area (proportional)
  const allocations: AreaAllocation[] = weights.map((w) => {
    const target = Math.round((w.weight / totalWeight) * totalQuestions);
    const available = byArea.get(w.area)?.length ?? 0;
    return { area: w.area, target, available, selected: 0 };
  });

  // Adjust rounding: ensure sum equals totalQuestions
  let sum = allocations.reduce((s, a) => s + a.target, 0);
  // Sort by largest remainder for fair adjustment
  if (sum !== totalQuestions) {
    const sorted = [...allocations].sort((a, b) => b.target - a.target);
    let diff = totalQuestions - sum;
    for (const a of sorted) {
      if (diff === 0) break;
      if (diff > 0) { a.target++; diff--; }
      else if (a.target > 0) { a.target--; diff++; }
    }
  }

  // Select questions per area (random shuffle, cap at available)
  const selectedIds: string[] = [];
  const leftover: ExamQuestion[] = [];

  for (const alloc of allocations) {
    const pool = byArea.get(alloc.area) ?? [];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const pick = Math.min(alloc.target, shuffled.length);
    alloc.selected = pick;
    for (let i = 0; i < pick; i++) selectedIds.push(shuffled[i].id);
    // Track overflow for redistribution
    if (pick < alloc.target) {
      // We need more questions — will fill from leftover pass
    }
    for (let i = pick; i < shuffled.length; i++) leftover.push(shuffled[i]);
  }

  // Fill shortfall from leftover questions
  const shortfall = totalQuestions - selectedIds.length;
  if (shortfall > 0) {
    const shuffledLeftover = leftover
      .filter((q) => !selectedIds.includes(q.id))
      .sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(shortfall, shuffledLeftover.length); i++) {
      selectedIds.push(shuffledLeftover[i].id);
    }
  }

  // Shuffle final order
  selectedIds.sort(() => Math.random() - 0.5);

  return { questionIds: selectedIds, allocations };
}
