/// Item de um orçamento/serviço (descrição, quantidade e valor unitário).
class Item {
  Item({
    required this.descricao,
    required this.quantidade,
    required this.valor,
  });

  final String descricao;
  final num quantidade;
  final num valor;

  factory Item.fromJson(Map<String, dynamic> json) => Item(
        descricao: (json['descricao'] ?? '') as String,
        quantidade: (json['quantidade'] ?? 0) as num,
        valor: (json['valor'] ?? 0) as num,
      );

  Map<String, dynamic> toJson() => {
        'descricao': descricao,
        'quantidade': quantidade,
        'valor': valor,
      };
}
