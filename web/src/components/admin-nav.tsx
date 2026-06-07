"use client";

import {
  BriefcaseIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react";
import { NavLink } from "@/components/nav-link";

// Itens definidos no módulo client → os ícones (componentes/funções) nunca
// cruzam a fronteira servidor→cliente.
const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/clientes", label: "Clientes", icon: UsersIcon },
  { href: "/admin/funcionarios", label: "Funcionários", icon: BriefcaseIcon },
  { href: "/admin/orcamentos", label: "Orçamentos", icon: FileTextIcon },
  { href: "/admin/servicos", label: "Serviços", icon: WrenchIcon },
];

export function AdminNav({ variant }: { variant: "sidebar" | "tab" }) {
  return (
    <>
      {NAV.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          variant={variant}
        />
      ))}
    </>
  );
}
