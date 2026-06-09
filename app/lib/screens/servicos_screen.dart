import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../core/format.dart';
import '../models/servico.dart';
import '../services/servico_service.dart';
import '../state/auth_state.dart';
import '../widgets/app_drawer.dart';
import '../widgets/status_badge.dart';

class ServicosScreen extends StatefulWidget {
  const ServicosScreen({super.key});

  @override
  State<ServicosScreen> createState() => _ServicosScreenState();
}

class _ServicosScreenState extends State<ServicosScreen> {
  late Future<List<Servico>> _future;

  @override
  void initState() {
    super.initState();
    _future = _carregar();
  }

  Future<List<Servico>> _carregar() {
    final email = context.read<AuthState>().email ?? '';
    return context.read<ServicoService>().doCliente(email);
  }

  Future<void> _recarregar() async {
    setState(() => _future = _carregar());
    await _future;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Serviços')),
      drawer: const AppDrawer(),
      body: RefreshIndicator(
        onRefresh: _recarregar,
        child: FutureBuilder<List<Servico>>(
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
            final servicos = snapshot.data ?? const [];
            if (servicos.isEmpty) {
              return const _Mensagem(
                icon: Icons.inbox_outlined,
                texto: 'Nenhum serviço encontrado.',
              );
            }
            return ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: servicos.length,
              separatorBuilder: (_, _) => const SizedBox(height: 12),
              itemBuilder: (context, i) => _ServicoCard(servico: servicos[i]),
            );
          },
        ),
      ),
    );
  }
}

class _ServicoCard extends StatelessWidget {
  const _ServicoCard({required this.servico});

  final Servico servico;

  @override
  Widget build(BuildContext context) {
    final s = servico;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(s.descricao,
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold)),
                ),
                StatusBadge(s.status),
              ],
            ),
            const Divider(height: 24),
            Text(s.item.descricao),
            Text('${s.item.quantidade} un • ${formatMoeda(s.item.valor)}',
                style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 8),
            Text('Funcionário: ${s.funcionario.nome}',
                style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 8),
            Text('Total: ${formatMoeda(s.valor)}',
                style: const TextStyle(fontWeight: FontWeight.w600)),
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
