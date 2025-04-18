import 'package:dio/dio.dart';
import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';

class DeleteAccountRepository {
  static Future<bool> delete() async {
    try {
      final response = await DioService.dio.post("/user/deactivate-account");
      final result = response.statusCode == 200;

      if (result) {
        return true;
      } else {
        throw ApiException(response.data["code"], response.data["message"]);
      }
    } on DioException catch (e) {
      throw ApiException(
        e.response?.statusCode,
        e.response?.data['message'] ?? e.response?.statusMessage,
      );
    } catch (e) {
      throw Exception(e);
    }
  }
}
