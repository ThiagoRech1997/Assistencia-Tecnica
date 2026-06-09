import 'package:flutter_test/flutter_test.dart';

import 'package:app/models/orcamento.dart';
import 'package:app/models/servico.dart';

void main() {
  test('Orcamento.fromJson faz o parse do payload da API', () {
    final o = Orcamento.fromJson({
      '_id': 'abc123',
      'descricao': 'Troca de tela',
      'itens': {'descricao': 'Display', 'quantidade': 1, 'valor': 350},
      'cliente': {'nome': 'Maria', 'email': 'maria@exemplo.com'},
      'funcionario': {'nome': 'João', 'email': 'joao@exemplo.com'},
      'aprovacao': Aprovacao.aguardando,
    });

    expect(o.id, 'abc123');
    expect(o.descricao, 'Troca de tela');
    expect(o.item.valor, 350);
    expect(o.cliente.email, 'maria@exemplo.com');
    expect(o.aguardando, isTrue);
  });

  test('Servico.fromOrcamentoPayload herda dados do orçamento e abre serviço',
      () {
    final o = Orcamento.fromJson({
      '_id': 'abc123',
      'descricao': 'Troca de tela',
      'itens': {'descricao': 'Display', 'quantidade': 1, 'valor': 350},
      'cliente': {'nome': 'Maria', 'email': 'maria@exemplo.com'},
      'funcionario': {'nome': 'João', 'email': 'joao@exemplo.com'},
      'aprovacao': Aprovacao.aprovado,
    });

    final payload = Servico.fromOrcamentoPayload(o);

    expect(payload['descricao'], 'Troca de tela');
    expect(payload['valor'], 350);
    expect(payload['status'], StatusServico.aberto);
    expect((payload['cliente'] as Map)['email'], 'maria@exemplo.com');
  });
}
