import type { Metadata } from "next";
import { UsersIcon } from "lucide-react";
import { getClientes, ApiError } from "@/lib/api";
import {
  createCliente,
  updateCliente,
  deleteCliente,
} from "@/lib/actions/clientes";
import { formatCPF, formatPhone } from "@/lib/format";
import type { Cliente } from "@/lib/types";
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
import { PessoaFormDialog } from "@/components/pessoa-form-dialog";
import { DeleteButton } from "@/components/delete-button";
import { EmptyState } from "@/components/empty-state";
import { ApiErrorState } from "@/components/api-error";

export const metadata: Metadata = {
  title: "Clientes",
};

export default async function AdminClientesPage() {
  let clientes: Cliente[] = [];
  let loadError: string | null = null;
  try {
    clientes = await getClientes();
  } catch (error) {
    loadError =
      error instanceof ApiError ? error.message : "Erro ao carregar clientes.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Cadastre e gerencie os clientes da assistência."
      >
        <PessoaFormDialog
          mode="create"
          title="Novo cliente"
          description="Preencha os dados do cliente."
          triggerLabel="Novo cliente"
          action={createCliente}
        />
      </PageHeader>

      {loadError ? (
        <ApiErrorState message={loadError} />
      ) : clientes.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="Nenhum cliente cadastrado"
          description="Comece adicionando o primeiro cliente."
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="w-20 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.nome}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatCPF(c.cpf)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatPhone(c.telefone)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <PessoaFormDialog
                          mode="edit"
                          title="Editar cliente"
                          description="Atualize os dados do cliente."
                          action={updateCliente.bind(null, c._id)}
                          defaults={c}
                        />
                        <DeleteButton
                          action={deleteCliente.bind(null, c._id)}
                          title="Remover cliente"
                          description={`Remover "${c.nome}"? Esta ação não pode ser desfeita.`}
                          successMessage="Cliente removido."
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
