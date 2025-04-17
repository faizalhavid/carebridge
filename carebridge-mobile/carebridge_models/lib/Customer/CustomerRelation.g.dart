// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'CustomerRelation.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$CustomerRelationCWProxy {
  CustomerRelation id(int id);

  CustomerRelation name(String name);

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `CustomerRelation(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// CustomerRelation(...).copyWith(id: 12, name: "My name")
  /// ````
  CustomerRelation call({
    int id,
    String name,
  });
}

/// Proxy class for `copyWith` functionality. This is a callable class and can be used as follows: `instanceOfCustomerRelation.copyWith(...)`. Additionally contains functions for specific fields e.g. `instanceOfCustomerRelation.copyWith.fieldName(...)`
class _$CustomerRelationCWProxyImpl implements _$CustomerRelationCWProxy {
  const _$CustomerRelationCWProxyImpl(this._value);

  final CustomerRelation _value;

  @override
  CustomerRelation id(int id) => this(id: id);

  @override
  CustomerRelation name(String name) => this(name: name);

  @override

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `CustomerRelation(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// CustomerRelation(...).copyWith(id: 12, name: "My name")
  /// ````
  CustomerRelation call({
    Object? id = const $CopyWithPlaceholder(),
    Object? name = const $CopyWithPlaceholder(),
  }) {
    return CustomerRelation(
      id: id == const $CopyWithPlaceholder()
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as int,
      name: name == const $CopyWithPlaceholder()
          ? _value.name
          // ignore: cast_nullable_to_non_nullable
          : name as String,
    );
  }
}

extension $CustomerRelationCopyWith on CustomerRelation {
  /// Returns a callable class that can be used as follows: `instanceOfCustomerRelation.copyWith(...)` or like so:`instanceOfCustomerRelation.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$CustomerRelationCWProxy get copyWith => _$CustomerRelationCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CustomerRelation _$CustomerRelationFromJson(Map<String, dynamic> json) =>
    CustomerRelation(
      id: (json['id'] as num).toInt(),
      name: json['name'] as String,
    );

Map<String, dynamic> _$CustomerRelationToJson(CustomerRelation instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
    };
