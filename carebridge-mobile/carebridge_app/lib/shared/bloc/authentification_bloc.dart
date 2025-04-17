import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

abstract class AuthenticationEvent extends Equatable {}

class LogIn extends AuthenticationEvent {
  final String email;
  final String password;

  LogIn({required this.email, required this.password});

  @override
  List<Object?> get props => [];
}

class LogOut extends AuthenticationEvent {
  @override
  List<Object?> get props => [];
}

class LogOutAfterDelete extends AuthenticationEvent {
  @override
  List<Object?> get props => [];
}

class AuthCheck extends AuthenticationEvent {
  @override
  List<Object?> get props => [];
}

abstract class AuthenticationState extends Equatable {}

class AuthInital extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class AuthLoading extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class AuthFailed extends AuthenticationState {
  final int? code;
  final String? message;

  AuthFailed({required this.message, this.code});

  @override
  List<Object?> get props => [message, code];
}

class LoggedIn extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class LoggedOut extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc() : super(AuthInital()) {
    on<AuthCheck>((event, emit) async {
      emit(AuthLoading());
      try {
        final result = await LoginService.isLoggedIn();
        if (result) {
          emit(LoggedIn());
        } else {
          await LogoutService.resetAll();
          emit(LoggedOut());
        }
      } catch (e) {
        emit(AuthFailed(message: "Silahkan Login kembali"));
        emit(LoggedOut());
      }
    });

    on<LogIn>((event, emit) async {
      emit(AuthLoading());
      try {
        final result = await LoginService.login(event.email, event.password);
        if (result) {
          emit(LoggedIn());
        } else {
          await LogoutService.resetAll();
          emit(AuthFailed(message: "Login Failed"));
        }
      } on ApiException catch (e, s) {
        LoggerService.logger.e("Failed Login", error: e, stackTrace: s);
        await LogoutService.resetAll();
        emit(AuthFailed(message: e.message, code: e.code));
      } catch (e, s) {
        LoggerService.logger.e("Failed Login", error: e, stackTrace: s);
        await LogoutService.resetAll();
        emit(AuthFailed(message: e.toString()));
      }
    });

    on<LogOut>((event, emit) async {
      emit(AuthLoading());
      try {
        final result = await LogoutService.logout();
        if (result) {
          await HiveService.clearAll();
          emit(LoggedOut());
        } else {
          emit(AuthFailed(message: "Gagal Logout"));
        }
      } on ApiException catch (e, s) {
        LoggerService.logger.e("Failed Logout", error: e, stackTrace: s);
        emit(AuthFailed(message: e.message, code: e.code));
      } catch (e, s) {
        LoggerService.logger.e("Failed Logout", error: e, stackTrace: s);
        emit(AuthFailed(message: e.toString()));
      }
    });

    on<LogOutAfterDelete>((event, emit) async {
      emit(AuthLoading());
      try {
        await LogoutService.resetAll();
        await HiveService.clearAll();
        emit(LoggedOut());
      } on ApiException catch (e, s) {
        LoggerService.logger.e("Failed Logout", error: e, stackTrace: s);
        emit(AuthFailed(message: e.message, code: e.code));
      } catch (e, s) {
        LoggerService.logger.e("Failed Logout", error: e, stackTrace: s);
        emit(AuthFailed(message: e.toString()));
      }
    });
  }
}
