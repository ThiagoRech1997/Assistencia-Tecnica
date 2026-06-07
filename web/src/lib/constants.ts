// Constantes de domínio e helpers de classificação (papel do usuário, status, aprovação).

export const CLIENTE_TIPO = "Cliente";
export const FUNCIONARIO_TIPO = "Funcionario";

/** Trata qualquer `tipo` diferente de "Cliente" como equipe/empresa. */
export function isCliente(tipo: string | undefined | null): boolean {
  return (tipo ?? "").trim().toLowerCase() === "cliente";
}

export const APROVACAO = {
  AGUARDANDO: "Aguardando",
  APROVADO: "Aprovado",
  RECUSADO: "Nao Aprovado",
} as const;

export const SERVICO_STATUS: string[] = [
  "Aberto",
  "Em andamento",
  "Aguardando peça",
  "Concluído",
  "Entregue",
  "Cancelado",
];

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning";

export function aprovacaoVariant(aprovacao: string): BadgeVariant {
  switch ((aprovacao ?? "").toLowerCase()) {
    case "aprovado":
      return "success";
    case "nao aprovado":
      return "destructive";
    default:
      return "warning";
  }
}

export function aprovacaoLabel(aprovacao: string): string {
  return (aprovacao ?? "").toLowerCase() === "nao aprovado" ? "Não aprovado" : aprovacao || "—";
}

export function statusVariant(status: string): BadgeVariant {
  switch ((status ?? "").toLowerCase()) {
    case "concluído":
    case "concluido":
    case "entregue":
      return "success";
    case "cancelado":
      return "destructive";
    case "em andamento":
      return "default";
    case "aguardando peça":
    case "aguardando peca":
      return "warning";
    default:
      return "secondary";
  }
}
