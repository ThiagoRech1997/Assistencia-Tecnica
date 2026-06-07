"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { requireStaff, requireCliente } from "@/lib/dal";
import { APROVACAO } from "@/lib/constants";
import { fieldErrorsFrom, str, num, type FormState } from "@/lib/form";
import type { Orcamento } from "@/lib/types";

const orcamentoSchema = z.object({
  descricao: z.string().min(3, { error: "Descreva o equipamento/serviço." }),
  clienteNome: z.string().min(1, { error: "Selecione um cliente." }),
  clienteEmail: z.email({ error: "Cliente inválido." }),
  funcionarioNome: z.string().min(1, { error: "Selecione um responsável." }),
  funcionarioEmail: z.email({ error: "Responsável inválido." }),
  itemDescricao: z.string().min(1, { error: "Descreva o item." }),
  itemQuantidade: z.number({ error: "Quantidade inválida." }).int().positive({
    error: "Quantidade deve ser maior que zero.",
  }),
  itemValor: z
    .number({ error: "Valor inválido." })
    .nonnegative({ error: "Valor não pode ser negativo." }),
});

export async function createOrcamento(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStaff();

  const parsed = orcamentoSchema.safeParse({
    descricao: str(formData, "descricao"),
    clienteNome: str(formData, "clienteNome"),
    clienteEmail: str(formData, "clienteEmail"),
    funcionarioNome: str(formData, "funcionarioNome"),
    funcionarioEmail: str(formData, "funcionarioEmail"),
    itemDescricao: str(formData, "itemDescricao"),
    itemQuantidade: num(formData, "itemQuantidade"),
    itemValor: num(formData, "itemValor"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const d = parsed.data;
  try {
    const res = await apiFetch<{ error?: boolean; message?: string }>(
      "/orcamentos",
      {
        method: "POST",
        body: {
          descricao: d.descricao,
          itens: {
            descricao: d.itemDescricao,
            quantidade: d.itemQuantidade,
            valor: d.itemValor,
          },
          cliente: { nome: d.clienteNome, email: d.clienteEmail },
          funcionario: { nome: d.funcionarioNome, email: d.funcionarioEmail },
          aprovacao: APROVACAO.AGUARDANDO,
        },
      },
    );
    if (res?.error) {
      return { error: res.message || "Erro ao criar orçamento." };
    }
  } catch (error) {
    return {
      error:
        error instanceof ApiError ? error.message : "Erro ao criar orçamento.",
    };
  }

  revalidatePath("/admin/orcamentos");
  return { ok: true };
}

export async function deleteOrcamento(id: string): Promise<FormState> {
  await requireStaff();
  try {
    await apiFetch(`/orcamentos/${id}`, { method: "DELETE", body: { id } });
  } catch (error) {
    return {
      error:
        error instanceof ApiError ? error.message : "Erro ao remover orçamento.",
    };
  }

  revalidatePath("/admin/orcamentos");
  return { ok: true };
}

/**
 * Decisão do cliente sobre um orçamento. Ao aprovar, abre automaticamente uma
 * ordem de serviço (status "Aberto"), replicando o fluxo do app mobile.
 */
export async function decidirOrcamento(
  id: string,
  aprovado: boolean,
): Promise<FormState> {
  await requireCliente();

  try {
    await apiFetch(`/orcamentos/aprovacao/${id}`, {
      method: "PUT",
      body: { aprovacao: aprovado ? APROVACAO.APROVADO : APROVACAO.RECUSADO },
    });

    if (aprovado) {
      // Busca os dados do orçamento para abrir a OS correspondente.
      const orcamentos = await apiFetch<Orcamento[]>("/orcamentos");
      const orc = orcamentos.find((o) => o._id === id);
      if (orc) {
        const total =
          (Number(orc.itens?.quantidade) || 0) * (Number(orc.itens?.valor) || 0);
        await apiFetch("/servicos", {
          method: "POST",
          body: {
            descricao: orc.descricao,
            itens: {
              descricao: orc.itens?.descricao,
              quantidade: orc.itens?.quantidade,
              valor: orc.itens?.valor,
            },
            cliente: { nome: orc.cliente?.nome, email: orc.cliente?.email },
            funcionario: {
              nome: orc.funcionario?.nome,
              email: orc.funcionario?.email,
            },
            valor: total || orc.itens?.valor || 0,
            status: "Aberto",
          },
        });
      }
    }
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "Não foi possível registrar sua decisão.",
    };
  }

  revalidatePath("/cliente/orcamentos");
  revalidatePath("/cliente/servicos");
  return { ok: true };
}
