"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { requireStaff } from "@/lib/dal";
import { SERVICO_STATUS } from "@/lib/constants";
import type { FormState } from "@/lib/form";

export async function updateServicoStatus(
  id: string,
  status: string,
): Promise<FormState> {
  await requireStaff();

  if (!SERVICO_STATUS.includes(status)) {
    return { error: "Status inválido." };
  }

  try {
    await apiFetch(`/servicos/atualiza/${id}`, {
      method: "PUT",
      body: { status },
    });
  } catch (error) {
    return {
      error:
        error instanceof ApiError ? error.message : "Erro ao atualizar o status.",
    };
  }

  revalidatePath("/admin/servicos");
  return { ok: true };
}

export async function deleteServico(id: string): Promise<FormState> {
  await requireStaff();
  try {
    await apiFetch(`/servicos/${id}`, { method: "DELETE", body: { id } });
  } catch (error) {
    return {
      error:
        error instanceof ApiError ? error.message : "Erro ao remover a OS.",
    };
  }

  revalidatePath("/admin/servicos");
  return { ok: true };
}
