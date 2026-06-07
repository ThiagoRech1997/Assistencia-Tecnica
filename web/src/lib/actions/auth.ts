"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { createSession, deleteSession } from "@/lib/session";
import { isCliente, CLIENTE_TIPO } from "@/lib/constants";
import { fieldErrorsFrom, str, type FormState } from "@/lib/form";
import type { SessionUser } from "@/lib/types";

interface AuthResponse {
  nome: string;
  email: string;
  token: string;
  tipo: string;
}

const loginSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido." }),
  senha: z.string().min(1, { error: "Informe sua senha." }),
});

export async function login(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: str(formData, "email"),
    senha: String(formData.get("senha") ?? ""),
  });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error) };
  }

  let auth: AuthResponse;
  try {
    auth = await apiFetch<AuthResponse>("/users/auth", {
      method: "POST",
      auth: false,
      body: parsed.data,
    });
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "Não foi possível entrar. Tente novamente.",
    };
  }

  await createSession({
    token: auth.token,
    nome: auth.nome,
    email: auth.email,
    tipo: auth.tipo,
  });

  redirect(isCliente(auth.tipo) ? "/cliente/orcamentos" : "/admin");
}

const signupSchema = z
  .object({
    nome: z.string().min(2, { error: "Informe seu nome completo." }),
    cpf: z
      .string()
      .min(11, { error: "Informe um CPF válido." })
      .max(14, { error: "CPF inválido." }),
    telefone: z.string().min(8, { error: "Informe um telefone válido." }),
    email: z.email({ error: "Informe um e-mail válido." }),
    senha: z.string().min(6, { error: "A senha deve ter ao menos 6 caracteres." }),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    error: "As senhas não conferem.",
    path: ["confirmarSenha"],
  });

export async function signup(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = signupSchema.safeParse({
    nome: str(formData, "nome"),
    cpf: str(formData, "cpf"),
    telefone: str(formData, "telefone"),
    email: str(formData, "email"),
    senha: String(formData.get("senha") ?? ""),
    confirmarSenha: String(formData.get("confirmarSenha") ?? ""),
  });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error) };
  }

  const { nome, cpf, telefone, email, senha } = parsed.data;

  // 1. Cria o usuário (rota pública). A API responde 200 com { error } em caso de falha.
  try {
    const created = await apiFetch<{ error?: boolean; message?: string }>(
      "/users",
      {
        method: "POST",
        auth: false,
        body: { nome, email, senha, tipo: CLIENTE_TIPO },
      },
    );
    if (created?.error) {
      return {
        error:
          "Não foi possível concluir o cadastro. Este e-mail já pode estar em uso.",
      };
    }
  } catch (error) {
    return {
      error:
        error instanceof ApiError ? error.message : "Falha ao criar a conta.",
    };
  }

  // 2. Autentica para obter o token.
  let auth: AuthResponse;
  try {
    auth = await apiFetch<AuthResponse>("/users/auth", {
      method: "POST",
      auth: false,
      body: { email, senha },
    });
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "Conta criada, mas houve erro ao entrar. Use a tela de login.",
    };
  }

  // 3. Cria o registro de cliente (melhor esforço — exige token). Erros aqui
  //    não bloqueiam o login; a equipe pode completar o cadastro depois.
  try {
    await apiFetch("/clientes", {
      method: "POST",
      auth: false,
      headers: { Authorization: `Bearer ${auth.token}` },
      body: { nome, cpf, telefone, email },
    });
  } catch {
    // ignora — usuário já consegue acessar o portal.
  }

  const session: SessionUser = {
    token: auth.token,
    nome: auth.nome,
    email: auth.email,
    tipo: auth.tipo || CLIENTE_TIPO,
  };
  await createSession(session);

  redirect("/cliente/orcamentos");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
