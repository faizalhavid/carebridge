import 'package:carebridge_app/features/auth/service/delete_account_service.dart';
import 'package:carebridge_app/shared/bloc/authentification_bloc.dart';
import 'package:carebridge_app/shared/bloc/state_controller.dart';
import 'package:carebridge_app/shared/exception/api_exception.dart';
import 'package:carebridge_app/shared/service/logger_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DeleteAccountCubit extends Cubit<StateController<bool>> {
  final AuthenticationBloc authenticationBloc;
  DeleteAccountCubit(this.authenticationBloc) : super(StateController.idle());

  Future<void> deleteAccount() async {
    emit(StateController.loading());
    try {
      final result = await DeleteAccountService.delete();
      emit(StateController.success(result));
      authenticationBloc.add(LogOutAfterDelete());
    } on ApiException catch (e, s) {
      LoggerService.logger.e(
        "Failed to delete account",
        error: e,
        stackTrace: s,
      );
      emit(
        StateController.error(
          errorMessage: e.message ?? "Something went wrong",
          code: e.code,
        ),
      );
    } catch (e, s) {
      LoggerService.logger.e(
        "Failed to delete account",
        error: e,
        stackTrace: s,
      );
      emit(StateController.error(errorMessage: e.toString()));
    }
  }
}
