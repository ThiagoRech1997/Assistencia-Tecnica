import 'package:flutter/foundation.dart';

import '../core/secure_storage.dart';
import '../models/usuario.dart';
import '../services/auth_service.dart';

enum AuthStatus { desconhecido, autenticado, naoAutenticado }

/// Estado global de autenticação. Mantém a sessão e expõe ações de login,
/// cadastro e logout para a UI via Provider/ChangeNotifier.
class AuthState extends ChangeNotifier {
  AuthState(this._authService, this._storage);

  final AuthService _authService;
  final SecureStorage _storage;

  AuthStatus _status = AuthStatus.desconhecido;
  String? _nome;
  String? _email;
  String? _tipo;

  AuthStatus get status => _status;
  String? get nome => _nome;
  String? get email => _email;
  String? get tipo => _tipo;
  bool get isAutenticado => _status == AuthStatus.autenticado;

  /// Restaura a sessão do armazenamento seguro ao abrir o app.
  Future<void> bootstrap() async {
    final token = await _storage.token;
    if (token != null && token.isNotEmpty) {
      _nome = await _storage.nome;
      _email = await _storage.email;
      _tipo = await _storage.tipo;
      _status = AuthStatus.autenticado;
    } else {
      _status = AuthStatus.naoAutenticado;
    }
    notifyListeners();
  }

  Future<void> login({required String email, required String senha}) async {
    final Usuario user =
        await _authService.autenticar(email: email, senha: senha);
    await _storage.saveSession(
      token: user.token,
      nome: user.nome,
      email: user.email,
      tipo: user.tipo,
    );
    _nome = user.nome;
    _email = user.email;
    _tipo = user.tipo;
    _status = AuthStatus.autenticado;
    notifyListeners();
  }

  /// Cadastro de cliente. A rota POST /clientes exige autenticação, então o
  /// fluxo é: cria o usuário (rota pública) → autentica para obter o token →
  /// cria o registro de cliente já autenticado. Ao final, o usuário fica
  /// logado.
  ///
  /// Substitui o workaround do app antigo, que logava num usuário de teste
  /// fixo (usuario@batata.com) só para conseguir o token.
  Future<void> cadastrar({
    required String nome,
    required String cpf,
    required String telefone,
    required String email,
    required String senha,
  }) async {
    await _authService.cadastrarUsuario(
      nome: nome,
      email: email,
      senha: senha,
    );
    // Autentica com as credenciais recém-criadas (define a sessão e o token
    // usado pelo interceptor na chamada seguinte).
    await login(email: email, senha: senha);
    await _authService.cadastrarCliente(
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      email: email,
    );
  }

  Future<void> logout() async {
    await _storage.clear();
    _nome = null;
    _email = null;
    _tipo = null;
    _status = AuthStatus.naoAutenticado;
    notifyListeners();
  }
}
