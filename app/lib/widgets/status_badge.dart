import 'package:flutter/material.dart';

import '../models/orcamento.dart';
import '../models/servico.dart';

/// Chip colorido que representa o status de um orçamento ou serviço.
class StatusBadge extends StatelessWidget {
  const StatusBadge(this.status, {super.key});

  final String status;

  Color _color(BuildContext context) {
    switch (status) {
      case Aprovacao.aprovado:
      case StatusServico.concluido:
        return Colors.green;
      case Aprovacao.naoAprovado:
        return Colors.red;
      case StatusServico.emAndamento:
        return Colors.orange;
      case Aprovacao.aguardando:
      case StatusServico.aberto:
      default:
        return Colors.blueGrey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.5)),
      ),
      child: Text(
        status,
        style: TextStyle(color: color, fontWeight: FontWeight.w600, fontSize: 12),
      ),
    );
  }
}
