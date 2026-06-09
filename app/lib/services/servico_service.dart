import '../core/api_client.dart';
import '../models/orcamento.dart';
import '../models/servico.dart';

class ServicoService {
  ServicoService(this._api);

  final ApiClient _api;

  /// GET /servicos
  ///
  /// A API escopa o resultado pelo usuário autenticado: um cliente recebe
  /// apenas os próprios serviços (o filtro por dono é feito no servidor).
  Future<List<Servico>> listar() async {
    final data = await _api.get('/servicos');
    final list = (data as List).cast<Map<String, dynamic>>();
    return list.map(Servico.fromJson).toList();
  }

  /// POST /servicos — abre um serviço a partir de um orçamento aprovado.
  Future<void> abrirDeOrcamento(Orcamento orcamento) async {
    await _api.post('/servicos',
        data: Servico.fromOrcamentoPayload(orcamento));
  }
}
