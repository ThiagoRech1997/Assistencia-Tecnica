import { requireCliente } from "@/lib/dal";
import { Brand } from "@/components/brand";
import { ClienteNav } from "@/components/cliente-nav";
import { LogoutButton } from "@/components/logout-button";
import { initials } from "@/lib/format";

export default async function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireCliente();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
          <Brand />
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="grid size-7 place-items-center rounded-full bg-muted text-xs font-medium">
                {initials(session.nome)}
              </span>
              <span className="text-sm font-medium">{session.nome}</span>
            </div>
            <LogoutButton />
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl px-4">
          <nav className="flex gap-1 pb-2">
            <ClienteNav />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
