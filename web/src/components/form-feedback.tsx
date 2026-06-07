import { TriangleAlertIcon } from "lucide-react";

/** Mensagem de erro de um campo específico (primeira mensagem do Zod). */
export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-xs font-medium text-destructive">{messages[0]}</p>;
}

/** Alerta de erro geral do formulário (ex.: credenciais inválidas). */
export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
