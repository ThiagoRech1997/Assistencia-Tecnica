import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../state/auth_state.dart';
import '../widgets/app_drawer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthState>();
    return Scaffold(
      appBar: AppBar(title: const Text('Início')),
      drawer: const AppDrawer(),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Olá, ${auth.nome ?? ''} 👋',
                style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 8),
            Text('O que você deseja acompanhar hoje?',
                style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 32),
            _MenuCard(
              icon: Icons.request_quote_outlined,
              title: 'Orçamentos',
              subtitle: 'Veja e aprove seus orçamentos',
              onTap: () => context.go('/orcamentos'),
            ),
            const SizedBox(height: 16),
            _MenuCard(
              icon: Icons.build_outlined,
              title: 'Serviços',
              subtitle: 'Acompanhe o andamento dos serviços',
              onTap: () => context.go('/servicos'),
            ),
          ],
        ),
      ),
    );
  }
}

class _MenuCard extends StatelessWidget {
  const _MenuCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: Icon(icon, size: 32),
        title: Text(title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }
}
