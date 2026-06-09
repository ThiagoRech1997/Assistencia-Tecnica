/// Usuário autenticado (resposta de POST /users/auth).
class Usuario {
  Usuario({
    required this.nome,
    required this.email,
    required this.token,
    required this.tipo,
  });

  final String nome;
  final String email;
  final String token;
  final String tipo;

  factory Usuario.fromJson(Map<String, dynamic> json) => Usuario(
        nome: (json['nome'] ?? '') as String,
        email: (json['email'] ?? '') as String,
        token: (json['token'] ?? '') as String,
        tipo: (json['tipo'] ?? 'Cliente') as String,
      );
}
