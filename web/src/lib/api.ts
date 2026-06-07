import "server-only";

import { getSession } from "./session";
import type { Cliente, Funcionario, Orcamento, Servico } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:3050";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Anexa o Bearer token da sessão (padrão: true). */
  auth?: boolean;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/**
 * Cliente HTTP do BFF: roda só no servidor, injeta o token da sessão e fala com
 * a API Express. O browser nunca enxerga o token nem a URL da API.
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { body, auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (auth) {
    const session = await getSession();
    if (session?.token) {
      finalHeaders.Authorization = `Bearer ${session.token}`;
    }
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Não foi possível conectar à API. Verifique se o servidor está em execução.",
      503,
    );
  }

  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    const record = (data ?? {}) as Record<string, unknown>;
    const message =
      (typeof record.error === "string" && record.error) ||
      (typeof record.message === "string" && record.message) ||
      `Erro ${res.status} ao acessar a API.`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

// ---------------------------------------------------------------------------
// Helpers de leitura usados pelos Server Components.
// ---------------------------------------------------------------------------

export function getClientes(): Promise<Cliente[]> {
  return apiFetch<Cliente[]>("/clientes");
}

export function getFuncionarios(): Promise<Funcionario[]> {
  return apiFetch<Funcionario[]>("/funcionarios");
}

export function getOrcamentos(): Promise<Orcamento[]> {
  return apiFetch<Orcamento[]>("/orcamentos");
}

export function getServicos(): Promise<Servico[]> {
  return apiFetch<Servico[]>("/servicos");
}
