import 'package:firebase_messaging/firebase_messaging.dart';

class FCMService {
  static Future<String> getFCMToken() async {
    final token = await FirebaseMessaging.instance.getToken();
    if (token != null) {
      return token;
    } else {
      throw Exception("Failed to get FCM Token");
    }
  }
}
