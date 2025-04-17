// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Notification.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$AppNotificationCWProxy {
  AppNotification id(String id);

  AppNotification title(String title);

  AppNotification body(String body);

  AppNotification payload(Map<String, dynamic> payload);

  AppNotification isRead(bool isRead);

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `AppNotification(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// AppNotification(...).copyWith(id: 12, name: "My name")
  /// ````
  AppNotification call({
    String id,
    String title,
    String body,
    Map<String, dynamic> payload,
    bool isRead,
  });
}

/// Proxy class for `copyWith` functionality. This is a callable class and can be used as follows: `instanceOfAppNotification.copyWith(...)`. Additionally contains functions for specific fields e.g. `instanceOfAppNotification.copyWith.fieldName(...)`
class _$AppNotificationCWProxyImpl implements _$AppNotificationCWProxy {
  const _$AppNotificationCWProxyImpl(this._value);

  final AppNotification _value;

  @override
  AppNotification id(String id) => this(id: id);

  @override
  AppNotification title(String title) => this(title: title);

  @override
  AppNotification body(String body) => this(body: body);

  @override
  AppNotification payload(Map<String, dynamic> payload) =>
      this(payload: payload);

  @override
  AppNotification isRead(bool isRead) => this(isRead: isRead);

  @override

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `AppNotification(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// AppNotification(...).copyWith(id: 12, name: "My name")
  /// ````
  AppNotification call({
    Object? id = const $CopyWithPlaceholder(),
    Object? title = const $CopyWithPlaceholder(),
    Object? body = const $CopyWithPlaceholder(),
    Object? payload = const $CopyWithPlaceholder(),
    Object? isRead = const $CopyWithPlaceholder(),
  }) {
    return AppNotification(
      id: id == const $CopyWithPlaceholder()
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as String,
      title: title == const $CopyWithPlaceholder()
          ? _value.title
          // ignore: cast_nullable_to_non_nullable
          : title as String,
      body: body == const $CopyWithPlaceholder()
          ? _value.body
          // ignore: cast_nullable_to_non_nullable
          : body as String,
      payload: payload == const $CopyWithPlaceholder()
          ? _value.payload
          // ignore: cast_nullable_to_non_nullable
          : payload as Map<String, dynamic>,
      isRead: isRead == const $CopyWithPlaceholder()
          ? _value.isRead
          // ignore: cast_nullable_to_non_nullable
          : isRead as bool,
    );
  }
}

extension $AppNotificationCopyWith on AppNotification {
  /// Returns a callable class that can be used as follows: `instanceOfAppNotification.copyWith(...)` or like so:`instanceOfAppNotification.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$AppNotificationCWProxy get copyWith => _$AppNotificationCWProxyImpl(this);
}

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class AppNotificationAdapter extends TypeAdapter<AppNotification> {
  @override
  final int typeId = 2;

  @override
  AppNotification read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return AppNotification(
      id: fields[0] as String,
      title: fields[1] as String,
      body: fields[2] as String,
      payload: (fields[3] as Map).cast<String, dynamic>(),
      isRead: fields[4] as bool,
    );
  }

  @override
  void write(BinaryWriter writer, AppNotification obj) {
    writer
      ..writeByte(5)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.title)
      ..writeByte(2)
      ..write(obj.body)
      ..writeByte(3)
      ..write(obj.payload)
      ..writeByte(4)
      ..write(obj.isRead);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AppNotificationAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AppNotification _$AppNotificationFromJson(Map<String, dynamic> json) =>
    AppNotification(
      id: json['id'] as String,
      title: json['title'] as String,
      body: json['body'] as String,
      payload: json['payload'] as Map<String, dynamic>,
      isRead: json['isRead'] as bool,
    );

Map<String, dynamic> _$AppNotificationToJson(AppNotification instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'body': instance.body,
      'payload': instance.payload,
      'isRead': instance.isRead,
    };
