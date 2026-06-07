import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { isCliente } from "@/lib/constants";

// A raiz apenas encaminha para a área correta. Em geral o `proxy` já trata isso,
// mas mantemos este redirecionamento como rede de segurança.
export default async function RootPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  redirect(isCliente(session.tipo) ? "/cliente/orcamentos" : "/admin");
}
