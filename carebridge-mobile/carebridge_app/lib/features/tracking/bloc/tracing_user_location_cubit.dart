import 'package:carebridge_app/features/tracking/service/tracing_user_location_service.dart';
import 'package:carebridge_app/shared/service/logger_service.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

abstract class TrackingState extends Equatable {
  const TrackingState();
}

class InitialTrackingState extends TrackingState {
  const InitialTrackingState();

  @override
  List<Object?> get props => [];
}

class StartTrackingState extends TrackingState {
  final int orderId;
  const StartTrackingState(this.orderId);

  @override
  List<Object?> get props => [orderId];
}

class StopTrackingState extends TrackingState {
  final int orderId;
  const StopTrackingState(this.orderId);

  @override
  List<Object?> get props => [orderId];
}

class LoadingTrackingState extends TrackingState {
  final int orderId;
  const LoadingTrackingState(this.orderId);

  @override
  List<Object?> get props => [orderId];
}

class ErrorTrackingState extends TrackingState {
  final int orderId;
  final String errorMessage;
  const ErrorTrackingState(this.orderId, this.errorMessage);

  @override
  List<Object> get props => [orderId, errorMessage];
}

class TracingUserLocationCubit extends Cubit<TrackingState> {
  final TrackingUserLocationService _trackingService =
      TrackingUserLocationService();
  TracingUserLocationCubit() : super(const InitialTrackingState());

  void startTracking(int orderId) {
    emit(LoadingTrackingState(orderId));
    try {
      // BackgroundService.start();
      // _trackingService.startTracking(orderId);
      emit(StartTrackingState(orderId));
    } catch (e, s) {
      LoggerService.logger.e(
        "Failed to start tracking",
        error: e,
        stackTrace: s,
      );
      emit(ErrorTrackingState(orderId, e.toString()));
    }
  }

  void stopTracking(int orderId) {
    emit(LoadingTrackingState(orderId));
    try {
      // BackgroundService.stop();
      // _trackingService.stopTracking();
      emit(StopTrackingState(orderId));
    } catch (e, s) {
      LoggerService.logger.e(
        "Failed to stop tracking",
        error: e,
        stackTrace: s,
      );
      emit(ErrorTrackingState(orderId, e.toString()));
    }
  }
}
