import 'package:carebridge_app/features/auth/repository/register_repository.dart';

class RegisterService {
  static Future<bool> registerAccount({
    required String fullName,
    required String email,
    required String password,
    required String confirmPassword,
    required String token,
    required String mobilePhone,
    required String fcmToken,
  }) async {
    final result = await RegisterRepository.registerAccount(
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
    return await RegisterRepository.registerEmail(email);
  }
}
