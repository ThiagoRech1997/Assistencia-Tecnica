import type { Metadata } from "next";
import { BriefcaseIcon } from "lucide-react";
import { getFuncionarios, ApiError } from "@/lib/api";
import {
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
} from "@/lib/actions/funcionarios";
import { formatCPF, formatPhone } from "@/lib/format";
import type { Funcionario } from "@/lib/types";
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
  title: "Funcionários",
};

export default async function AdminFuncionariosPage() {
  let funcionarios: Funcionario[] = [];
  let loadError: string | null = null;
  try {
    funcionarios = await getFuncionarios();
  } catch (error) {
    loadError =
      error instanceof ApiError
        ? error.message
        : "Erro ao carregar funcionários.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Funcionários"
        description="Gerencie a equipe responsável pelos atendimentos."
      >
        <PessoaFormDialog
          mode="create"
          title="Novo funcionário"
          description="Preencha os dados do funcionário."
          triggerLabel="Novo funcionário"
          action={createFuncionario}
        />
      </PageHeader>

      {loadError ? (
        <ApiErrorState message={loadError} />
      ) : funcionarios.length === 0 ? (
        <EmptyState
          icon={BriefcaseIcon}
          title="Nenhum funcionário cadastrado"
          description="Comece adicionando o primeiro funcionário."
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
                {funcionarios.map((f) => (
                  <TableRow key={f._id}>
                    <TableCell className="font-medium">{f.nome}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatCPF(f.cpf)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatPhone(f.telefone)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {f.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <PessoaFormDialog
                          mode="edit"
                          title="Editar funcionário"
                          description="Atualize os dados do funcionário."
                          action={updateFuncionario.bind(null, f._id)}
                          defaults={f}
                        />
                        <DeleteButton
                          action={deleteFuncionario.bind(null, f._id)}
                          title="Remover funcionário"
                          description={`Remover "${f.nome}"? Esta ação não pode ser desfeita.`}
                          successMessage="Funcionário removido."
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
