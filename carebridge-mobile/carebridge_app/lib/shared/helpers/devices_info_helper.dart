import 'dart:io';
import 'package:carebridge_models/accounts/DeviceInfo/DeviceInfo.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:network_info_plus/network_info_plus.dart';

class DeviceInfoHelper {
  static Future<DeviceInfo> getDeviceInfo() async {
    final deviceInfoPlugin = DeviceInfoPlugin();
    final networkInfo = NetworkInfo();
    String operatingSystem = '';
    String osVersion = '';
    String deviceToken = '';
    String ipAddress = '';

    // Get operating system and version
    if (Platform.isAndroid) {
      final androidInfo = await deviceInfoPlugin.androidInfo;
      operatingSystem = 'Android';
      osVersion = androidInfo.version.release ?? 'Unknown';
    } else if (Platform.isIOS) {
      final iosInfo = await deviceInfoPlugin.iosInfo;
      operatingSystem = 'iOS';
      osVersion = iosInfo.systemVersion ?? 'Unknown';
    }

    // Get device token
    deviceToken = await FirebaseMessaging.instance.getToken() ?? 'Unknown';

    // Get IP address
    ipAddress = await networkInfo.getWifiIP() ?? 'Unknown';

    return DeviceInfo(
      operatingSystem: operatingSystem,
      osVersion: osVersion,
      deviceToken: deviceToken,
      ipAddress: ipAddress,
    );
  }
}
