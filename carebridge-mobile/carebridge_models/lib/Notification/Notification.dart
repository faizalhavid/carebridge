import 'package:carebridge_models/hive_constant.dart';
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Notification.g.dart';

@JsonSerializable()
@CopyWith()
@HiveType(typeId: HiveConst.notificationId)
class AppNotification {
  @HiveField(0)
  final String id;
  @HiveField(1)
  final String title;
  @HiveField(2)
  final String body;
  @HiveField(3)
  final Map<String, dynamic> payload;
  @HiveField(4)
  final bool isRead;

  AppNotification({
    required this.id,
    required this.title,
    required this.body,
    required this.payload,
    required this.isRead,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) =>
      _$AppNotificationFromJson(json);

  Map<String, dynamic> toJson() => _$AppNotificationToJson(this);
}
