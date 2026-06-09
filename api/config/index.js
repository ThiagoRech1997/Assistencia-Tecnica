"use strict";

/**
 * Configuração da API a partir de variáveis de ambiente.
 *
 * Mantém segredos e endpoints fora do código-fonte. Em desenvolvimento há
 * fallbacks inseguros (mesmo padrão do BFF web em web/src/lib/session.ts);
 * em produção, defina JWT_SECRET e MONGO_URL no ambiente.
 *
 *   JWT_SECRET   segredo de assinatura dos tokens JWT
 *   MONGO_URL    string de conexão do MongoDB
 */
module.exports = {
  jwtSecret:
    process.env.JWT_SECRET || "dev-insecure-secret-change-me-in-production",
  mongoUrl:
    process.env.MONGO_URL || "mongodb://localhost:27017/assistencia-tecnica",
};
