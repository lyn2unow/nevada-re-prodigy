import { Copy, FileDown, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const exportOptions = [
  {
    title: "Copy to Clipboard",
    description: "Formatted content ready to paste into Canvas modules, discussions, or assignments.",
    icon: Copy,
    action: "Select content to copy",
  },
  {
    title: "PDF Export",
    description: "Download modules, exam prep sets, or activities as formatted PDF documents.",
    icon: FileDown,
    action: "Choose content for PDF",
  },
  {
    title: "Canvas Quiz Export (QTI)",
    description: "Generate QTI-format files for direct import into Canvas quizzes.",
    icon: FileText,
    action: "Generate QTI file",
  },
];

export default function ExportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Export Content</h1>
        <p className="text-muted-foreground mt-1">
          Get your materials ready for Canvas
        </p>
      </div>

      <div className="grid gap-4">
        {exportOptions.map((opt) => (
          <Card key={opt.title} className="hover:border-accent transition-colors">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <opt.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{opt.title}</CardTitle>
                  <CardDescription className="mt-1">{opt.description}</CardDescription>
                </div>
                <Button variant="outline" className="shrink-0">
                  {opt.action}
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
