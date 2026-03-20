// Course store - v3 with DB persistence
import { useState, useEffect, useCallback } from "react";
import type { CourseData, Module, ExamQuestion, Activity, PracticeExam, SyllabusTemplate } from "@/types/course";
import { toast } from "@/hooks/use-toast";
import { DEFAULT_WEEKS } from "@/types/course";
import { getSeedWeeks, getSeedModules, getSeedExamQuestions, getSeedActivities } from "@/data/seed-content";
import { getPearsonVueModules, getPearsonVueExamQuestions, getPearsonVueActivities } from "@/data/pearson-vue-content";
import { getCEShopModules, getCEShopExamQuestions, getCEShopActivities } from "@/data/ce-shop-content";
import { getLectureNotesModules, getLectureNotesExamQuestions, getLectureNotesActivities } from "@/data/lecture-notes-content";
import { getDefaultSyllabusTemplate } from "@/data/syllabus-template";
import { getNRS645Sections } from "@/data/nrs-reference";
import { getTextbookModules, getTextbookExamQuestions, getTextbookActivities } from "@/data/textbook-content";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "re103-course-data";

// ---------- Static seed data (read-only baseline) ----------

function getAllSeedModules(): Module[] {
  return [
    ...getSeedModules(),
    ...getPearsonVueModules(),
    ...getCEShopModules(),
    ...getLectureNotesModules(),
    ...getTextbookModules(),
  ];
}

function getAllSeedQuestions(): ExamQuestion[] {
  return [
    ...getSeedExamQuestions(),
    ...getPearsonVueExamQuestions(),
    ...getCEShopExamQuestions(),
    ...getLectureNotesExamQuestions(),
    ...getTextbookExamQuestions(),
  ];
}

function getAllSeedActivities(): Activity[] {
  return [
    ...getSeedActivities(),
    ...getPearsonVueActivities(),
    ...getCEShopActivities(),
    ...getLectureNotesActivities(),
    ...getTextbookActivities(),
  ];
}

// ---------- Merge helpers ----------

function mergeById<T extends { id: string }>(seed: T[], custom: T[]): T[] {
  const customIds = new Set(custom.map((c) => c.id));
  return [...seed.filter((s) => !customIds.has(s.id)), ...custom];
}

function buildWeeks(modules: Module[]): import("@/types/course").Week[] {
  const weeks = getSeedWeeks().length > 0 ? getSeedWeeks() : DEFAULT_WEEKS;
  return weeks.map((w) => ({
    ...w,
    moduleIds: modules.filter((m) => m.weekNumber === w.number).map((m) => m.id),
  }));
}

// ---------- DB operations ----------

async function fetchCustomModules(): Promise<Module[]> {
  const { data, error } = await supabase.from("custom_modules").select("data");
  if (error) { console.error("fetch modules:", error); return []; }
  return (data ?? []).map((r: any) => r.data as Module);
}

async function fetchCustomQuestions(): Promise<ExamQuestion[]> {
  const { data, error } = await supabase.from("custom_exam_questions").select("data");
  if (error) { console.error("fetch questions:", error); return []; }
  return (data ?? []).map((r: any) => r.data as ExamQuestion);
}

async function fetchCustomActivities(): Promise<Activity[]> {
  const { data, error } = await supabase.from("custom_activities").select("data");
  if (error) { console.error("fetch activities:", error); return []; }
  return (data ?? []).map((r: any) => r.data as Activity);
}

async function fetchCustomPracticeExams(): Promise<PracticeExam[]> {
  const { data, error } = await supabase.from("custom_practice_exams").select("data");
  if (error) { console.error("fetch practice exams:", error); return []; }
  return (data ?? []).map((r: any) => r.data as PracticeExam);
}

async function upsertModule(module: Module) {
  const { error } = await supabase.from("custom_modules").upsert({
    id: module.id,
    week_number: module.weekNumber,
    title: module.title,
    source_tag: module.sourceTag,
    data: module as any,
  });
  if (error) console.error("upsert module:", error);
  return error;
}

async function upsertQuestion(q: ExamQuestion) {
  const { error } = await supabase.from("custom_exam_questions").upsert({
    id: q.id,
    topic: q.topic,
    difficulty: q.difficulty,
    source: q.source,
    data: q as any,
  });
  if (error) console.error("upsert question:", error);
  return error;
}

async function upsertActivity(a: Activity) {
  const { error } = await supabase.from("custom_activities").upsert({
    id: a.id,
    title: a.title,
    type: a.type,
    data: a as any,
  });
  if (error) console.error("upsert activity:", error);
  return error;
}

async function upsertPracticeExam(pe: PracticeExam) {
  const { error } = await supabase.from("custom_practice_exams").upsert({
    id: pe.id,
    title: pe.title,
    question_ids: pe.questionIds as any,
    data: pe as any,
  });
  if (error) console.error("upsert practice exam:", error);
  return error;
}

async function dbDelete(table: string, id: string) {
  const { error } = await (supabase as any).from(table).delete().eq("id", id);
  if (error) console.error(`delete ${table}:`, error);
  return error;
}

// ---------- Settings persistence ----------

async function fetchSetting(key: string): Promise<any | undefined> {
  const { data, error } = await (supabase as any)
    .from("user_settings")
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (error) { console.error(`fetchSetting(${key}):`, error); return undefined; }
  return data?.data;
}

async function upsertSetting(key: string, value: any) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const { error } = await (supabase as any).from("user_settings").upsert(
    { key, data: value, updated_at: new Date().toISOString() },
    { onConflict: "key" }
  );
  return error;
}

// ---------- Hook ----------

export function useCourseStore() {
  const [dbLoading, setDbLoading] = useState(true);
  const [customModules, setCustomModules] = useState<Module[]>([]);
  const [customQuestions, setCustomQuestions] = useState<ExamQuestion[]>([]);
  const [customActivities, setCustomActivities] = useState<Activity[]>([]);
  const [customPracticeExams, setCustomPracticeExams] = useState<PracticeExam[]>([]);
  const [syllabusTemplate, setSyllabusTemplate] = useState<SyllabusTemplate | undefined>();
  const [statuteSections, setStatuteSections] = useState<import("@/types/course").StatuteSection[] | undefined>();

  // Fetch custom content + settings from DB — wait for auth before reading settings
  useEffect(() => {
    let cancelled = false;

    const loadData = async (session: any) => {
      const [mods, qs, acts, pes, syllabus, nrs645] = await Promise.all([
        fetchCustomModules(),
        fetchCustomQuestions(),
        fetchCustomActivities(),
        fetchCustomPracticeExams(),
        session ? fetchSetting("syllabus") : Promise.resolve(undefined),
        session ? fetchSetting("nrs645") : Promise.resolve(undefined),
      ]);
      if (!cancelled) {
        setCustomModules(mods);
        setCustomQuestions(qs);
        setCustomActivities(acts);
        setCustomPracticeExams(pes);
        if (syllabus) setSyllabusTemplate(syllabus as SyllabusTemplate);
        if (nrs645) setStatuteSections(nrs645 as import("@/types/course").StatuteSection[]);
        setDbLoading(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!cancelled) loadData(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!cancelled && ['SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED'].includes(event)) {
        loadData(session);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  // Merged data: seed + custom (custom wins on ID collision)
  const seedModules = getAllSeedModules();
  const seedQuestions = getAllSeedQuestions();
  const seedActivities = getAllSeedActivities();

  const allModules = mergeById(seedModules, customModules);
  const allQuestions = mergeById(seedQuestions, customQuestions);
  const allActivities = mergeById(seedActivities, customActivities);

  const data: CourseData = {
    weeks: buildWeeks(allModules),
    modules: allModules,
    examQuestions: allQuestions,
    practiceExams: customPracticeExams,
    activities: allActivities,
    syllabusTemplate,
    statuteSections,
  };

  // ---------- Mutation helpers (write to DB + update local state) ----------

  const addModule = useCallback(async (module: Module) => {
    setCustomModules((prev) => [...prev, module]);
    const err = await upsertModule(module);
    if (err) toast({ title: "Save failed", description: "Module saved locally only.", variant: "destructive" });
  }, []);

  const updateModule = useCallback(async (module: Module) => {
    setCustomModules((prev) => {
      const exists = prev.find((m) => m.id === module.id);
      return exists ? prev.map((m) => (m.id === module.id ? module : m)) : [...prev, module];
    });
    const err = await upsertModule(module);
    if (err) toast({ title: "Save failed", variant: "destructive" });
  }, []);

  const deleteModule = useCallback(async (id: string) => {
    setCustomModules((prev) => prev.filter((m) => m.id !== id));
    await dbDelete("custom_modules", id);
  }, []);

  const addExamQuestion = useCallback(async (q: ExamQuestion) => {
    setCustomQuestions((prev) => [...prev, q]);
    const err = await upsertQuestion(q);
    if (err) toast({ title: "Save failed", variant: "destructive" });
  }, []);

  const updateExamQuestion = useCallback(async (q: ExamQuestion) => {
    setCustomQuestions((prev) => {
      const exists = prev.find((eq) => eq.id === q.id);
      return exists ? prev.map((eq) => (eq.id === q.id ? q : eq)) : [...prev, q];
    });
    const err = await upsertQuestion(q);
    if (err) toast({ title: "Save failed", variant: "destructive" });
  }, []);

  const deleteExamQuestion = useCallback(async (id: string) => {
    setCustomQuestions((prev) => prev.filter((q) => q.id !== id));
    await dbDelete("custom_exam_questions", id);
  }, []);

  const addActivity = useCallback(async (a: Activity) => {
    setCustomActivities((prev) => [...prev, a]);
    const err = await upsertActivity(a);
    if (err) toast({ title: "Save failed", variant: "destructive" });
  }, []);

  const updateActivity = useCallback(async (a: Activity) => {
    setCustomActivities((prev) => {
      const exists = prev.find((act) => act.id === a.id);
      return exists ? prev.map((act) => (act.id === a.id ? a : act)) : [...prev, a];
    });
    const err = await upsertActivity(a);
    if (err) toast({ title: "Save failed", variant: "destructive" });
  }, []);

  const deleteActivity = useCallback(async (id: string) => {
    setCustomActivities((prev) => prev.filter((a) => a.id !== id));
    await dbDelete("custom_activities", id);
  }, []);

  const addPracticeExam = useCallback(async (pe: PracticeExam) => {
    setCustomPracticeExams((prev) => [...prev, pe]);
    const err = await upsertPracticeExam(pe);
    if (err) toast({ title: "Save failed", variant: "destructive" });
  }, []);

  const updateWeekTitle = useCallback((_weekNumber: number, _title: string) => {
    // Week titles are derived from seed data; no-op for now
  }, []);

  // Legacy loaders — now no-ops since seed data auto-merges
  const loadSeedContent = useCallback(() => {
    toast({ title: "Seed content loaded", description: "All seed data is automatically merged." });
  }, []);
  const loadPearsonVueContent = loadSeedContent;
  const loadCEShopContent = loadSeedContent;
  const loadLectureNotesContent = loadSeedContent;
  const loadTextbookContent = loadSeedContent;

  const loadNRS645 = useCallback(async () => {
    const sections = getNRS645Sections();
    setStatuteSections(sections);
    const err = await upsertSetting("nrs645", sections);
    if (err) toast({ title: "NRS save failed", variant: "destructive" });
  }, []);

  const updateSyllabus = useCallback(async (template: SyllabusTemplate) => {
    console.log("[course-store] updateSyllabus — BEFORE upsert, template keys:", Object.keys(template));
    setSyllabusTemplate(template);
    const err = await upsertSetting("syllabus", template);
    console.log("[course-store] updateSyllabus — AFTER upsert, error:", err);
    if (err) toast({ title: "Syllabus save failed", variant: "destructive" });
  }, []);

  const loadDefaultSyllabus = useCallback(async () => {
    const template = getDefaultSyllabusTemplate();
    setSyllabusTemplate(template);
    const err = await upsertSetting("syllabus", template);
    if (err) toast({ title: "Syllabus save failed", variant: "destructive" });
  }, []);

  const importData = useCallback((incoming: CourseData, mode: "replace" | "merge") => {
    // For import, treat all incoming as custom content
    if (mode === "replace") {
      setCustomModules(incoming.modules);
      setCustomQuestions(incoming.examQuestions);
      setCustomActivities(incoming.activities);
      setCustomPracticeExams(incoming.practiceExams);
    } else {
      setCustomModules((prev) => mergeById(prev, incoming.modules));
      setCustomQuestions((prev) => mergeById(prev, incoming.examQuestions));
      setCustomActivities((prev) => mergeById(prev, incoming.activities));
      setCustomPracticeExams((prev) => mergeById(prev, incoming.practiceExams));
    }
    // Batch upsert to DB (fire and forget)
    incoming.modules.forEach(upsertModule);
    incoming.examQuestions.forEach(upsertQuestion);
    incoming.activities.forEach(upsertActivity);
    incoming.practiceExams.forEach(upsertPracticeExam);
  }, []);

  return {
    data,
    dbLoading,
    addModule,
    updateModule,
    deleteModule,
    addExamQuestion,
    updateExamQuestion,
    deleteExamQuestion,
    addActivity,
    updateActivity,
    deleteActivity,
    addPracticeExam,
    updateWeekTitle,
    loadSeedContent,
    loadPearsonVueContent,
    loadCEShopContent,
    loadLectureNotesContent,
    loadNRS645,
    loadTextbookContent,
    importData,
    updateSyllabus,
    loadDefaultSyllabus,
  };
}
