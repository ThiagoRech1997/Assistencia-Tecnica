import { requireStaff } from "@/lib/dal";
import { Brand } from "@/components/brand";
import { AdminNav } from "@/components/admin-nav";
import { LogoutButton } from "@/components/logout-button";
import { initials } from "@/lib/format";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireStaff();

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar (md+) */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Brand />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <AdminNav variant="sidebar" />
        </nav>
        <div className="border-t p-3">
          <div className="mb-2 flex items-center gap-2 px-1">
            <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
              {initials(session.nome)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{session.nome}</p>
              <p className="truncate text-xs text-muted-foreground">
                {session.email}
              </p>
            </div>
          </div>
          <LogoutButton className="w-full justify-start" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur md:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Brand />
            <LogoutButton />
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
            <AdminNav variant="tab" />
          </nav>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
