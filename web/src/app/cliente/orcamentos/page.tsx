import type { Metadata } from "next";
import { FileTextIcon } from "lucide-react";
import { requireCliente } from "@/lib/dal";
import { getOrcamentos, ApiError } from "@/lib/api";
import { APROVACAO } from "@/lib/constants";
import { formatBRL, formatDate } from "@/lib/format";
import type { Orcamento } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AprovacaoBadge } from "@/components/status-badge";
import { OrcamentoDecisao } from "@/components/orcamento-decisao";
import { ApiErrorState } from "@/components/api-error";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "Meus orçamentos",
};

export default async function ClienteOrcamentosPage() {
  const session = await requireCliente();

  let orcamentos: Orcamento[] = [];
  let loadError: string | null = null;
  try {
    const all = await getOrcamentos();
    orcamentos = all.filter(
      (o) =>
        (o.cliente?.email ?? "").toLowerCase() === session.email.toLowerCase(),
    );
  } catch (error) {
    loadError =
      error instanceof ApiError ? error.message : "Erro ao carregar orçamentos.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Meus orçamentos
        </h1>
        <p className="text-sm text-muted-foreground">
          Aprove para abrirmos a ordem de serviço, ou recuse se preferir não
          seguir.
        </p>
      </div>

      {loadError ? (
        <ApiErrorState message={loadError} />
      ) : orcamentos.length === 0 ? (
        <EmptyState
          icon={FileTextIcon}
          title="Nenhum orçamento por aqui"
          description="Quando a assistência registrar um orçamento para você, ele aparecerá aqui para aprovação."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {orcamentos.map((o) => {
            const qtd = Number(o.itens?.quantidade) || 0;
            const unit = Number(o.itens?.valor) || 0;
            const total = qtd * unit;
            const aguardando =
              (o.aprovacao ?? "").toLowerCase() ===
              APROVACAO.AGUARDANDO.toLowerCase();

            return (
              <Card key={o._id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base">{o.descricao}</CardTitle>
                    <AprovacaoBadge value={o.aprovacao} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Emitido em {formatDate(o.cadatroDat)}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{o.itens?.descricao || "Item"}</p>
                    <p className="text-muted-foreground">
                      {qtd} × {formatBRL(unit)}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-base font-semibold">
                      {formatBRL(total)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Responsável: {o.funcionario?.nome || "—"}
                  </p>
                </CardContent>
                <CardFooter>
                  {aguardando ? (
                    <OrcamentoDecisao id={o._id} />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Decisão registrada. Acompanhe em{" "}
                      <span className="font-medium text-foreground">
                        Serviços
                      </span>
                      .
                    </p>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
