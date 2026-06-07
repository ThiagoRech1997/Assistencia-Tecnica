import type { Metadata } from "next";
import { WrenchIcon } from "lucide-react";
import { getServicos, ApiError } from "@/lib/api";
import { deleteServico } from "@/lib/actions/servicos";
import { formatBRL, formatDate } from "@/lib/format";
import type { Servico } from "@/lib/types";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { ServicoStatusSelect } from "@/components/servico-status-select";
import { DeleteButton } from "@/components/delete-button";
import { EmptyState } from "@/components/empty-state";
import { ApiErrorState } from "@/components/api-error";

export const metadata: Metadata = {
  title: "Serviços",
};

export default async function AdminServicosPage() {
  let servicos: Servico[] = [];
  let loadError: string | null = null;
  try {
    servicos = await getServicos();
  } catch (error) {
    loadError =
      error instanceof ApiError ? error.message : "Erro ao carregar serviços.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ordens de serviço"
        description="Atualize o status de cada OS. O cliente acompanha em tempo real."
      />

      {loadError ? (
        <ApiErrorState message={loadError} />
      ) : servicos.length === 0 ? (
        <EmptyState
          icon={WrenchIcon}
          title="Nenhuma ordem de serviço"
          description="As OS são abertas automaticamente quando um cliente aprova um orçamento."
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servicos.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell className="max-w-44">
                      <p className="truncate font-medium">{s.descricao}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(s.dataEmicao ?? s.cadatroDat)}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.cliente?.nome || "—"}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatBRL(s.valor)}
                    </TableCell>
                    <TableCell>
                      <ServicoStatusSelect id={s._id} status={s.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DeleteButton
                          action={deleteServico.bind(null, s._id)}
                          title="Remover OS"
                          description={`Remover a ordem de serviço "${s.descricao}"?`}
                          successMessage="Ordem de serviço removida."
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
