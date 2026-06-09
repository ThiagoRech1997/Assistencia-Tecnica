/// Configuração da aplicação.
///
/// A URL base da API pode ser sobrescrita em tempo de build/execução com:
///   flutter run --dart-define=API_BASE_URL=http://192.168.0.10:3050
///
/// Padrões por plataforma de desenvolvimento:
///   - Emulador Android: 10.0.2.2 mapeia para o localhost da máquina host.
///   - Simulador iOS / Web: localhost funciona diretamente.
/// Para um dispositivo físico, use o IP da sua máquina na rede local.
class AppConfig {
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:3050',
  );
}
