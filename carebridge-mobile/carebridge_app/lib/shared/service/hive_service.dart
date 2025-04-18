import 'package:hive_flutter/hive_flutter.dart';

class HiveService {
  static Future<void> clearAll() async {
    await Hive.deleteFromDisk();
  }
}
