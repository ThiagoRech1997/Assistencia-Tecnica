import type { Metadata } from "next";
import { WrenchIcon } from "lucide-react";
import { requireCliente } from "@/lib/dal";
import { getServicos, ApiError } from "@/lib/api";
import { formatBRL, formatDate } from "@/lib/format";
import type { Servico } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import { ApiErrorState } from "@/components/api-error";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "Meus serviços",
};

export default async function ClienteServicosPage() {
  const session = await requireCliente();

  let servicos: Servico[] = [];
  let loadError: string | null = null;
  try {
    const all = await getServicos();
    servicos = all.filter(
      (s) =>
        (s.cliente?.email ?? "").toLowerCase() === session.email.toLowerCase(),
    );
  } catch (error) {
    loadError =
      error instanceof ApiError ? error.message : "Erro ao carregar serviços.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Meus serviços
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe o andamento de cada ordem de serviço do seu equipamento.
        </p>
      </div>

      {loadError ? (
        <ApiErrorState message={loadError} />
      ) : servicos.length === 0 ? (
        <EmptyState
          icon={WrenchIcon}
          title="Nenhuma ordem de serviço"
          description="Assim que você aprovar um orçamento, a ordem de serviço aparecerá aqui para acompanhamento."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {servicos.map((s) => (
            <Card key={s._id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">{s.descricao}</CardTitle>
                  <StatusBadge value={s.status} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Aberta em {formatDate(s.dataEmicao ?? s.cadatroDat)}
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-3 text-sm">
                <div>
                  <p className="font-medium">{s.itens?.descricao || "Item"}</p>
                  <p className="text-muted-foreground">
                    {Number(s.itens?.quantidade) || 0} ×{" "}
                    {formatBRL(s.itens?.valor)}
                  </p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Valor</span>
                  <span className="text-base font-semibold">
                    {formatBRL(s.valor)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Responsável: {s.funcionario?.nome || "—"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
