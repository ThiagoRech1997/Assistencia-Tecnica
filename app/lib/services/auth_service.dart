import '../core/api_client.dart';
import '../models/usuario.dart';

/// Operações de autenticação e cadastro de usuário/cliente.
class AuthService {
  AuthService(this._api);

  final ApiClient _api;

  /// POST /users/auth
  Future<Usuario> autenticar({
    required String email,
    required String senha,
  }) async {
    final data = await _api.post('/users/auth', data: {
      'email': email,
      'senha': senha,
    });
    return Usuario.fromJson(data as Map<String, dynamic>);
  }

  /// POST /users — cria o usuário (login). Tipo padrão "Cliente".
  Future<void> cadastrarUsuario({
    required String nome,
    required String email,
    required String senha,
    String tipo = 'Cliente',
  }) async {
    await _api.post('/users', data: {
      'nome': nome,
      'email': email,
      'senha': senha,
      'tipo': tipo,
    });
  }

  /// POST /clientes — cria o registro de cliente associado.
  Future<void> cadastrarCliente({
    required String nome,
    required String cpf,
    required String telefone,
    required String email,
  }) async {
    await _api.post('/clientes', data: {
      'nome': nome,
      'cpf': cpf,
      'telefone': telefone,
      'email': email,
    });
  }
}
