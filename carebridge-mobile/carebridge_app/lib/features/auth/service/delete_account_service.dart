import 'package:carebridge_app/features/auth/repository/delete_account_repository.dart';

class DeleteAccountService {
  static Future<bool> delete() async {
    return await DeleteAccountRepository.delete();
  }
}
