import { useState, useMemo } from "react";
import { Plus, Sparkles, Pencil, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "@/hooks/use-toast";

const typeLabels: Record<string, string> = {
  "role-play": "Role-Play",
  "case-study": "Case Study",
  "contract-drill": "Contract Drill",
  "closing-simulation": "Closing Simulation",
  "ethical-debate": "Ethical Debate",
  other: "Other",
};

const ALL_TYPES = [
  { value: "all", label: "All Types" },
  { value: "role-play", label: "Role-Play" },
  { value: "case-study", label: "Case Study" },
  { value: "contract-drill", label: "Contract Drill" },
  { value: "closing-simulation", label: "Closing Simulation" },
  { value: "ethical-debate", label: "Ethical Debate" },
  { value: "other", label: "Other" },
];

const COGNITIVE_LEVELS = [
  { value: "all", label: "All Levels" },
  { value: "knowledge", label: "Knowledge" },
  { value: "application", label: "Application" },
  { value: "analysis", label: "Analysis" },
];

const cognitiveBadgeStyles: Record<string, string> = {
  knowledge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  application: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  analysis: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function ActivityGenerator() {
  const { data, deleteActivity } = useCourse();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [weekFilter, setWeekFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const weekOptions = useMemo(() => {
    const weeks = new Set<number>();
    data.activities.forEach((a) => {
      if (a.weekNumber) weeks.add(a.weekNumber);
    });
    return Array.from(weeks).sort((a, b) => a - b);
  }, [data.activities]);

  const filtered = useMemo(() => {
    return data.activities.filter((a) => {
      const matchesSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.topic.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesType = typeFilter === "all" || a.type === typeFilter;
      const matchesWeek =
        weekFilter === "all" || (a.weekNumber !== null && String(a.weekNumber) === weekFilter);
      const matchesLevel =
        levelFilter === "all" || a.cognitiveLevel === levelFilter;
      return matchesSearch && matchesType && matchesWeek && matchesLevel;
    });
  }, [data.activities, search, typeFilter, weekFilter, levelFilter]);

  const handleDelete = (id: string, title: string) => {
    deleteActivity(id);
    toast({ title: `"${title}" deleted` });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Generator</h1>
          <p className="text-muted-foreground mt-1">
            In-class and Canvas activities with instructor notes
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/activities/new")}>
          <Plus className="h-4 w-4" />
          New Activity
        </Button>
      </div>

      {/* Filters */}
      {data.activities.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, topic, term, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COGNITIVE_LEVELS.map((cl) => (
                <SelectItem key={cl.value} value={cl.value}>
                  {cl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={weekFilter} onValueChange={setWeekFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Weeks</SelectItem>
              {weekOptions.map((w) => (
                <SelectItem key={w} value={String(w)}>
                  Week {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {data.activities.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">
              No activities yet. Create role-plays, case studies, and more.
            </p>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/activities/new")}>
              <Plus className="h-4 w-4" />
              Create First Activity
            </Button>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No activities match your filters.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((activity) => (
            <Card
              key={activity.id}
              className="hover:border-accent transition-colors cursor-pointer"
              onClick={() => navigate(`/activities/view/${activity.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {activity.cognitiveLevel && (
                      <Badge
                        variant="secondary"
                        className={cognitiveBadgeStyles[activity.cognitiveLevel] || ""}
                      >
                        {activity.cognitiveLevel.charAt(0).toUpperCase() + activity.cognitiveLevel.slice(1)}
                      </Badge>
                    )}
                    <Badge variant="secondary">{typeLabels[activity.type] || activity.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {activity.weekNumber && (
                      <Badge variant="outline" className="text-[10px]">
                        Week {activity.weekNumber}
                      </Badge>
                    )}
                    {activity.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/activities/edit/${activity.id}`);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(activity.id, activity.title);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
