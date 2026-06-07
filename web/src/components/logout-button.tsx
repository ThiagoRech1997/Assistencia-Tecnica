"use client";

import { useTransition } from "react";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export function LogoutButton({
  className,
}: {
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      disabled={pending}
      onClick={() => startTransition(() => logout())}
    >
      <LogOutIcon />
      Sair
    </Button>
  );
}
