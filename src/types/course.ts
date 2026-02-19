export type SourceAuthority = 
  | "NRS/NAC"
  | "Pearson VUE"
  | "CE Shop"
  | "Lecture Notes"
  | "Textbook";

export type DifficultyLevel = "basic" | "intermediate" | "advanced";

export interface KeyTerm {
  id: string;
  term: string;
  definition: string;
  source: SourceAuthority;
}

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamAlert {
  id: string;
  text: string;
  type: "exam-alert" | "high-probability" | "exam-trap";
}

export interface Module {
  id: string;
  weekNumber: number;
  title: string;
  order: number;
  keyTerms: KeyTerm[];
  conceptExplanation: string;
  nevadaLegalRefs: string;
  realWorldScenario: string;
  commonMistakes: string;
  examKeyPoints: string;
  examAlerts: ExamAlert[];
  knowledgeChecks: KnowledgeCheckQuestion[];
  discussionPrompt: string;
  assignmentSuggestion: string;
  estimatedTime: string;
  sourceTag: SourceAuthority;
  correctsTextbook: boolean;
  federalVsNevada: "federal" | "nevada" | "both";
}

export interface ExamQuestion {
  id: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  wrongExplanations: [string, string, string];
  difficulty: DifficultyLevel;
  examTrap: boolean;
  examTrapNote?: string;
  tags: string[];
  source: SourceAuthority;
}

export interface PracticeExam {
  id: string;
  title: string;
  questionIds: string[];
  createdAt: string;
}

export type ActivityType = 
  | "role-play"
  | "case-study"
  | "contract-drill"
  | "closing-simulation"
  | "ethical-debate"
  | "other";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  instructorNotes: string;
  debriefPrompts: string[];
  topic: string;
  weekNumber: number | null;
  tags: string[];
}

export interface Week {
  number: number;
  title: string;
  moduleIds: string[];
}

export interface CourseData {
  weeks: Week[];
  modules: Module[];
  examQuestions: ExamQuestion[];
  practiceExams: PracticeExam[];
  activities: Activity[];
}

export const DEFAULT_WEEKS: Week[] = [
  { number: 1, title: "Week 1", moduleIds: [] },
  { number: 2, title: "Week 2", moduleIds: [] },
  { number: 3, title: "Week 3", moduleIds: [] },
  { number: 4, title: "Week 4", moduleIds: [] },
  { number: 5, title: "Week 5", moduleIds: [] },
  { number: 6, title: "Week 6", moduleIds: [] },
  { number: 7, title: "Week 7", moduleIds: [] },
];
