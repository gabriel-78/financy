import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CategoryTagProps = {
  children: ReactNode;
  color: string;
  className?: string;
};

export function CategoryTag({ children, color, className }: CategoryTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium truncate max-w-full",
        className,
      )}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {children}
    </span>
  );
}
