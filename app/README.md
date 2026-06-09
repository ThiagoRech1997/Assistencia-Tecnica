# App (Flutter) — Assistência Técnica

App cliente da Assistência Técnica, reescrito em **Flutter** (substitui o app
React Native, preservado em [`../app_old`](../app_old)).

## Stack

- **Flutter 3.44 / Dart 3.12** — Material 3
- **dio** — cliente HTTP com interceptor de token
- **flutter_secure_storage** — token guardado no Keychain/Keystore
- **provider** — gerenciamento de estado (sessão)
- **go_router** — navegação declarativa com guarda de autenticação
- **intl** — formatação de moeda (R$)

## Arquitetura (`lib/`)

```
core/      config, cliente HTTP, storage seguro, formatação, exceções
models/    Usuario, Orcamento, Servico, Item, Pessoa
services/  AuthService, OrcamentoService, ServicoService (acesso à API)
state/     AuthState (ChangeNotifier) — sessão e ações de auth
router/    app_router (rotas + redirect por autenticação)
screens/   login, cadastro, home, orcamentos, aprova_orcamento, servicos
widgets/   AppDrawer, StatusBadge
```

Fluxo: o usuário entra → vê seus orçamentos → aprova um orçamento → a aprovação
abre automaticamente um serviço → acompanha o status do serviço.

## Configuração da API

A URL base da API é definida em `lib/core/config.dart` e pode ser sobrescrita
no build:

```bash
flutter run --dart-define=API_BASE_URL=http://192.168.0.10:3050
```

Padrões:
- **Emulador Android:** `http://10.0.2.2:3050` (default — mapeia para o host)
- **Dispositivo físico:** use o IP da máquina na rede local
- **iOS Simulator/Web:** `http://localhost:3050`

> A API roda em HTTP (porta 3050). O `usesCleartextTraffic` está habilitado no
> Android **para desenvolvimento**; em produção use HTTPS.

## Rodando

```bash
# subir a API + Mongo (na raiz do repositório)
docker compose up -d

# rodar o app
cd app
flutter pub get
flutter run
```

## Testes

```bash
flutter test
```

## Contrato da API

- A listagem de orçamentos/serviços é **escopada pelo servidor**: um token de
  cliente recebe apenas os próprios registros (o app não filtra mais por
  e-mail localmente). Tokens de equipe (`Funcionario`) recebem tudo.
- O token JWT carrega `id`, `email` e `tipo`; o segredo e a URI do Mongo da API
  vêm de variáveis de ambiente (`JWT_SECRET`, `MONGO_URL`).
