import 'package:go_router/go_router.dart';

import '../models/orcamento.dart';
import '../screens/aprova_orcamento_screen.dart';
import '../screens/cadastro_screen.dart';
import '../screens/home_screen.dart';
import '../screens/login_screen.dart';
import '../screens/orcamentos_screen.dart';
import '../screens/servicos_screen.dart';
import '../state/auth_state.dart';

/// Configuração de navegação. Redireciona para /login quando não autenticado
/// e mantém o usuário fora das telas de auth depois de logado.
GoRouter buildRouter(AuthState auth) {
  return GoRouter(
    initialLocation: '/',
    refreshListenable: auth,
    redirect: (context, state) {
      // Aguarda o bootstrap da sessão.
      if (auth.status == AuthStatus.desconhecido) return null;

      final logado = auth.isAutenticado;
      final emAuth = state.matchedLocation == '/login' ||
          state.matchedLocation == '/cadastro';

      if (!logado && !emAuth) return '/login';
      if (logado && state.matchedLocation == '/login') return '/';
      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (_, _) => const LoginScreen()),
      GoRoute(path: '/cadastro', builder: (_, _) => const CadastroScreen()),
      GoRoute(path: '/', builder: (_, _) => const HomeScreen()),
      GoRoute(
        path: '/orcamentos',
        builder: (_, _) => const OrcamentosScreen(),
      ),
      GoRoute(
        path: '/orcamentos/aprovar',
        builder: (context, state) =>
            AprovaOrcamentoScreen(orcamento: state.extra as Orcamento),
      ),
      GoRoute(path: '/servicos', builder: (_, _) => const ServicosScreen()),
    ],
  );
}
