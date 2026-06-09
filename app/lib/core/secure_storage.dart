import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Armazenamento seguro de credenciais (token e dados do usuário logado).
///
/// Substitui o AsyncStorage do app antigo — o token agora fica no Keychain
/// (iOS) / Keystore (Android), e não em texto puro.
class SecureStorage {
  SecureStorage([FlutterSecureStorage? storage])
      : _storage = storage ?? const FlutterSecureStorage();

  final FlutterSecureStorage _storage;

  static const _kToken = 'token';
  static const _kNome = 'nome';
  static const _kEmail = 'email';
  static const _kTipo = 'tipo';

  Future<void> saveSession({
    required String token,
    required String nome,
    required String email,
    required String tipo,
  }) async {
    await Future.wait([
      _storage.write(key: _kToken, value: token),
      _storage.write(key: _kNome, value: nome),
      _storage.write(key: _kEmail, value: email),
      _storage.write(key: _kTipo, value: tipo),
    ]);
  }

  Future<String?> get token => _storage.read(key: _kToken);
  Future<String?> get nome => _storage.read(key: _kNome);
  Future<String?> get email => _storage.read(key: _kEmail);
  Future<String?> get tipo => _storage.read(key: _kTipo);

  Future<void> clear() => _storage.deleteAll();
}
