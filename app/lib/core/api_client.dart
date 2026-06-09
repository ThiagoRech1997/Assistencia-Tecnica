import 'package:dio/dio.dart';

import 'api_exception.dart';
import 'config.dart';
import 'secure_storage.dart';

/// Cliente HTTP central da aplicação.
///
/// Equivalente moderno ao `services/api.js` do app antigo: configura a URL
/// base, injeta o token `Bearer` automaticamente em cada requisição e
/// normaliza erros em [ApiException].
class ApiClient {
  ApiClient(this._storage, {Dio? dio})
      : _dio = dio ??
            Dio(
              BaseOptions(
                baseUrl: AppConfig.apiBaseUrl,
                connectTimeout: const Duration(seconds: 10),
                receiveTimeout: const Duration(seconds: 10),
                contentType: Headers.jsonContentType,
              ),
            ) {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _storage.token;
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
      ),
    );
  }

  final Dio _dio;
  final SecureStorage _storage;

  Future<dynamic> get(String path) => _request(() => _dio.get(path));

  Future<dynamic> post(String path, {Object? data}) =>
      _request(() => _dio.post(path, data: data));

  Future<dynamic> put(String path, {Object? data}) =>
      _request(() => _dio.put(path, data: data));

  Future<dynamic> delete(String path, {Object? data}) =>
      _request(() => _dio.delete(path, data: data));

  Future<dynamic> _request(Future<Response> Function() send) async {
    try {
      final response = await send();
      return response.data;
    } on DioException catch (e) {
      throw _toApiException(e);
    }
  }

  ApiException _toApiException(DioException e) {
    final data = e.response?.data;
    String message = 'Falha de conexão com o servidor';
    if (data is Map) {
      message = (data['error'] ?? data['message'] ?? message).toString();
    } else if (e.type == DioExceptionType.connectionTimeout ||
        e.type == DioExceptionType.connectionError) {
      message = 'Não foi possível conectar à API ($_baseUrlHint)';
    }
    return ApiException(message, statusCode: e.response?.statusCode);
  }

  String get _baseUrlHint => _dio.options.baseUrl;
}
