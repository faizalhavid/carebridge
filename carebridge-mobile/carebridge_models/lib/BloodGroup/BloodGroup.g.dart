// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'BloodGroup.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$BloodGroupCWProxy {
  BloodGroup id(int id);

  BloodGroup code(String code);

  BloodGroup description(String description);

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `BloodGroup(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// BloodGroup(...).copyWith(id: 12, name: "My name")
  /// ````
  BloodGroup call({
    int id,
    String code,
    String description,
  });
}

/// Proxy class for `copyWith` functionality. This is a callable class and can be used as follows: `instanceOfBloodGroup.copyWith(...)`. Additionally contains functions for specific fields e.g. `instanceOfBloodGroup.copyWith.fieldName(...)`
class _$BloodGroupCWProxyImpl implements _$BloodGroupCWProxy {
  const _$BloodGroupCWProxyImpl(this._value);

  final BloodGroup _value;

  @override
  BloodGroup id(int id) => this(id: id);

  @override
  BloodGroup code(String code) => this(code: code);

  @override
  BloodGroup description(String description) => this(description: description);

  @override

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `BloodGroup(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// BloodGroup(...).copyWith(id: 12, name: "My name")
  /// ````
  BloodGroup call({
    Object? id = const $CopyWithPlaceholder(),
    Object? code = const $CopyWithPlaceholder(),
    Object? description = const $CopyWithPlaceholder(),
  }) {
    return BloodGroup(
      id: id == const $CopyWithPlaceholder()
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as int,
      code: code == const $CopyWithPlaceholder()
          ? _value.code
          // ignore: cast_nullable_to_non_nullable
          : code as String,
      description: description == const $CopyWithPlaceholder()
          ? _value.description
          // ignore: cast_nullable_to_non_nullable
          : description as String,
    );
  }
}

extension $BloodGroupCopyWith on BloodGroup {
  /// Returns a callable class that can be used as follows: `instanceOfBloodGroup.copyWith(...)` or like so:`instanceOfBloodGroup.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$BloodGroupCWProxy get copyWith => _$BloodGroupCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

BloodGroup _$BloodGroupFromJson(Map<String, dynamic> json) => BloodGroup(
      id: (json['id'] as num).toInt(),
      code: json['code'] as String,
      description: json['description'] as String,
    );

Map<String, dynamic> _$BloodGroupToJson(BloodGroup instance) =>
    <String, dynamic>{
      'id': instance.id,
      'code': instance.code,
      'description': instance.description,
    };
