import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';

import 'app_colors.dart';
import 'app_fonts.dart';

class AppOtpTextField extends StatelessWidget {
  final Function(String value) onSubmit;
  const AppOtpTextField({Key? key, required this.onSubmit}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return OtpTextField(
      numberOfFields: 4,
      fieldWidth: 65,
      textStyle: appFonts.bold.subtitle.ts,
      borderColor: appColors.primary,
      focusedBorderColor: appColors.primary,
      hasCustomInputDecoration: true,
      autoFocus: true,
      decoration: InputDecoration(
        counterText: "",
        contentPadding: const EdgeInsets.symmetric(
          vertical: 18,
          horizontal: 6,
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: appColors.primary,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(100),
        ),
        border: OutlineInputBorder(
          borderSide: BorderSide(
            color: appColors.primary,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(100),
        ),
      ),
      onSubmit: onSubmit,
    );
  }
}
