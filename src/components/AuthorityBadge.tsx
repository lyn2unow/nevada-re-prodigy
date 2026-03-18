import { Shield, AlertTriangle } from "lucide-react";
import { AUTHORITY_COLORS, AUTHORITY_RANK } from "@/lib/authority-utils";
import type { SourceAuthority } from "@/types/course";
import { cn } from "@/lib/utils";

interface AuthorityBadgeProps {
  source: SourceAuthority;
  correctsTextbook?: boolean;
  compact?: boolean;
}

export function AuthorityBadge({ source, correctsTextbook, compact }: AuthorityBadgeProps) {
  const style = AUTHORITY_COLORS[source];
  const rank = AUTHORITY_RANK[source];

  return (
    <span className="inline-flex items-center gap-1">
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
          style.bg,
          style.text,
          "border-current/20"
        )}
      >
        <Shield className="h-3 w-3" />
        {!compact && <span>{rank}.</span>}
        <span>{source}</span>
        {source === "Textbook" && (
          <span className="opacity-70 ml-0.5">· Supplemental</span>
        )}
      </span>
      {correctsTextbook && (
        <span className="inline-flex items-center gap-0.5 rounded-full bg-destructive/10 text-destructive px-1.5 py-0.5 text-[10px] font-semibold">
          <AlertTriangle className="h-3 w-3" />
          Overrides Textbook
        </span>
      )}
    </span>
  );
}
