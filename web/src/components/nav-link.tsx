"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  label,
  icon: Icon,
  variant = "sidebar",
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: LucideIcon;
  variant?: "tab" | "sidebar";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      data-active={active}
      onClick={onNavigate}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium transition-colors",
        variant === "sidebar" &&
          "rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground",
        variant === "tab" &&
          "rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-xs data-[active=true]:ring-1 data-[active=true]:ring-foreground/10",
      )}
    >
      {Icon && <Icon className="size-4" />}
      {label}
    </Link>
  );
}
