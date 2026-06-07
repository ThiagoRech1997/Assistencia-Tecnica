"use strict";

/**
 * Seed de dados de teste para a Assistência Técnica.
 *
 * Usa os models do mongoose diretamente (a senha dos usuários passa pelo hook
 * de hash do bcrypt). Limpa as coleções e insere um conjunto coerente cobrindo
 * todos os estados de aprovação e status de serviço.
 *
 * Uso:
 *   node seed.js
 *   MONGO_URL=mongodb://localhost:27017/assistencia-tecnica node seed.js
 *
 * Logins criados (senha de todos: 123456):
 *   admin@assistencia.com  (Funcionário / equipe)
 *   bia@assistencia.com    (Funcionário / equipe)
 *   maria@cliente.com      (Cliente)
 *   joao@cliente.com       (Cliente)
 *   ana@cliente.com        (Cliente)
 */

const mongoose = require("mongoose");

const Users = require("./models/users");
const Clientes = require("./models/clientes");
const Funcionarios = require("./models/funcionarios");
const Orcamentos = require("./models/orcamentos");
const Servicos = require("./models/servicos");

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/assistencia-tecnica";
const SENHA = "123456";

const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (n) => new Date(Date.now() - n * DAY);

async function seed() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
  console.log("Conectado em", MONGO_URL);

  // 1. Limpa tudo
  await Promise.all([
    Users.deleteMany({}),
    Clientes.deleteMany({}),
    Funcionarios.deleteMany({}),
    Orcamentos.deleteMany({}),
    Servicos.deleteMany({}),
  ]);
  console.log("Coleções limpas.");

  // 2. Usuários (create() dispara o hook que faz hash da senha)
  await Users.create([
    { nome: "Carlos Mendes", email: "admin@assistencia.com", senha: SENHA, tipo: "Funcionario" },
    { nome: "Beatriz Lima", email: "bia@assistencia.com", senha: SENHA, tipo: "Funcionario" },
    { nome: "Maria Silva", email: "maria@cliente.com", senha: SENHA, tipo: "Cliente" },
    { nome: "João Pereira", email: "joao@cliente.com", senha: SENHA, tipo: "Cliente" },
    { nome: "Ana Souza", email: "ana@cliente.com", senha: SENHA, tipo: "Cliente" },
  ]);

  // 3. Funcionários (registros)
  const carlos = { nome: "Carlos Mendes", email: "admin@assistencia.com" };
  const bia = { nome: "Beatriz Lima", email: "bia@assistencia.com" };
  await Funcionarios.create([
    { nome: carlos.nome, cpf: "98765432100", telefone: "44988887777", email: carlos.email },
    { nome: bia.nome, cpf: "11122233344", telefone: "44977776666", email: bia.email },
  ]);

  // 4. Clientes (registros) — Pedro não tem login (cadastrado só pela loja)
  const maria = { nome: "Maria Silva", email: "maria@cliente.com" };
  const joao = { nome: "João Pereira", email: "joao@cliente.com" };
  const ana = { nome: "Ana Souza", email: "ana@cliente.com" };
  await Clientes.create([
    { nome: maria.nome, cpf: "12345678901", telefone: "44999990000", email: maria.email },
    { nome: joao.nome, cpf: "22233344455", telefone: "44998887766", email: joao.email },
    { nome: ana.nome, cpf: "33344455566", telefone: "44997776655", email: ana.email },
    { nome: "Pedro Costa", cpf: "44455566677", telefone: "44996665544", email: "pedro@cliente.com" },
  ]);

  // 5. Orçamentos — cobre Aguardando / Aprovado / Nao Aprovado
  const item = (descricao, quantidade, valor) => ({ descricao, quantidade, valor });
  await Orcamentos.create([
    { descricao: "Notebook Dell Inspiron não liga", itens: item("Troca da placa de energia", 1, 380), cliente: maria, funcionario: carlos, aprovacao: "Aguardando", cadatroDat: daysAgo(1) },
    { descricao: "Troca de bateria do notebook", itens: item("Bateria 6 células", 1, 220), cliente: maria, funcionario: carlos, aprovacao: "Aprovado", cadatroDat: daysAgo(6) },
    { descricao: "Smartphone Samsung com tela quebrada", itens: item("Troca de tela + película", 1, 450), cliente: joao, funcionario: bia, aprovacao: "Aguardando", cadatroDat: daysAgo(2) },
    { descricao: "Formatação e limpeza de vírus", itens: item("Serviço de formatação", 1, 120), cliente: joao, funcionario: bia, aprovacao: "Aprovado", cadatroDat: daysAgo(9) },
    { descricao: "Impressora não puxa papel", itens: item("Limpeza do rolete", 1, 90), cliente: ana, funcionario: carlos, aprovacao: "Nao Aprovado", cadatroDat: daysAgo(4) },
    { descricao: "PC Gamer sem vídeo", itens: item("Diagnóstico + troca de fonte", 1, 520), cliente: { nome: "Pedro Costa", email: "pedro@cliente.com" }, funcionario: bia, aprovacao: "Aguardando", cadatroDat: daysAgo(1) },
  ]);

  // 6. Serviços — cobre Aberto / Em andamento / Aguardando peça / Concluído / Entregue
  await Servicos.create([
    { descricao: "Troca de bateria do notebook", itens: item("Bateria 6 células", 1, 220), cliente: maria, funcionario: carlos, valor: 220, status: "Em andamento", dataEmicao: daysAgo(5) },
    { descricao: "Upgrade de memória RAM", itens: item("Memória 8GB DDR4", 2, 180), cliente: maria, funcionario: carlos, valor: 360, status: "Aguardando peça", dataEmicao: daysAgo(3) },
    { descricao: "Formatação e limpeza de vírus", itens: item("Serviço de formatação", 1, 120), cliente: joao, funcionario: bia, valor: 120, status: "Concluído", dataEmicao: daysAgo(8) },
    { descricao: "Troca de teclado", itens: item("Teclado ABNT2", 1, 140), cliente: joao, funcionario: bia, valor: 140, status: "Entregue", dataEmicao: daysAgo(12) },
    { descricao: "Backup de dados", itens: item("Serviço de backup", 1, 80), cliente: ana, funcionario: carlos, valor: 80, status: "Aberto", dataEmicao: daysAgo(0) },
  ]);

  const [u, c, f, o, s] = await Promise.all([
    Users.countDocuments(),
    Clientes.countDocuments(),
    Funcionarios.countDocuments(),
    Orcamentos.countDocuments(),
    Servicos.countDocuments(),
  ]);
  console.log(`\nSeed concluído:`);
  console.log(`  usuários:     ${u}`);
  console.log(`  clientes:     ${c}`);
  console.log(`  funcionários: ${f}`);
  console.log(`  orçamentos:   ${o}`);
  console.log(`  serviços:     ${s}`);
  console.log(`\nLogins (senha: ${SENHA}):`);
  console.log(`  admin@assistencia.com  → equipe/empresa`);
  console.log(`  maria@cliente.com      → cliente (2 orçamentos, 2 serviços)`);
  console.log(`  joao@cliente.com       → cliente (2 orçamentos, 2 serviços)`);
  console.log(`  ana@cliente.com        → cliente (1 orçamento recusado, 1 serviço)`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Falha no seed:", err);
  process.exit(1);
});
