import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build enxuto para Docker (gera .next/standalone com server.js).
  output: "standalone",
  // Fixa a raiz deste projeto (há outros lockfiles fora dele). Evita o aviso de
  // múltiplos lockfiles do Turbopack e mantém o tracing de arquivos correto.
  turbopack: {
    root: import.meta.dirname,
  },
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
