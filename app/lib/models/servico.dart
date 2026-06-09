import 'item.dart';
import 'orcamento.dart';
import 'pessoa.dart';

/// Status possíveis de um serviço.
abstract class StatusServico {
  static const aberto = 'Aberto';
  static const emAndamento = 'Em Andamento';
  static const concluido = 'Concluido';
}

class Servico {
  Servico({
    required this.id,
    required this.descricao,
    required this.item,
    required this.cliente,
    required this.funcionario,
    required this.valor,
    required this.status,
  });

  final String id;
  final String descricao;
  final Item item;
  final Pessoa cliente;
  final Pessoa funcionario;
  final num valor;
  final String status;

  factory Servico.fromJson(Map<String, dynamic> json) => Servico(
        id: (json['_id'] ?? '') as String,
        descricao: (json['descricao'] ?? '') as String,
        item: Item.fromJson((json['itens'] ?? const {}) as Map<String, dynamic>),
        cliente:
            Pessoa.fromJson((json['cliente'] ?? const {}) as Map<String, dynamic>),
        funcionario: Pessoa.fromJson(
            (json['funcionario'] ?? const {}) as Map<String, dynamic>),
        valor: (json['valor'] ?? 0) as num,
        status: (json['status'] ?? StatusServico.aberto) as String,
      );

  /// Monta o payload de criação de um serviço a partir de um orçamento
  /// aprovado — espelha a regra de negócio do app antigo (aprovar um
  /// orçamento abre um serviço).
  static Map<String, dynamic> fromOrcamentoPayload(Orcamento o) => {
        'descricao': o.descricao,
        'itens': o.item.toJson(),
        'cliente': o.cliente.toJson(),
        'funcionario': o.funcionario.toJson(),
        'valor': o.item.valor,
        'status': StatusServico.aberto,
      };
}
