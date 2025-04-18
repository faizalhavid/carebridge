import 'package:carebridge_app/features/auth/service/register_service.dart';
import 'package:carebridge_app/shared/bloc/state_controller.dart';
import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/fcm_service.dart';
import 'package:carebridge_app/shared/service/logger_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RegisterCubit extends Cubit<StateController<bool>> {
  RegisterCubit() : super(StateController.idle());

  Future<void> registerAccount({
    required String fullName,
    required String email,
    required String password,
    required String confirmPassword,
    required String token,
    required String mobilePhone,
    required String fcmToken,
  }) async {
    emit(StateController.loading());
    try {
      final fcmToken = await FCMService.getFCMToken();
      final result = await RegisterService.registerAccount(
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        token: token,
        mobilePhone: mobilePhone,
        fcmToken: fcmToken,
      );
      emit(StateController.success(result));
    } on ApiException catch (e, s) {
      LoggerService.logger.e("Failed to register", error: e, stackTrace: s);
      emit(
        StateController.error(
          errorMessage: e.message ?? "Something went wrong",
          code: e.code,
        ),
      );
    } catch (e, s) {
      LoggerService.logger.e("Failed to register", error: e, stackTrace: s);
      emit(StateController.error(errorMessage: e.toString()));
    }
  }

  Future<void> registerEmail(String email) async {
    emit(StateController.loading());
    try {
      final result = await RegisterService.registerEmail(email);
      emit(StateController.success(result));
    } on ApiException catch (e, s) {
      LoggerService.logger.e("Failed to register", error: e, stackTrace: s);
      emit(
        StateController.error(
          errorMessage: e.message ?? "Something went wrong",
          code: e.code,
        ),
      );
    } catch (e, s) {
      LoggerService.logger.e("Failed to register", error: e, stackTrace: s);
      emit(StateController.error(errorMessage: e.toString()));
    }
  }
}
