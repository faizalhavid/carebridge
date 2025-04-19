import 'package:envied/envied.dart';

part 'app_config.g.dart';

@Envied(path: ".env")
abstract class AppConfig {
  @EnviedField(varName: "API_ENDPOINT")
  static const String apiEndpoint = _AppConfig.apiEndpoint;
}
