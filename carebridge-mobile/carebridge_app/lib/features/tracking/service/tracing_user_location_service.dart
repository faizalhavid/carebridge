import 'dart:async';

import 'package:carebridge_app/shared/service/firebase_location_service.dart';
import 'package:geolocator/geolocator.dart';

class TrackingUserLocationService {
  static final TrackingUserLocationService _instance =
      TrackingUserLocationService._internal();

  factory TrackingUserLocationService() {
    return _instance;
  }

  TrackingUserLocationService._internal();
  StreamSubscription<Position>? _positionStreamSubscription;

  void startTracking(int userId) {
    _positionStreamSubscription = Geolocator.getPositionStream().listen((
      Position position,
    ) {
      FirebaseLocationService.updateLocation(
        userId: userId,
        position: position,
      );
    });
  }

  void stopTracking() {
    _positionStreamSubscription?.cancel();
  }

  static void sendLocationToFirebase({
    required int userId,
    required Position position,
  }) {
    FirebaseLocationService.updateLocation(userId: userId, position: position);
  }
}
