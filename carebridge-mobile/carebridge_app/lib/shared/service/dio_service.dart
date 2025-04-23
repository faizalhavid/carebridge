import 'package:carebridge_app/shared/config/app_config.dart';
import 'package:carebridge_app/shared/service/shared_pref_token_service.dart';
import 'package:dio/dio.dart';

class DioService {
  static Dio dio = Dio();

  static void reset() {
    dio = Dio();
    print("debug uri after setting: ${dio.options.baseUrl}");
  }

  static void init() {
    print("AppConfig.apiEndpoint: ${AppConfig.apiEndpoint}"); // Debug print
    dio.options.baseUrl = AppConfig.apiEndpoint;
    print("debug uri after setting: ${dio.options.baseUrl}");
    dio.options.connectTimeout = const Duration(seconds: 500);
    dio.options.receiveTimeout = const Duration(seconds: 500);
    dio.options.headers = {'Content-Type': 'application/json'};
    dio.interceptors.add(LogInterceptor(responseBody: true));
  }

  static Future<void> initWithToken() async {
    final token = await SharedPrefTokenService.getToken();
    dio.options.baseUrl = AppConfig.apiEndpoint;
    dio.options.baseUrl = '192.168.137.1:8080/api/v1';
    dio.options.connectTimeout = const Duration(seconds: 500);
    dio.options.receiveTimeout = const Duration(seconds: 500);
    dio.options.headers = {
      'Authorization': 'Bearer $token',
      "Accept": "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
    };
    dio.interceptors.add(LogInterceptor(responseBody: true));
  }
}
