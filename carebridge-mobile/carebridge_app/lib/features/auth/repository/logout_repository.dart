import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:dio/dio.dart';

class LogoutRepository {
  static Future<bool> logout() async {
    try {
      final response = await DioService.dio.post("/auth/logout");
      final result = response.data['code'] == 200;
      if (result) {
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
}
