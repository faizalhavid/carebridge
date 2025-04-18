import 'package:carebridge_app/features/auth/repository/login_repository.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:carebridge_app/shared/service/shared_pref_profile_service.dart';
import 'package:carebridge_app/shared/service/shared_pref_token_service.dart';

class LoginService {
  static Future<bool> login(String email, String password) async {
    final (token, user) = await LoginRepository.login(email, password);
    await SharedPrefTokenService.setToken(token);
    await SharedPrefProfileService.setProfile(user);
    DioService.initWithToken();
    return true;
  }

  static Future<bool> isLoggedIn() async {
    DioService.reset();
    try {
      final token = await SharedPrefTokenService.getToken();
      if (token != null) {
        await DioService.initWithToken();
        return true;
      } else {
        DioService.init();
        return false;
      }
    } catch (e) {
      throw Exception(e);
    }
  }
}
