import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { SignJWT, jwtVerify } from "jose";
import type { SessionUser } from "./types";

const SESSION_COOKIE = "session";
// O token da API expira em ~1 dia (86408s); mantemos a sessão alinhada.
const MAX_AGE_SECONDS = 60 * 60 * 24;

const secretValue =
  process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me-in-production";
const encodedKey = new TextEncoder().encode(secretValue);

/** Assina o payload da sessão como um JWT HS256 (impede adulteração do `tipo`). */
export async function encryptSession(payload: SessionUser): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(encodedKey);
}

/** Verifica e decodifica o cookie de sessão. Retorna `null` se ausente/ inválido. */
export async function decryptSession(
  token: string | undefined,
): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    const { token: apiToken, nome, email, tipo } = payload as Record<string, unknown>;
    if (typeof apiToken !== "string") return null;
    return {
      token: apiToken,
      nome: String(nome ?? ""),
      email: String(email ?? ""),
      tipo: String(tipo ?? ""),
    };
  } catch {
    return null;
  }
}

/** Sessão do usuário atual, memoizada por render (dedup entre Server Components). */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  return decryptSession(store.get(SESSION_COOKIE)?.value);
});

export async function createSession(user: SessionUser): Promise<void> {
  const token = await encryptSession(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
