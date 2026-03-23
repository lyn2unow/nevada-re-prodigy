export type SourceAuthority = 
  | "NRS/NAC"
  | "Pearson VUE"
  | "CE Shop"
  | "Lecture Notes"
  | "Textbook";

export type DifficultyLevel = "basic" | "intermediate" | "advanced";

export type PearsonVueArea =
  | "National I - Property Ownership"
  | "National II - Land Use Controls & Regulations"
  | "National III - Valuation & Market Analysis"
  | "National IV - Financing"
  | "National V - General Principles of Agency"
  | "National VI - Property Disclosures"
  | "National VII - Contracts"
  | "National VIII - Leasing & Property Management"
  | "State I - Duties & Powers of the Real Estate Commission"
  | "State II - Licensing Requirements"
  | "State III - Nevada Agency Relationships"
  | "State IV - Nevada Disclosures"
  | "State V - Nevada Contracts"
  | "State VI - Nevada Property Management"
  | "State VII - Nevada Brokerage Operations"
  | "State VIII - Nevada Disciplinary Actions & Recovery Fund";

export type CognitiveLevel = "knowledge" | "application" | "analysis";

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
  cognitiveLevel?: CognitiveLevel;
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
  pearsonVueArea?: PearsonVueArea;
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
  cognitiveLevel?: CognitiveLevel;
  pearsonVueArea?: PearsonVueArea;
  tags: string[];
  weekNumber?: number;
  source: SourceAuthority;
}

export interface PracticeExam {
  id: string;
  title: string;
  questionIds: string[];
  createdAt: string;
}

export interface SyllabusWeekEntry {
  week: number;
  day: string;
  unitTopic: string;
  examAlignment: string;
  assignmentQuiz: string;
}

export interface GradingCategory {
  category: string;
  points: number;
}

export interface GradeScaleEntry {
  letter: string;
  range: string;
}

export interface PolicySection {
  title: string;
  content: string;
}

export interface SyllabusTemplate {
  courseCode: string;
  courseTitle: string;
  semester: string;
  instructorName: string;
  instructorCredentials: string;
  meetingDays: string;
  meetingTime: string;
  location: string;
  dateRange: string;
  textbook: string;
  platform: string;
  contactInfo: string;
  courseObjectives: string[];
  readingRequirement: string;
  courseFlow: string;
  weeklySchedule: SyllabusWeekEntry[];
  gradingCategories: GradingCategory[];
  totalPoints: number;
  gradeScale: GradeScaleEntry[];
  instructorPolicies: string[];
  institutionalPolicies: PolicySection[];
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
  cognitiveLevel?: CognitiveLevel;
  pearsonVueArea?: PearsonVueArea;
}

export interface StatuteSection {
  id: string;
  sectionNumber: string;
  title: string;
  text: string;
  category: "Definitions" | "Administration" | "Regulation" | "Advance Fees" | "Licensing" | "Continuing Education" | "Property Management" | "Discipline" | "Recovery Fund" | "Commercial Brokerage" | "Other NRS" | "NAC";
  referencedBy: string[];
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
  syllabusTemplate?: SyllabusTemplate;
  statuteSections?: StatuteSection[];
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
