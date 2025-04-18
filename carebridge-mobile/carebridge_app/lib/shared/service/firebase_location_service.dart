import 'package:geolocator/geolocator.dart';

class FirebaseLocationService {
  static Future<void> updateLocation({
    required int userId,
    required Position position,
  }) async {
    await FirebaseLocationService.updateLocation(
      userId: userId,
      position: position,
    );
  }
}
