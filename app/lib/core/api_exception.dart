/// Exceção de domínio para erros vindos da API.
///
/// Normaliza as respostas de erro da API (que retorna `{ error: "..." }` ou
/// `{ message: "..." }`) numa mensagem amigável para a UI.
class ApiException implements Exception {
  ApiException(this.message, {this.statusCode});

  final String message;
  final int? statusCode;

  @override
  String toString() => message;
}
