import 'package:intl/intl.dart';

final _currency = NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$');

/// Formata um valor numérico como moeda brasileira (R$).
String formatMoeda(num value) => _currency.format(value);
