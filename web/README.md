# Assistência Técnica — Frontend Web

Portal web do sistema de Assistência Técnica, construído com **Next.js 16** (App
Router), **React 19**, **TypeScript**, **Tailwind CSS v4** e **shadcn/ui**.

Funciona como um **Backend for Frontend (BFF)**: o browser nunca fala direto com
a API Express. Todas as chamadas acontecem no servidor do Next.js, que injeta o
token JWT (guardado num cookie **httpOnly**, assinado com `jose`). Isso resolve o
CORS sem alterar a API e mantém o token fora do alcance do JavaScript do cliente.

## Funcionalidades

- **Autenticação** por e-mail/senha (`POST /users/auth`) com sessão em cookie httpOnly.
- **Cadastro público** de cliente (cria usuário + cliente e já faz login).
- **Área do cliente**: lista de orçamentos com **aprovar/recusar** (a aprovação
  abre a ordem de serviço automaticamente) e acompanhamento dos **serviços**.
- **Área administrativa** (equipe/empresa):
  - Dashboard com indicadores.
  - CRUD de **Clientes** e **Funcionários**.
  - Criação e remoção de **Orçamentos**.
  - **Ordens de serviço** com atualização de status em tempo real.
- Isolamento por papel via `proxy.ts` (o antigo middleware do Next) + checagens nas Server Actions.

## Pré-requisitos

- Node.js **20.9+** (testado em 22).
- A **API Express** (`../api`) rodando em `http://localhost:3050`.
- MongoDB acessível pela API.

## Configuração

```bash
cp .env.example .env.local
# edite .env.local e gere um segredo:
#   openssl rand -base64 32
```

Variáveis (`.env.local`):

| Variável         | Descrição                                              |
| ---------------- | ------------------------------------------------------ |
| `API_URL`        | URL base da API Express (apenas servidor). Ex.: `http://localhost:3050` |
| `SESSION_SECRET` | Segredo para assinar o cookie de sessão (HS256).       |

## Rodando em desenvolvimento

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build de produção

```bash
npm run build
npm run start
```

### Docker

A partir da raiz do repositório, o `docker-compose.yml` já inclui o serviço
`web`. Defina `SESSION_SECRET` no ambiente e suba a stack:

```bash
SESSION_SECRET="$(openssl rand -base64 32)" docker compose up --build
```

## Arquitetura

```
browser ──▶ Next.js (Server Components / Server Actions / proxy)
              │  cookie de sessão httpOnly (JWT assinado com jose)
              └──▶ API Express :3050  (Authorization: Bearer <token>)
```

| Caminho                     | Responsabilidade                                           |
| --------------------------- | ---------------------------------------------------------- |
| `src/lib/session.ts`        | Sessão httpOnly assinada (jose), `getSession`.             |
| `src/lib/api.ts`            | Cliente HTTP do BFF (`apiFetch`) + leituras por entidade.  |
| `src/lib/dal.ts`            | `requireSession` / `requireStaff` / `requireCliente`.      |
| `src/lib/actions/*`         | Server Actions (login, cadastro, CRUDs, aprovação, status).|
| `src/proxy.ts`              | Proteção de rotas e roteamento por papel (otimista).       |
| `src/app/(auth)/*`          | Login e cadastro.                                          |
| `src/app/cliente/*`         | Área do cliente.                                           |
| `src/app/admin/*`           | Área administrativa.                                       |

## Observações sobre a API

- A API original retorna `200` com `{ error: true }` em algumas falhas de POST —
  as Server Actions tratam esse caso.
- O endpoint de remoção lê o `id` do **corpo** da requisição; o BFF envia o `id`
  tanto na URL quanto no corpo para compatibilidade.
- As listagens não filtram por usuário; a área do cliente filtra pelos seus
  próprios registros (por e-mail) no servidor, antes de enviar ao browser.
