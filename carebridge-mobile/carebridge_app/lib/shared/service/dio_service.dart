import 'package:carebridge_app/shared/config/app_config.dart';
import 'package:carebridge_app/shared/service/shared_pref_token_service.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../features/auth/AuthService.dart';
import '../bloc/authentification_bloc.dart';

class DioService {
  static Dio dio = Dio();

  static void reset() {
    dio = Dio();
  }

  static void init() {
    dio.options.baseUrl = AppConfig.apiEndpoint;
    dio.options.connectTimeout = const Duration(seconds: 500);
    dio.options.receiveTimeout = const Duration(seconds: 500);
    dio.options.headers = {'Content-Type': 'application/json'};
    dio.interceptors.add(LogInterceptor(responseBody: true));
  }

  static Future<void> initWithToken() async {
    final token = await SharedPrefTokenService.getToken();
    final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

    dio.options.baseUrl = AppConfig.apiEndpoint;
    dio.options.connectTimeout = const Duration(seconds: 500);
    dio.options.receiveTimeout = const Duration(seconds: 500);
    dio.options.headers = {
      'Authorization': 'Bearer $token',
      "Accept": "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
    };
    dio.interceptors.add(LogInterceptor(responseBody: true));

    // handle token invalid and expired
    dio.interceptors.add(
      InterceptorsWrapper(
        onError: (DioError error, handler) async {
          if (error.response?.statusCode == 401) {
            final refreshResult = await AuthService.refreshToken();
            if (refreshResult) {
              final newToken = await SharedPrefTokenService.getToken();
              error.requestOptions.headers['Authorization'] =
                  'Bearer $newToken';
              final opts = Options(
                method: error.requestOptions.method,
                headers: error.requestOptions.headers,
              );
              final cloneReq = await dio.request(
                error.requestOptions.path,
                options: opts,
                data: error.requestOptions.data,
                queryParameters: error.requestOptions.queryParameters,
              );
              return handler.resolve(cloneReq);
            } else {
              // Jika gagal, trigger logout
              final context = BlocProvider.of<AuthenticationBloc>(
                navigatorKey.currentContext!,
              );
              context.add(LogOut());
            }
          }
          return handler.next(error);
        },
      ),
    );
  }
}
