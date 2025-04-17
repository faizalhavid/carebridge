import 'package:another_flushbar/flushbar.dart';
import 'package:carebridge_theme/themes/app_colors.dart';
import 'package:carebridge_theme/themes/app_fonts.dart';
import 'package:flutter/widgets.dart';

class SnackbarHelper {
  static void showSnackbarError(BuildContext context, String message) {
    Flushbar(
      messageText: Text(message, style: appFonts.caption.white.ts),
      duration: const Duration(seconds: 3),
      backgroundColor: appColors.error,
      margin: const EdgeInsets.all(8),
      borderRadius: BorderRadius.circular(10),
    ).show(context);
  }

  static void showSnackbarSuccess(BuildContext context, String message) {
    Flushbar(
      messageText: Text(message, style: appFonts.caption.white.ts),
      duration: const Duration(seconds: 3),
      backgroundColor: appColors.success,
      margin: const EdgeInsets.all(8),
      borderRadius: BorderRadius.circular(10),
    ).show(context);
  }
}
