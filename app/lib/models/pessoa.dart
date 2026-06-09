/// Representa o sub-documento de cliente ou funcionário embutido em
/// orçamentos e serviços (apenas nome e e-mail, como na API).
class Pessoa {
  Pessoa({required this.nome, required this.email});

  final String nome;
  final String email;

  factory Pessoa.fromJson(Map<String, dynamic> json) => Pessoa(
        nome: (json['nome'] ?? '') as String,
        email: (json['email'] ?? '') as String,
      );

  Map<String, dynamic> toJson() => {'nome': nome, 'email': email};
}
