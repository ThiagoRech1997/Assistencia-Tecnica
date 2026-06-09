import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../core/format.dart';
import '../models/orcamento.dart';
import '../services/orcamento_service.dart';
import '../state/auth_state.dart';
import '../widgets/app_drawer.dart';
import '../widgets/status_badge.dart';

class OrcamentosScreen extends StatefulWidget {
  const OrcamentosScreen({super.key});

  @override
  State<OrcamentosScreen> createState() => _OrcamentosScreenState();
}

class _OrcamentosScreenState extends State<OrcamentosScreen> {
  late Future<List<Orcamento>> _future;

  @override
  void initState() {
    super.initState();
    _future = _carregar();
  }

  Future<List<Orcamento>> _carregar() {
    final email = context.read<AuthState>().email ?? '';
    return context.read<OrcamentoService>().doCliente(email);
  }

  Future<void> _recarregar() async {
    setState(() => _future = _carregar());
    await _future;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Orçamentos')),
      drawer: const AppDrawer(),
      body: RefreshIndicator(
        onRefresh: _recarregar,
        child: FutureBuilder<List<Orcamento>>(
          future: _future,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasError) {
              return _Mensagem(
                icon: Icons.error_outline,
                texto: '${snapshot.error}',
                onRetry: _recarregar,
              );
            }
            final orcamentos = snapshot.data ?? const [];
            if (orcamentos.isEmpty) {
              return const _Mensagem(
                icon: Icons.inbox_outlined,
                texto: 'Nenhum orçamento encontrado.',
              );
            }
            return ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: orcamentos.length,
              separatorBuilder: (_, _) => const SizedBox(height: 12),
              itemBuilder: (context, i) => _OrcamentoCard(
                orcamento: orcamentos[i],
                onAprovar: () async {
                  final alterou = await context.push<bool>(
                    '/orcamentos/aprovar',
                    extra: orcamentos[i],
                  );
                  if (alterou == true) _recarregar();
                },
              ),
            );
          },
        ),
      ),
    );
  }
}

class _OrcamentoCard extends StatelessWidget {
  const _OrcamentoCard({required this.orcamento, required this.onAprovar});

  final Orcamento orcamento;
  final VoidCallback onAprovar;

  @override
  Widget build(BuildContext context) {
    final o = orcamento;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(o.descricao,
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold)),
                ),
                StatusBadge(o.aprovacao),
              ],
            ),
            const Divider(height: 24),
            Text(o.item.descricao),
            Text(
                '${o.item.quantidade} un • ${formatMoeda(o.item.valor)}',
                style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 8),
            Text('Funcionário: ${o.funcionario.nome}',
                style: Theme.of(context).textTheme.bodySmall),
            if (o.aguardando) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  onPressed: onAprovar,
                  icon: const Icon(Icons.fact_check_outlined),
                  label: const Text('Analisar'),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _Mensagem extends StatelessWidget {
  const _Mensagem({required this.icon, required this.texto, this.onRetry});

  final IconData icon;
  final String texto;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        const SizedBox(height: 120),
        Icon(icon, size: 64, color: Colors.grey),
        const SizedBox(height: 16),
        Text(texto, textAlign: TextAlign.center),
        if (onRetry != null) ...[
          const SizedBox(height: 16),
          Center(
            child: OutlinedButton(
              onPressed: onRetry,
              child: const Text('Tentar novamente'),
            ),
          ),
        ],
      ],
    );
  }
}
