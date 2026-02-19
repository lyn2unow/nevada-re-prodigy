import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourse } from "@/contexts/CourseContext";

export default function ModuleBuilder() {
  const { data } = useCourse();
  const [selectedWeek, setSelectedWeek] = useState("1");

  const weekModules = data.modules.filter(
    (m) => m.weekNumber === Number(selectedWeek)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Module Builder</h1>
          <p className="text-muted-foreground mt-1">
            Create and organize course modules by week
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Module
        </Button>
      </div>

      <Tabs value={selectedWeek} onValueChange={setSelectedWeek}>
        <TabsList className="grid grid-cols-7 w-full max-w-2xl">
          {data.weeks.map((week) => (
            <TabsTrigger key={week.number} value={String(week.number)}>
              Wk {week.number}
            </TabsTrigger>
          ))}
        </TabsList>

        {data.weeks.map((week) => (
          <TabsContent key={week.number} value={String(week.number)} className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold">{week.title}</h2>
              <Badge variant="secondary">{weekModules.length} modules</Badge>
            </div>

            {weekModules.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No modules for this week yet
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add First Module
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {weekModules.map((module) => (
                  <Card key={module.id} className="hover:border-accent transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{module.sourceTag}</Badge>
                          {module.correctsTextbook && (
                            <Badge variant="destructive" className="text-[10px]">
                              Updates Textbook
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{module.keyTerms.length} key terms</span>
                        <span>{module.knowledgeChecks.length} questions</span>
                        <span>{module.estimatedTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
