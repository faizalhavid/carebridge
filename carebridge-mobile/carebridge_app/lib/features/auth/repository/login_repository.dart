import 'package:carebridge_app/features/auth/model/user.dart';
import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:dio/dio.dart';

class LoginRepository {
  static Future<(String, User)> login(String email, String password) async {
    try {
      final response = await DioService.dio.post(
        "auth/login",
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
      );
    } catch (e) {
      throw Exception(e.toString());
    }
  }
}
