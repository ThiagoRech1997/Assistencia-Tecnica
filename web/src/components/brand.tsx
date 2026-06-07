import { WrenchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-heading", className)}>
      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <WrenchIcon className="size-4" />
      </span>
      {showText && (
        <span className="font-semibold tracking-tight">Assistência Técnica</span>
      )}
    </span>
  );
}
