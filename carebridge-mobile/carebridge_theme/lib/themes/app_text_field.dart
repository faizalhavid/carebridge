import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_fonts.dart';

enum LabelPosition {
  top,
  hint,
}

class AppTextField extends StatelessWidget {
  final String? label;
  final TextStyle? labelStyle;
  final Widget? suffixLabel;
  final String? hint;
  final bool obscureText;
  final bool multiLines;
  final Widget? suffixIcon;
  final TextEditingController? controller;
  final InputBorder? customBorder;
  final InputBorder? customFocusedBorder;
  final bool? enable;
  final String? Function(String?)? validator;
  final TextInputType? keyboardType;
  final LabelPosition labelPosition;

  const AppTextField({
    Key? key,
    this.label,
    this.labelStyle,
    this.suffixLabel,
    this.hint,
    this.obscureText = false,
    this.multiLines = false,
    this.suffixIcon,
    this.controller,
    this.customBorder,
    this.customFocusedBorder,
    this.enable,
    this.validator,
    this.keyboardType,
    this.labelPosition = LabelPosition.hint,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (labelPosition == LabelPosition.top && label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text(
              label!,
              style: labelStyle ?? appFonts.primary.ts,
            ),
          ),
        TextFormField(
          enabled: enable,
          controller: controller,
          style: appFonts.caption.ts,
          obscureText: obscureText,
          maxLines: multiLines ? 3 : 1,
          validator: validator,
          keyboardType: keyboardType,
          decoration: InputDecoration(
            filled: true,
            fillColor: appColors.white,
            hintText: labelPosition == LabelPosition.hint ? label : hint,
            hintStyle: appFonts.caption.primary.ts,
            contentPadding: const EdgeInsets.symmetric(
              vertical: 12,
              horizontal: 22,
            ),
            border: customBorder ?? border,
            enabledBorder: customBorder ?? border,
            focusedBorder: customFocusedBorder ?? focusedBorder,
            errorBorder: errorBorder,
            suffixIcon: suffixIcon,
            errorStyle: appFonts.caption.error.ts,
          ),
        ),
      ],
    );
  }

  InputBorder get border {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(multiLines ? 25 : 100),
      borderSide: BorderSide(color: Colors.transparent),
    );
  }

  InputBorder get focusedBorder {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(multiLines ? 25 : 100),
      borderSide: BorderSide(color: appColors.primary[400]!),
    );
  }

  InputBorder get errorBorder {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(multiLines ? 25 : 100),
      borderSide: BorderSide(color: appColors.error),
    );
  }
}