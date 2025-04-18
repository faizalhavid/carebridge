import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:dio/dio.dart';

class RegisterRepository {
  static Future<bool> registerEmail(String email) async {
    try {
      final response = await DioService.dio.post(
        "/auth/register-email",
        data: {"email": email},
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        throw ApiException(response.data['code'], response.data['message']);
      }
    } on DioException catch (e) {
      throw ApiException(e.response?.data['code'], e.response?.data['message']);
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
        return true; // Registration successful
      } else {
        throw ApiException(response.data['code'], response.data['message']);
      }
    } on DioException catch (e) {
      throw ApiException(e.response?.data['code'], e.response?.data['message']);
    } catch (e) {
      throw Exception(e);
    }
  }
}
