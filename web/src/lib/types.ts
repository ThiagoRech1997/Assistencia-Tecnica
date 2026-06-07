// Tipos compartilhados — espelham os modelos do MongoDB expostos pela API Express.
// Observação: alguns campos mantêm os nomes (com typos) usados pela API original,
// como `cadatroDat` e `dataEmicao`, para casar exatamente com o payload retornado.

export interface SessionUser {
  /** Token JWT emitido pela API (`POST /users/auth`). Fica só no servidor. */
  token: string;
  nome: string;
  email: string;
  /** "Cliente" para clientes; qualquer outro valor é tratado como equipe/empresa. */
  tipo: string;
}

export interface Cliente {
  _id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  cadatroDat?: string;
}

export interface Funcionario {
  _id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  cadatroDat?: string;
}

export interface ItemOS {
  descricao: string;
  quantidade: number;
  valor: number;
}

export interface PessoaRef {
  nome: string;
  email: string;
}

export type Aprovacao = "Aguardando" | "Aprovado" | "Nao Aprovado";

export interface Orcamento {
  _id: string;
  descricao: string;
  itens: ItemOS;
  cliente: PessoaRef;
  funcionario: PessoaRef;
  aprovacao: Aprovacao | string;
  cadatroDat?: string;
}

export type ServicoStatus =
  | "Aberto"
  | "Em andamento"
  | "Aguardando peça"
  | "Concluído"
  | "Entregue"
  | "Cancelado";

export interface Servico {
  _id: string;
  descricao: string;
  itens: ItemOS;
  cliente: PessoaRef;
  funcionario: PessoaRef;
  valor: number;
  status: ServicoStatus | string;
  dataEmicao?: string;
  cadatroDat?: string;
}
