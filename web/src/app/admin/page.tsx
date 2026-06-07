import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseIcon,
  ClockIcon,
  FileTextIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react";
import { getClientes, getFuncionarios, getOrcamentos, getServicos, ApiError } from "@/lib/api";
import { APROVACAO } from "@/lib/constants";
import { formatBRL, formatDate } from "@/lib/format";
import type { Cliente, Funcionario, Orcamento, Servico } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { AprovacaoBadge, StatusBadge } from "@/components/status-badge";
import { ApiErrorState } from "@/components/api-error";

export const metadata: Metadata = {
  title: "Dashboard",
};

const FINALIZADOS = ["concluído", "concluido", "entregue", "cancelado"];

export default async function AdminDashboardPage() {
  let data: {
    clientes: Cliente[];
    funcionarios: Funcionario[];
    orcamentos: Orcamento[];
    servicos: Servico[];
  } | null = null;
  let loadError: string | null = null;

  try {
    const [clientes, funcionarios, orcamentos, servicos] = await Promise.all([
      getClientes(),
      getFuncionarios(),
      getOrcamentos(),
      getServicos(),
    ]);
    data = { clientes, funcionarios, orcamentos, servicos };
  } catch (error) {
    loadError =
      error instanceof ApiError ? error.message : "Erro ao carregar o painel.";
  }

  if (loadError || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Visão geral da operação." />
        <ApiErrorState message={loadError ?? "Erro desconhecido."} />
      </div>
    );
  }

  const aguardando = data.orcamentos.filter(
    (o) => (o.aprovacao ?? "").toLowerCase() === APROVACAO.AGUARDANDO.toLowerCase(),
  );
  const emAndamento = data.servicos.filter(
    (s) => !FINALIZADOS.includes((s.status ?? "").toLowerCase()),
  );

  const stats = [
    { label: "Clientes", value: data.clientes.length, icon: UsersIcon, href: "/admin/clientes" },
    { label: "Funcionários", value: data.funcionarios.length, icon: BriefcaseIcon, href: "/admin/funcionarios" },
    { label: "Orçamentos aguardando", value: aguardando.length, icon: ClockIcon, href: "/admin/orcamentos" },
    { label: "Serviços em andamento", value: emAndamento.length, icon: WrenchIcon, href: "/admin/servicos" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral de clientes, orçamentos e ordens de serviço."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <Card className="transition-colors group-hover:border-foreground/20">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums">
                    {s.value}
                  </p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
                  <s.icon className="size-5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileTextIcon className="size-4" />
              Orçamentos aguardando aprovação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aguardando.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum orçamento pendente.
              </p>
            ) : (
              aguardando.slice(0, 5).map((o) => (
                <div
                  key={o._id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{o.descricao}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {o.cliente?.nome} · {formatDate(o.cadatroDat)}
                    </p>
                  </div>
                  <AprovacaoBadge value={o.aprovacao} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <WrenchIcon className="size-4" />
              Serviços em andamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emAndamento.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum serviço em andamento.
              </p>
            ) : (
              emAndamento.slice(0, 5).map((s) => (
                <div
                  key={s._id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{s.descricao}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.cliente?.nome} · {formatBRL(s.valor)}
                    </p>
                  </div>
                  <StatusBadge value={s.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
