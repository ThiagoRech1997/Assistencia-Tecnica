import '../core/api_client.dart';
import '../models/orcamento.dart';

class OrcamentoService {
  OrcamentoService(this._api);

  final ApiClient _api;

  /// GET /orcamentos
  ///
  /// NOTA: a API atual retorna todos os orçamentos; a filtragem por cliente
  /// é feita no app (ver [doCliente]). O ideal seria a API filtrar pelo
  /// usuário autenticado — fica como melhoria de contrato.
  Future<List<Orcamento>> listar() async {
    final data = await _api.get('/orcamentos');
    final list = (data as List).cast<Map<String, dynamic>>();
    return list.map(Orcamento.fromJson).toList();
  }

  /// Orçamentos do cliente com o e-mail informado.
  Future<List<Orcamento>> doCliente(String email) async {
    final todos = await listar();
    return todos.where((o) => o.cliente.email == email).toList();
  }

  /// PUT /orcamentos/aprovacao/:id
  Future<void> definirAprovacao(String id, String aprovacao) async {
    await _api.put('/orcamentos/aprovacao/$id', data: {'aprovacao': aprovacao});
  }
}
