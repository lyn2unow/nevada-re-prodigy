import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CourseProvider } from "@/contexts/CourseContext";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import ModuleBuilder from "./pages/ModuleBuilder";
import ModuleForm from "./pages/ModuleForm";
import ExamPrep from "./pages/ExamPrep";
import ExamQuestionForm from "./pages/ExamQuestionForm";
import ActivityGenerator from "./pages/ActivityGenerator";
import ActivityForm from "./pages/ActivityForm";
import ActivityDetail from "./pages/ActivityDetail";
import ContentLibrary from "./pages/ContentLibrary";
import ExportPage from "./pages/ExportPage";
import ImportPage from "./pages/ImportPage";
import PracticeExamBuilder from "./pages/PracticeExamBuilder";
import PracticeExamTaker from "./pages/PracticeExamTaker";
import SyllabusPage from "./pages/SyllabusPage";
import NRSReference from "./pages/NRSReference";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <CourseProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/syllabus" element={<SyllabusPage />} />
                <Route path="/modules" element={<ModuleBuilder />} />
                <Route path="/modules/new/:weekNumber" element={<ModuleForm />} />
                <Route path="/modules/edit/:moduleId" element={<ModuleForm />} />
                <Route path="/exam-prep" element={<ExamPrep />} />
                <Route path="/exam-prep/new" element={<ExamQuestionForm />} />
                <Route path="/exam-prep/edit/:questionId" element={<ExamQuestionForm />} />
                <Route path="/exam-prep/build-exam" element={<PracticeExamBuilder />} />
                <Route path="/exam-prep/take/:examId" element={<PracticeExamTaker />} />
                <Route path="/activities" element={<ActivityGenerator />} />
                <Route path="/activities/new" element={<ActivityForm />} />
                <Route path="/activities/edit/:activityId" element={<ActivityForm />} />
                <Route path="/library" element={<ContentLibrary />} />
                <Route path="/nrs-reference" element={<NRSReference />} />
                <Route path="/export" element={<ExportPage />} />
                <Route path="/import" element={<ImportPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </CourseProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
