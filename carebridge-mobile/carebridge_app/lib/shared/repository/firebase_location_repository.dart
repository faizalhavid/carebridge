import 'package:carebridge_app/shared/service/logger_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';

class FirebaseLocationRepository {
  static CollectionReference get _locationCollection =>
      FirebaseFirestore.instance.collection('locations');

  static Future<void> updateLocation({
    required int userId,
    required Position position,
  }) async {
    try {
      await _locationCollection
          .doc(userId.toString())
          .set({
            'position': position.toJson(),
            'userId': userId,
            'timestamp': FieldValue.serverTimestamp(),
          })
          .catchError((e) {
            throw e;
          });
    } catch (e, s) {
      LoggerService.logger.e(
        "Failed to update location",
        error: e,
        stackTrace: s,
      );
    }
  }
}
