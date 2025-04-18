import 'dart:convert';

import 'package:carebridge_app/features/auth/model/user.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SharedPrefProfileService {
  static const String _kProfile = "profile";

  static Future<void> setProfile(User user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kProfile, jsonEncode(user.toJson()));
  }

  static Future<User?> getProfile() async {
    final prefs = await SharedPreferences.getInstance();
    final user = prefs.getString(_kProfile);

    if (user == null) return null;
    return User.fromJson(jsonDecode(user));
  }

  static Future<int?> getCustomerId() async {
    final user = await getProfile();
    return user?.id;
  }

  static Future<void> removeProfile() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kProfile);
  }
}
