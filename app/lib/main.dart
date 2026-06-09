import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/api_client.dart';
import 'core/secure_storage.dart';
import 'router/app_router.dart';
import 'services/auth_service.dart';
import 'services/orcamento_service.dart';
import 'services/servico_service.dart';
import 'state/auth_state.dart';
import 'theme/app_theme.dart';

void main() {
  // Garante que o binding de plataforma esteja pronto antes de usar
  // MethodChannels (ex.: flutter_secure_storage em AuthState.bootstrap()).
  WidgetsFlutterBinding.ensureInitialized();

  // Composição de dependências (injeção manual, de baixo para cima).
  final storage = SecureStorage();
  final api = ApiClient(storage);
  final authService = AuthService(api);
  final authState = AuthState(authService, storage)..bootstrap();

  runApp(
    MultiProvider(
      providers: [
        Provider<ApiClient>.value(value: api),
        Provider<OrcamentoService>(create: (_) => OrcamentoService(api)),
        Provider<ServicoService>(create: (_) => ServicoService(api)),
        ChangeNotifierProvider<AuthState>.value(value: authState),
      ],
      child: AssistenciaApp(authState: authState),
    ),
  );
}

class AssistenciaApp extends StatefulWidget {
  const AssistenciaApp({super.key, required this.authState});

  final AuthState authState;

  @override
  State<AssistenciaApp> createState() => _AssistenciaAppState();
}

class _AssistenciaAppState extends State<AssistenciaApp> {
  late final _router = buildRouter(widget.authState);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Assistência Técnica',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: _router,
    );
  }
}
