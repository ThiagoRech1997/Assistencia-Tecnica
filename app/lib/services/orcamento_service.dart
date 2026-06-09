import '../core/api_client.dart';
import '../models/orcamento.dart';

class OrcamentoService {
  OrcamentoService(this._api);

  final ApiClient _api;

  /// GET /orcamentos
  ///
  /// A API escopa o resultado pelo usuário autenticado: um cliente recebe
  /// apenas os próprios orçamentos (o filtro por dono é feito no servidor).
  Future<List<Orcamento>> listar() async {
    final data = await _api.get('/orcamentos');
    final list = (data as List).cast<Map<String, dynamic>>();
    return list.map(Orcamento.fromJson).toList();
  }

  /// PUT /orcamentos/aprovacao/:id
  Future<void> definirAprovacao(String id, String aprovacao) async {
    await _api.put('/orcamentos/aprovacao/$id', data: {'aprovacao': aprovacao});
  }
}
