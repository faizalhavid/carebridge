import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'app_colors.dart';

class AppIconButton extends StatelessWidget {
  final IconData? icon;
  final String? iconPath;
  final Color? iconColor;
  final double? iconSize;
  final double? borderRadius;
  final double? radius;
  final Function() onTap;

  const AppIconButton({
    super.key,
    this.icon,
    this.iconPath,
    this.iconColor,
    this.iconSize,
    this.borderRadius = 5,
    this.radius = 5,
    required this.onTap,
  }) : assert(
         icon != null || iconPath != null,
         'Either icon or iconPath must be provided.',
       );

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius!),
      ),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child:Padding(padding: EdgeInsets.all(radius!),
            child:
            icon != null
                ? Icon(
                  icon,
                  color: iconColor ?? appColors.primary,
                  size: iconSize ?? 24.0,
                )
                : SvgPicture.asset(
                    iconPath!,
                    color: iconColor ?? appColors.primary,
                    width: iconSize ?? 24.0,
                    height: iconSize ?? 24.0,
                  ),
            ),
      ),
    );
  }
}
