import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../state/auth_state.dart';

/// Menu lateral (drawer) — equivalente ao createDrawerNavigator do app antigo.
class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthState>();
    return Drawer(
      child: SafeArea(
        child: Column(
          children: [
            UserAccountsDrawerHeader(
              accountName: Text(auth.nome ?? ''),
              accountEmail: Text(auth.email ?? ''),
              currentAccountPicture: CircleAvatar(
                child: Text(
                  (auth.nome?.isNotEmpty ?? false)
                      ? auth.nome![0].toUpperCase()
                      : '?',
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home_outlined),
              title: const Text('Início'),
              onTap: () => _go(context, '/'),
            ),
            ListTile(
              leading: const Icon(Icons.request_quote_outlined),
              title: const Text('Orçamentos'),
              onTap: () => _go(context, '/orcamentos'),
            ),
            ListTile(
              leading: const Icon(Icons.build_outlined),
              title: const Text('Serviços'),
              onTap: () => _go(context, '/servicos'),
            ),
            const Spacer(),
            const Divider(height: 1),
            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text('Sair'),
              onTap: () async {
                Navigator.of(context).pop();
                await context.read<AuthState>().logout();
                if (context.mounted) context.go('/login');
              },
            ),
          ],
        ),
      ),
    );
  }

  void _go(BuildContext context, String route) {
    Navigator.of(context).pop();
    context.go(route);
  }
}
