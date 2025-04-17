import 'package:carebridge_models/Notification/Notification.dart';
import 'package:flutter/material.dart';
import 'package:theme/carebridge_themes.dart';

class NotificationItemWidget extends StatelessWidget {
  final AppNotification notification;
  final Function() onTap;
  final Function() onCloseTap;
  const NotificationItemWidget({
    Key? key,
    required this.notification,
    required this.onTap,
    required this.onCloseTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: notification.isRead ? appColors.white : appColors.disabledButton,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      elevation: 3,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      notification.title,
                      style: appFonts.subtitle.bold.primary.ts,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Material(
                    color: Colors.transparent,
                    child: InkWell(
                      onTap: onCloseTap,
                      child: Icon(
                        Icons.close,
                        size: 16,
                        color: appColors.primary,
                      ),
                    ),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 8),
                  Text(notification.body, style: appFonts.primary.ts),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
