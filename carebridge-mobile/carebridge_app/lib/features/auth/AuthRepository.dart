import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:dio/dio.dart';
import 'package:carebridge_models/carebridge_models.dart';

class AuthRepository {
  static Future<(String, User)> login(String email, String password) async {
    try {
      final response = await DioService.dio.post(
        "/auth/login",
        data: {"email": email, "password": password},
      );
      final token = response.data["data"]["access_token"] as String?;
      final user = User.fromJson(response.data["data"]["user"]);
      if (token != null && token.isNotEmpty) {
        return (token, user);
      } else {
        throw Exception("Failed to login");
      }
    } on DioException catch (e) {
      throw ApiException(
        e.response?.statusCode ?? 500,
        e.response?.data['message'] ?? "Something went wrong",
        e.requestOptions.uri.toString() ?? "",
      );
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  static Future<bool> registerEmail(String email) async {
    try {
      final response = await DioService.dio.post(
        "/auth/register-email",
        data: {"email": email},
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        throw ApiException(
          response.data['code'],
          response.data['message'],
          response.realUri.toString(),
        );
      }
    } on DioException catch (e) {
      throw ApiException(
        e.response?.data['code'],
        e.response?.data['message'],
        e.requestOptions.uri.toString() ?? "",
      );
    } catch (e) {
      throw Exception(e);
    }
  }

  static Future<bool> registerAccount({
    required String fullName,
    required String email,
    required String password,
    required String confirmPassword,
    required String token,
    required String mobilePhone,
    required String fcmToken,
  }) async {
    try {
      final data = {
        "fullName": fullName,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "token": token,
        "mobilePhone": mobilePhone,
        "fcmToken": fcmToken,
      };
      final response = await DioService.dio.post(
        "/auth/register-account",
        data: data,
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        throw ApiException(
          response.data['code'],
          response.data['message'],
          response.realUri.toString(),
        );
      }
    } on DioException catch (e) {
      throw ApiException(
        e.response?.data['code'],
        e.response?.data['message'],
        e.requestOptions.uri.toString() ?? "",
      );
    } catch (e) {
      throw Exception(e);
    }
  }

  static Future<bool> logout() async {
    try {
      final response = await DioService.dio.post("/auth/logout");
      final result = response.data['code'] == 200;
      if (result) {
        return true;
      } else {
        throw ApiException(
          response.data['code'],
          response.data['message'],
          response.realUri.toString(),
        );
      }
    } on DioException catch (e) {
      throw ApiException(
        e.response?.data['code'],
        e.response?.data['message'],
        e.requestOptions.uri.toString() ?? "",
      );
    } catch (e) {
      throw Exception(e);
    }
  }

  static Future<bool> delete() async {
    try {
      final response = await DioService.dio.post("/user/deactivate-account");
      final result = response.statusCode == 200;

      if (result) {
        return true;
      } else {
        throw ApiException(
          response.data["code"],
          response.data["message"],
          response.realUri.toString(),
        );
      }
    } on DioException catch (e) {
      throw ApiException(
        e.response?.statusCode,
        e.response?.data['message'] ?? e.response?.statusMessage,
        e.requestOptions.uri.toString() ?? "",
      );
    } catch (e) {
      throw Exception(e);
    }
  }
}
