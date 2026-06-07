"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { requireStaff } from "@/lib/dal";
import { fieldErrorsFrom, str, type FormState } from "@/lib/form";

const funcionarioSchema = z.object({
  nome: z.string().min(2, { error: "Informe o nome (mín. 2 caracteres)." }),
  cpf: z.string().min(11, { error: "Informe um CPF válido." }).max(14),
  telefone: z.string().min(8, { error: "Informe um telefone válido." }),
  email: z.email({ error: "Informe um e-mail válido." }),
});

function readFuncionario(formData: FormData) {
  return funcionarioSchema.safeParse({
    nome: str(formData, "nome"),
    cpf: str(formData, "cpf"),
    telefone: str(formData, "telefone"),
    email: str(formData, "email"),
  });
}

export async function createFuncionario(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStaff();
  const parsed = readFuncionario(formData);
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  try {
    const res = await apiFetch<{ error?: boolean; message?: string }>(
      "/funcionarios",
      { method: "POST", body: parsed.data },
    );
    if (res?.error) {
      return { error: res.message || "Erro ao cadastrar funcionário." };
    }
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "Erro ao cadastrar funcionário.",
    };
  }

  revalidatePath("/admin/funcionarios");
  return { ok: true };
}

export async function updateFuncionario(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStaff();
  const parsed = readFuncionario(formData);
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  try {
    await apiFetch(`/funcionarios/${id}`, { method: "PUT", body: parsed.data });
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "Erro ao atualizar funcionário.",
    };
  }

  revalidatePath("/admin/funcionarios");
  return { ok: true };
}

export async function deleteFuncionario(id: string): Promise<FormState> {
  await requireStaff();
  try {
    await apiFetch(`/funcionarios/${id}`, { method: "DELETE", body: { id } });
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "Erro ao remover funcionário.",
    };
  }

  revalidatePath("/admin/funcionarios");
  return { ok: true };
}
