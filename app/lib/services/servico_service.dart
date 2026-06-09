import '../core/api_client.dart';
import '../models/orcamento.dart';
import '../models/servico.dart';

class ServicoService {
  ServicoService(this._api);

  final ApiClient _api;

  /// GET /servicos (filtragem por cliente feita no app — ver nota em
  /// OrcamentoService.listar).
  Future<List<Servico>> listar() async {
    final data = await _api.get('/servicos');
    final list = (data as List).cast<Map<String, dynamic>>();
    return list.map(Servico.fromJson).toList();
  }

  Future<List<Servico>> doCliente(String email) async {
    final todos = await listar();
    return todos.where((s) => s.cliente.email == email).toList();
  }

  /// POST /servicos — abre um serviço a partir de um orçamento aprovado.
  Future<void> abrirDeOrcamento(Orcamento orcamento) async {
    await _api.post('/servicos',
        data: Servico.fromOrcamentoPayload(orcamento));
  }
}
