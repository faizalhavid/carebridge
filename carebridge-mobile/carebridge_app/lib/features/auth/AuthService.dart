import 'package:carebridge_app/features/auth/AuthRepository.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:carebridge_app/shared/service/shared_pref_profile_service.dart';
import 'package:carebridge_app/shared/service/shared_pref_token_service.dart';

class AuthService {
  static Future<bool> login(String email, String password) async {
    final (token, user) = await AuthRepository.login(email, password);
    await SharedPrefTokenService.setToken(token);
    await SharedPrefProfileService.setProfile(user);
    DioService.initWithToken();
    return true;
  }

  static Future<bool> isLoggedIn() async {
    DioService.reset();
    try {
      final token = await SharedPrefTokenService.getToken();
      print("debug token: $token");
      if (token != null) {
        await DioService.initWithToken();
        return true;
      } else {
        print("dio service init");
        DioService.init();
        return false;
      }
    } catch (e) {
      throw Exception(e);
    }
  }

  static Future<bool> delete() async {
    return await AuthRepository.delete();
  }

  static Future<bool> logout() async {
    final result = await AuthRepository.logout();
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

  static Future<bool> registerAccount({
    required String fullName,
    required String email,
    required String password,
    required String confirmPassword,
    required String token,
    required String mobilePhone,
    required String fcmToken,
  }) async {
    final result = await AuthRepository.registerAccount(
      email: email,
      fullName: fullName,
      password: password,
      confirmPassword: confirmPassword,
      token: token,
      mobilePhone: mobilePhone,
      fcmToken: fcmToken,
    );
    return result;
  }

  static Future<bool> registerEmail(String email) async {
    return await AuthRepository.registerEmail(email);
  }
}
