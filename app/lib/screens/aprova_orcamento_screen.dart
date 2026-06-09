import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../core/api_exception.dart';
import '../core/format.dart';
import '../models/orcamento.dart';
import '../services/orcamento_service.dart';
import '../services/servico_service.dart';

/// Tela de decisão de um orçamento. Ao aprovar, além de marcar o orçamento
/// como "Aprovado", abre automaticamente um serviço (regra de negócio
/// herdada do app antigo). Retorna `true` ao chamador se algo mudou.
class AprovaOrcamentoScreen extends StatefulWidget {
  const AprovaOrcamentoScreen({super.key, required this.orcamento});

  final Orcamento orcamento;

  @override
  State<AprovaOrcamentoScreen> createState() => _AprovaOrcamentoScreenState();
}

class _AprovaOrcamentoScreenState extends State<AprovaOrcamentoScreen> {
  bool _loading = false;

  Future<void> _decidir(String aprovacao) async {
    setState(() => _loading = true);
    final orcamentos = context.read<OrcamentoService>();
    final servicos = context.read<ServicoService>();
    try {
      await orcamentos.definirAprovacao(widget.orcamento.id, aprovacao);
      // Aprovar abre um serviço.
      if (aprovacao == Aprovacao.aprovado) {
        await servicos.abrirDeOrcamento(widget.orcamento);
      }
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(aprovacao == Aprovacao.aprovado
              ? 'Orçamento aprovado e serviço aberto!'
              : 'Orçamento recusado.'),
        ),
      );
      context.pop(true);
    } on ApiException catch (e) {
      _erro(e.message);
    } catch (_) {
      _erro('Não foi possível concluir a operação.');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  void _erro(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    final o = widget.orcamento;
    return Scaffold(
      appBar: AppBar(title: const Text('Aprovar orçamento')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(o.descricao,
                style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _linha('Item', o.item.descricao),
                    _linha('Quantidade', '${o.item.quantidade}'),
                    _linha('Valor', formatMoeda(o.item.valor)),
                    _linha('Funcionário', o.funcionario.nome),
                  ],
                ),
              ),
            ),
            const Spacer(),
            if (_loading)
              const Center(child: CircularProgressIndicator())
            else ...[
              FilledButton.icon(
                onPressed: () => _decidir(Aprovacao.aprovado),
                icon: const Icon(Icons.check),
                label: const Text('Aprovar'),
              ),
              const SizedBox(height: 12),
              OutlinedButton.icon(
                onPressed: () => _decidir(Aprovacao.naoAprovado),
                icon: const Icon(Icons.close),
                label: const Text('Recusar'),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () => context.pop(false),
                child: const Text('Cancelar'),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _linha(String label, String valor) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 4),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 110,
              child: Text(label,
                  style: const TextStyle(fontWeight: FontWeight.w600)),
            ),
            Expanded(child: Text(valor)),
          ],
        ),
      );
}
