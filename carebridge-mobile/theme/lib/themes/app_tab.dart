import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_fonts.dart';

class AppTab extends StatelessWidget {
  final String text;
  final bool isActive;
  final Function() onTap;
  const AppTab({
    Key? key,
    required this.text,
    required this.isActive,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: isActive ? appColors.primary : appColors.disabledButton,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Text(
            text,
            textAlign: TextAlign.center,
            style:
                isActive
                    ? appFonts.semibold.white.ts
                    : appFonts.semibold.primary.ts,
          ),
        ),
      ),
    );
  }
}
