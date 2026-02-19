// Course store - v2 clean rewrite
import { useState, useEffect } from "react";
import type { CourseData, Module, ExamQuestion, Activity, PracticeExam } from "@/types/course";
import { DEFAULT_WEEKS } from "@/types/course";

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

  return {
    data,
    addModule,
    updateModule,
    deleteModule,
    addExamQuestion,
    updateExamQuestion,
    deleteExamQuestion,
    addActivity,
    deleteActivity,
    addPracticeExam,
    updateWeekTitle,
  };
}
