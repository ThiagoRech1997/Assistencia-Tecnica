import type { ZodError } from "zod";

/** Estado compartilhado pelas Server Actions usadas com `useActionState`. */
export interface FormState {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export const EMPTY_FORM_STATE: FormState = {};

/** Converte os issues do Zod em um mapa campo → mensagens (compatível v3/v4). */
export function fieldErrorsFrom(error: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = typeof issue.path[0] === "string" ? issue.path[0] : "_form";
    (out[key] ??= []).push(issue.message);
  }
  return out;
}

/** Lê e normaliza (trim) um campo de texto do FormData. */
export function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/** Lê um campo numérico do FormData, aceitando vírgula decimal. */
export function num(formData: FormData, key: string): number {
  return Number(String(formData.get(key) ?? "").replace(",", "."));
}
