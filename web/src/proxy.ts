import { NextResponse, type NextRequest } from "next/server";
import { decryptSession } from "@/lib/session";
import { isCliente } from "@/lib/constants";

// Next.js 16: o antigo `middleware` agora se chama `proxy` (runtime nodejs).
// Aqui fazemos apenas checagens "otimistas" de rota lendo o cookie de sessão.
// A autorização "de verdade" acontece nas Server Actions / DAL, perto dos dados.

const PUBLIC_ROUTES = ["/login", "/cadastro"];

function isPublic(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await decryptSession(request.cookies.get("session")?.value);

  // Não autenticado → só rotas públicas.
  if (!session) {
    if (isPublic(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const home = isCliente(session.tipo) ? "/cliente/orcamentos" : "/admin";

  // Autenticado em rota pública ou na raiz → vai para a área correta.
  if (isPublic(pathname) || pathname === "/") {
    return NextResponse.redirect(new URL(home, request.url));
  }

  // Isolamento por papel.
  if (pathname.startsWith("/admin") && isCliente(session.tipo)) {
    return NextResponse.redirect(new URL("/cliente/orcamentos", request.url));
  }
  if (pathname.startsWith("/cliente") && !isCliente(session.tipo)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
