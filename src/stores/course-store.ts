// Course store - v2 clean rewrite
import { useState, useEffect } from "react";
import type { CourseData, Module, ExamQuestion, Activity, PracticeExam } from "@/types/course";
import { DEFAULT_WEEKS } from "@/types/course";
import { getSeedWeeks, getSeedModules, getSeedExamQuestions, getSeedActivities } from "@/data/seed-content";
import { getPearsonVueModules, getPearsonVueExamQuestions, getPearsonVueActivities } from "@/data/pearson-vue-content";

const STORAGE_KEY = "re103-course-data";

function getInitialData(): CourseData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    weeks: DEFAULT_WEEKS,
    modules: [],
    examQuestions: [],
    practiceExams: [],
    activities: [],
  };
}

export function useCourseStore() {
  const [data, setData] = useState<CourseData>(getInitialData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addModule = (module: Module) => {
    setData((prev) => ({
      ...prev,
      modules: [...prev.modules, module],
      weeks: prev.weeks.map((w) =>
        w.number === module.weekNumber
          ? { ...w, moduleIds: [...w.moduleIds, module.id] }
          : w
      ),
    }));
  };

  const updateModule = (module: Module) => {
    setData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => (m.id === module.id ? module : m)),
    }));
  };

  const deleteModule = (id: string) => {
    setData((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== id),
      weeks: prev.weeks.map((w) => ({
        ...w,
        moduleIds: w.moduleIds.filter((mid) => mid !== id),
      })),
    }));
  };

  const addExamQuestion = (q: ExamQuestion) => {
    setData((prev) => ({ ...prev, examQuestions: [...prev.examQuestions, q] }));
  };

  const updateExamQuestion = (q: ExamQuestion) => {
    setData((prev) => ({
      ...prev,
      examQuestions: prev.examQuestions.map((eq) => (eq.id === q.id ? q : eq)),
    }));
  };

  const deleteExamQuestion = (id: string) => {
    setData((prev) => ({
      ...prev,
      examQuestions: prev.examQuestions.filter((q) => q.id !== id),
    }));
  };

  const addActivity = (a: Activity) => {
    setData((prev) => ({ ...prev, activities: [...prev.activities, a] }));
  };

  const updateActivity = (a: Activity) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.map((act) => (act.id === a.id ? a : act)),
    }));
  };

  const deleteActivity = (id: string) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a.id !== id),
    }));
  };

  const addPracticeExam = (pe: PracticeExam) => {
    setData((prev) => ({ ...prev, practiceExams: [...prev.practiceExams, pe] }));
  };

  const updateWeekTitle = (weekNumber: number, title: string) => {
    setData((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w) =>
        w.number === weekNumber ? { ...w, title } : w
      ),
    }));
  };

  const loadSeedContent = () => {
    setData({
      weeks: getSeedWeeks(),
      modules: getSeedModules(),
      examQuestions: getSeedExamQuestions(),
      practiceExams: [],
      activities: getSeedActivities(),
    });
  };

  const loadPearsonVueContent = () => {
    const pvModules = getPearsonVueModules();
    const pvQuestions = getPearsonVueExamQuestions();
    const pvActivities = getPearsonVueActivities();
    setData((prev) => {
      const existingModuleIds = new Set(prev.modules.map((m) => m.id));
      const existingQuestionIds = new Set(prev.examQuestions.map((q) => q.id));
      const existingActivityIds = new Set(prev.activities.map((a) => a.id));
      return {
        ...prev,
        modules: [...prev.modules, ...pvModules.filter((m) => !existingModuleIds.has(m.id))],
        examQuestions: [...prev.examQuestions, ...pvQuestions.filter((q) => !existingQuestionIds.has(q.id))],
        activities: [...prev.activities, ...pvActivities.filter((a) => !existingActivityIds.has(a.id))],
        weeks: prev.weeks.map((w) => {
          const newModIds = pvModules.filter((m) => m.weekNumber === w.number && !existingModuleIds.has(m.id)).map((m) => m.id);
          return newModIds.length > 0 ? { ...w, moduleIds: [...w.moduleIds, ...newModIds] } : w;
        }),
      };
    });
  };

  const importData = (incoming: CourseData, mode: "replace" | "merge") => {
    if (mode === "replace") {
      setData(incoming);
    } else {
      setData((prev) => {
        const existingModuleIds = new Set(prev.modules.map((m) => m.id));
        const existingQuestionIds = new Set(prev.examQuestions.map((q) => q.id));
        const existingActivityIds = new Set(prev.activities.map((a) => a.id));
        const existingExamIds = new Set(prev.practiceExams.map((e) => e.id));

        return {
          weeks: incoming.weeks.map((iw) => {
            const existing = prev.weeks.find((w) => w.number === iw.number);
            if (!existing) return iw;
            const mergedIds = [...new Set([...existing.moduleIds, ...iw.moduleIds])];
            return { ...existing, title: iw.title || existing.title, moduleIds: mergedIds };
          }),
          modules: [
            ...prev.modules,
            ...incoming.modules.filter((m) => !existingModuleIds.has(m.id)),
          ],
          examQuestions: [
            ...prev.examQuestions,
            ...incoming.examQuestions.filter((q) => !existingQuestionIds.has(q.id)),
          ],
          activities: [
            ...prev.activities,
            ...incoming.activities.filter((a) => !existingActivityIds.has(a.id)),
          ],
          practiceExams: [
            ...prev.practiceExams,
            ...incoming.practiceExams.filter((e) => !existingExamIds.has(e.id)),
          ],
        };
      });
    }
  };

  return {
    data,
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
    importData,
  };
}
