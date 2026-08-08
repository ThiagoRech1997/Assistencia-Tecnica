# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Technical Assistance Management System (Assistencia-Tecnica) — a university project (UTFPR-MD) for tracking equipment repair orders. Clients can follow service status, approve/reject quotes, and view service history. Built with three components: an Express.js API, a React Native mobile app (functional), and a React web frontend (skeleton only).

## Architecture

- **api/** — Express.js REST API (port 3050), MongoDB via Mongoose, JWT authentication (bcryptjs for passwords)
- **app/** — React Native 0.59 mobile app (the primary client, fully functional) with apisauce, react-navigation 3.x drawer, AsyncStorage for session
- **front/** — Create React App web frontend (incomplete skeleton — Redux and react-router declared but not implemented, no API integration)
- **docker-compose.yml** — Orchestrates api (port 3050), front (port 3000), and MongoDB (port 27017)

## Commands

### API
```bash
cd api
npm install
npm start          # runs nodemon ./bin/www on port 3050
```

### Web Frontend
```bash
cd front
npm install
yarn start         # CRA dev server on port 3000
npm run build      # production build
npm test           # react-scripts test
```

### Mobile App
```bash
cd app
npm install
react-native run-android   # or run-ios
```

### Docker (all services)
```bash
docker-compose up --build
```

## API Structure

Entry point: `api/bin/www` → `api/app.js`. MongoDB database name: `assistencia-tecnica` (localhost:27017).

**Public routes** (`/users`): POST `/` (register), POST `/auth` (login, returns JWT with ~24h expiry).

**Protected routes** (Bearer token via `middlewares/auth.js`):
- `/clientes` — CRUD for clients
- `/funcionarios` — CRUD for employees
- `/servicos` — CRUD + `PUT /atualiza/:id` (status update)
- `/orcamentos` — CRUD + `PUT /aprovacao/:id` (approval status)

JWT secret is in `config/auth.json`. Controllers are in `controller/`, models in `models/`, routes in `routes/`.

**Mongoose Models**: Users, Clientes, Funcionarios, Servicos (with nested itens/cliente/funcionario objects), Orcamentos (similar to Servicos but with `aprovacao` field instead of `status`).

## Mobile App Flow

Login → stores JWT + user info in AsyncStorage → all requests auto-attach Bearer token via apisauce interceptor. Screens: Login, Cadastro (registration), Main (dashboard), Orcamentos (quotes list filtered by user email), AprovaOrcamento (approve/reject → creates Servico on approval), Servicos (service history).

API base URL is hardcoded in `app/src/services/api.js` — must be updated to match the server address.

## Language

All code, variables, UI text, and comments are in Portuguese (Brazilian).
