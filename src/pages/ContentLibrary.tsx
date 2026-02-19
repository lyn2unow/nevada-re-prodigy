import { Library, BookOpen, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/contexts/CourseContext";
import { SourceAuthority } from "@/types/course";

const sourceColors: Record<SourceAuthority, string> = {
  "NRS/NAC": "bg-primary text-primary-foreground",
  "Pearson VUE": "bg-accent text-accent-foreground",
  "CE Shop": "bg-secondary text-secondary-foreground",
  "Lecture Notes": "bg-muted text-muted-foreground",
  Textbook: "bg-destructive/10 text-destructive",
};

export default function ContentLibrary() {
  const { data } = useCourse();

  const allModules = data.modules;
  const correctedCount = allModules.filter((m) => m.correctsTextbook).length;
  const sourceCounts = allModules.reduce(
    (acc, m) => ({ ...acc, [m.sourceTag]: (acc[m.sourceTag] || 0) + 1 }),
    {} as Record<string, number>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
        <p className="text-muted-foreground mt-1">
          All content tagged by source authority and legal jurisdiction
        </p>
      </div>

      {/* Source Authority Legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Source Authority Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {(["NRS/NAC", "Pearson VUE", "CE Shop", "Lecture Notes", "Textbook"] as SourceAuthority[]).map(
              (source, i) => (
                <div key={source} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-mono">{i + 1}.</span>
                  <Badge className={sourceColors[source]}>{source}</Badge>
                  <span className="text-sm text-muted-foreground">
                    ({sourceCounts[source] || 0})
                  </span>
                </div>
              )
            )}
          </div>
          {correctedCount > 0 && (
            <p className="mt-3 text-sm text-destructive flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {correctedCount} module(s) correct outdated textbook material
            </p>
          )}
        </CardContent>
      </Card>

      {/* Content list */}
      {allModules.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Library className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              Content will appear here as you create modules, questions, and activities.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {allModules.map((module) => (
            <Card key={module.id} className="hover:border-accent transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{module.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={sourceColors[module.sourceTag]}>{module.sourceTag}</Badge>
                    <Badge variant="outline">
                      {module.federalVsNevada === "both"
                        ? "Federal + NV"
                        : module.federalVsNevada === "federal"
                        ? "Federal"
                        : "Nevada"}
                    </Badge>
                    {module.correctsTextbook && (
                      <Badge variant="destructive" className="text-[10px]">
                        Corrects Textbook
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">
                  Week {module.weekNumber} · {module.keyTerms.length} terms · {module.knowledgeChecks.length} questions
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
