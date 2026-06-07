import { TriangleAlertIcon } from "lucide-react";

/** Estado de erro exibido quando a API não responde / retorna erro. */
export function ApiErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
      <span className="grid size-11 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-5" />
      </span>
      <p className="mt-3 text-sm font-medium text-destructive">
        Não foi possível carregar os dados
      </p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        Confira se a API Express está em execução em{" "}
        <code className="rounded bg-muted px-1 py-0.5">localhost:3050</code>.
      </p>
    </div>
  );
}
