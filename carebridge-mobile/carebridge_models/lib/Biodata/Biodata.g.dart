// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Biodata.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$BiodataCWProxy {
  Biodata id(int id);

  Biodata fullName(String fullName);

  Biodata mobilePhone(String mobilePhone);

  Biodata imagePath(String imagePath);

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `Biodata(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// Biodata(...).copyWith(id: 12, name: "My name")
  /// ````
  Biodata call({
    int id,
    String fullName,
    String mobilePhone,
    String imagePath,
  });
}

/// Proxy class for `copyWith` functionality. This is a callable class and can be used as follows: `instanceOfBiodata.copyWith(...)`. Additionally contains functions for specific fields e.g. `instanceOfBiodata.copyWith.fieldName(...)`
class _$BiodataCWProxyImpl implements _$BiodataCWProxy {
  const _$BiodataCWProxyImpl(this._value);

  final Biodata _value;

  @override
  Biodata id(int id) => this(id: id);

  @override
  Biodata fullName(String fullName) => this(fullName: fullName);

  @override
  Biodata mobilePhone(String mobilePhone) => this(mobilePhone: mobilePhone);

  @override
  Biodata imagePath(String imagePath) => this(imagePath: imagePath);

  @override

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `Biodata(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// Biodata(...).copyWith(id: 12, name: "My name")
  /// ````
  Biodata call({
    Object? id = const $CopyWithPlaceholder(),
    Object? fullName = const $CopyWithPlaceholder(),
    Object? mobilePhone = const $CopyWithPlaceholder(),
    Object? imagePath = const $CopyWithPlaceholder(),
  }) {
    return Biodata(
      id: id == const $CopyWithPlaceholder()
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as int,
      fullName: fullName == const $CopyWithPlaceholder()
          ? _value.fullName
          // ignore: cast_nullable_to_non_nullable
          : fullName as String,
      mobilePhone: mobilePhone == const $CopyWithPlaceholder()
          ? _value.mobilePhone
          // ignore: cast_nullable_to_non_nullable
          : mobilePhone as String,
      imagePath: imagePath == const $CopyWithPlaceholder()
          ? _value.imagePath
          // ignore: cast_nullable_to_non_nullable
          : imagePath as String,
    );
  }
}

extension $BiodataCopyWith on Biodata {
  /// Returns a callable class that can be used as follows: `instanceOfBiodata.copyWith(...)` or like so:`instanceOfBiodata.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$BiodataCWProxy get copyWith => _$BiodataCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Biodata _$BiodataFromJson(Map<String, dynamic> json) => Biodata(
      id: (json['id'] as num).toInt(),
      fullName: json['fullName'] as String,
      mobilePhone: json['mobilePhone'] as String,
      imagePath: json['imagePath'] as String,
    );

Map<String, dynamic> _$BiodataToJson(Biodata instance) => <String, dynamic>{
      'id': instance.id,
      'fullName': instance.fullName,
      'mobilePhone': instance.mobilePhone,
      'imagePath': instance.imagePath,
    };
