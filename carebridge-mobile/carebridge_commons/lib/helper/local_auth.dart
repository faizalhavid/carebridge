import 'package:local_auth/local_auth.dart';

class LocalAuth {
  final LocalAuthentication _localAuth = LocalAuthentication();

  Future<bool> authenticateWithBiometrics() async {
    try {
      return await _localAuth.authenticate(
        localizedReason: 'Please authenticate to access this feature',
        options: const AuthenticationOptions(
          useErrorDialogs: true,
          stickyAuth: true,
          biometricOnly: true,
        ),
      );
    } catch (e) {
      print('Error during authentication: $e');
    }
    return false;
  }

  Future<bool> isAvailableToBiometricSecurity() async {
    try {
      bool isDeviceAvailable =
          await _localAuth.canCheckBiometrics &&
          await _localAuth.isDeviceSupported();

      return isDeviceAvailable;
    } catch (e) {
      print('Error checking biometric availability: $e');
      return false;
    }
  }
}
