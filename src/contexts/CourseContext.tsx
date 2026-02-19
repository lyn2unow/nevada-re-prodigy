import { createContext, useContext, ReactNode } from "react";
import { useCourseStore } from "@/stores/course-store";

type CourseStoreReturn = ReturnType<typeof useCourseStore>;

const CourseContext = createContext<CourseStoreReturn | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const store = useCourseStore();
  return <CourseContext.Provider value={store}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
