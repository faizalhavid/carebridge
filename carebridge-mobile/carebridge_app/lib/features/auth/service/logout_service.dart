import 'package:carebridge_app/features/auth/repository/logout_repository.dart';
import 'package:carebridge_app/shared/service/shared_pref_token_service.dart';

class LogoutService {
  static Future<bool> logout() async {
    final result = await LogoutRepository.logout();
    if (result) {
      await resetAll();
      return true;
    } else {
      return false;
    }
  }

  static Future<void> resetAll() async {
    await SharedPrefTokenService.resetAll();
  }
}
