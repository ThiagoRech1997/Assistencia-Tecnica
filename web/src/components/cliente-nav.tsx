"use client";

import { FileTextIcon, WrenchIcon } from "lucide-react";
import { NavLink } from "@/components/nav-link";

export function ClienteNav() {
  return (
    <>
      <NavLink
        href="/cliente/orcamentos"
        label="Orçamentos"
        icon={FileTextIcon}
        variant="tab"
      />
      <NavLink
        href="/cliente/servicos"
        label="Serviços"
        icon={WrenchIcon}
        variant="tab"
      />
    </>
  );
}
