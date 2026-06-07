import type { Metadata } from "next";
import { FileTextIcon } from "lucide-react";
import { getOrcamentos, getClientes, getFuncionarios, ApiError } from "@/lib/api";
import { deleteOrcamento } from "@/lib/actions/orcamentos";
import { formatBRL, formatDate } from "@/lib/format";
import type { Cliente, Funcionario, Orcamento } from "@/lib/types";
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
import { OrcamentoFormDialog } from "@/components/orcamento-form-dialog";
import { AprovacaoBadge } from "@/components/status-badge";
import { DeleteButton } from "@/components/delete-button";
import { EmptyState } from "@/components/empty-state";
import { ApiErrorState } from "@/components/api-error";

export const metadata: Metadata = {
  title: "Orçamentos",
};

export default async function AdminOrcamentosPage() {
  let orcamentos: Orcamento[] = [];
  let clientes: Cliente[] = [];
  let funcionarios: Funcionario[] = [];
  let loadError: string | null = null;

  try {
    [orcamentos, clientes, funcionarios] = await Promise.all([
      getOrcamentos(),
      getClientes(),
      getFuncionarios(),
    ]);
  } catch (error) {
    loadError =
      error instanceof ApiError ? error.message : "Erro ao carregar orçamentos.";
  }

  const clienteRefs = clientes.map((c) => ({ nome: c.nome, email: c.email }));
  const funcionarioRefs = funcionarios.map((f) => ({
    nome: f.nome,
    email: f.email,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orçamentos"
        description="Crie orçamentos e acompanhe a decisão dos clientes."
      >
        {!loadError && (
          <OrcamentoFormDialog
            clientes={clienteRefs}
            funcionarios={funcionarioRefs}
          />
        )}
      </PageHeader>

      {loadError ? (
        <ApiErrorState message={loadError} />
      ) : orcamentos.length === 0 ? (
        <EmptyState
          icon={FileTextIcon}
          title="Nenhum orçamento criado"
          description="Crie o primeiro orçamento para um cliente cadastrado."
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Aprovação</TableHead>
                  <TableHead className="w-12 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orcamentos.map((o) => {
                  const qtd = Number(o.itens?.quantidade) || 0;
                  const unit = Number(o.itens?.valor) || 0;
                  return (
                    <TableRow key={o._id}>
                      <TableCell className="max-w-44">
                        <p className="truncate font-medium">{o.descricao}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(o.cadatroDat)}
                        </p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {o.cliente?.nome || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {o.itens?.descricao} · {qtd} × {formatBRL(unit)}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatBRL(qtd * unit)}
                      </TableCell>
                      <TableCell>
                        <AprovacaoBadge value={o.aprovacao} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <DeleteButton
                            action={deleteOrcamento.bind(null, o._id)}
                            title="Remover orçamento"
                            description={`Remover o orçamento "${o.descricao}"?`}
                            successMessage="Orçamento removido."
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
