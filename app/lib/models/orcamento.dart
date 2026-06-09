import 'item.dart';
import 'pessoa.dart';

/// Estados possíveis de aprovação de um orçamento.
abstract class Aprovacao {
  static const aguardando = 'Aguardando';
  static const aprovado = 'Aprovado';
  static const naoAprovado = 'Nao Aprovado';
}

class Orcamento {
  Orcamento({
    required this.id,
    required this.descricao,
    required this.item,
    required this.cliente,
    required this.funcionario,
    required this.aprovacao,
  });

  final String id;
  final String descricao;
  final Item item;
  final Pessoa cliente;
  final Pessoa funcionario;
  final String aprovacao;

  bool get aguardando => aprovacao == Aprovacao.aguardando;

  factory Orcamento.fromJson(Map<String, dynamic> json) => Orcamento(
        id: (json['_id'] ?? '') as String,
        descricao: (json['descricao'] ?? '') as String,
        item: Item.fromJson((json['itens'] ?? const {}) as Map<String, dynamic>),
        cliente:
            Pessoa.fromJson((json['cliente'] ?? const {}) as Map<String, dynamic>),
        funcionario: Pessoa.fromJson(
            (json['funcionario'] ?? const {}) as Map<String, dynamic>),
        aprovacao: (json['aprovacao'] ?? Aprovacao.aguardando) as String,
      );
}
