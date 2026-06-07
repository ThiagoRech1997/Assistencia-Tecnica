import "server-only";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import { isCliente } from "./constants";
import type { SessionUser } from "./types";

/** Exige sessão válida; redireciona para /login caso contrário. */
export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Exige um usuário do tipo Cliente; equipe é redirecionada para o /admin. */
export async function requireCliente(): Promise<SessionUser> {
  const session = await requireSession();
  if (!isCliente(session.tipo)) redirect("/admin");
  return session;
}

/** Exige um usuário da equipe/empresa; clientes são mandados para a área deles. */
export async function requireStaff(): Promise<SessionUser> {
  const session = await requireSession();
  if (isCliente(session.tipo)) redirect("/cliente/orcamentos");
  return session;
}
