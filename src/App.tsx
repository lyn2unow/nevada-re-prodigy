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
import ExamPrep from "./pages/ExamPrep";
import ActivityGenerator from "./pages/ActivityGenerator";
import ContentLibrary from "./pages/ContentLibrary";
import ExportPage from "./pages/ExportPage";
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
                <Route path="/modules" element={<ModuleBuilder />} />
                <Route path="/exam-prep" element={<ExamPrep />} />
                <Route path="/activities" element={<ActivityGenerator />} />
                <Route path="/library" element={<ContentLibrary />} />
                <Route path="/export" element={<ExportPage />} />
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
