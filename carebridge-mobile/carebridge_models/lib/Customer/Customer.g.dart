// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Customer.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$CustomerCWProxy {
  Customer id(int id);

  Customer biodata(Biodata biodata);

  Customer gender(String gender);

  Customer bloodGroup(BloodGroup bloodGroup);

  Customer rhesusType(String rhesusType);

  Customer height(double height);

  Customer weight(double weight);

  Customer customerMember(List<CustomerMember> customerMember);

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `Customer(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// Customer(...).copyWith(id: 12, name: "My name")
  /// ````
  Customer call({
    int id,
    Biodata biodata,
    String gender,
    BloodGroup bloodGroup,
    String rhesusType,
    double height,
    double weight,
    List<CustomerMember> customerMember,
  });
}

/// Proxy class for `copyWith` functionality. This is a callable class and can be used as follows: `instanceOfCustomer.copyWith(...)`. Additionally contains functions for specific fields e.g. `instanceOfCustomer.copyWith.fieldName(...)`
class _$CustomerCWProxyImpl implements _$CustomerCWProxy {
  const _$CustomerCWProxyImpl(this._value);

  final Customer _value;

  @override
  Customer id(int id) => this(id: id);

  @override
  Customer biodata(Biodata biodata) => this(biodata: biodata);

  @override
  Customer gender(String gender) => this(gender: gender);

  @override
  Customer bloodGroup(BloodGroup bloodGroup) => this(bloodGroup: bloodGroup);

  @override
  Customer rhesusType(String rhesusType) => this(rhesusType: rhesusType);

  @override
  Customer height(double height) => this(height: height);

  @override
  Customer weight(double weight) => this(weight: weight);

  @override
  Customer customerMember(List<CustomerMember> customerMember) =>
      this(customerMember: customerMember);

  @override

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `Customer(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// Customer(...).copyWith(id: 12, name: "My name")
  /// ````
  Customer call({
    Object? id = const $CopyWithPlaceholder(),
    Object? biodata = const $CopyWithPlaceholder(),
    Object? gender = const $CopyWithPlaceholder(),
    Object? bloodGroup = const $CopyWithPlaceholder(),
    Object? rhesusType = const $CopyWithPlaceholder(),
    Object? height = const $CopyWithPlaceholder(),
    Object? weight = const $CopyWithPlaceholder(),
    Object? customerMember = const $CopyWithPlaceholder(),
  }) {
    return Customer(
      id: id == const $CopyWithPlaceholder()
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as int,
      biodata: biodata == const $CopyWithPlaceholder()
          ? _value.biodata
          // ignore: cast_nullable_to_non_nullable
          : biodata as Biodata,
      gender: gender == const $CopyWithPlaceholder()
          ? _value.gender
          // ignore: cast_nullable_to_non_nullable
          : gender as String,
      bloodGroup: bloodGroup == const $CopyWithPlaceholder()
          ? _value.bloodGroup
          // ignore: cast_nullable_to_non_nullable
          : bloodGroup as BloodGroup,
      rhesusType: rhesusType == const $CopyWithPlaceholder()
          ? _value.rhesusType
          // ignore: cast_nullable_to_non_nullable
          : rhesusType as String,
      height: height == const $CopyWithPlaceholder()
          ? _value.height
          // ignore: cast_nullable_to_non_nullable
          : height as double,
      weight: weight == const $CopyWithPlaceholder()
          ? _value.weight
          // ignore: cast_nullable_to_non_nullable
          : weight as double,
      customerMember: customerMember == const $CopyWithPlaceholder()
          ? _value.customerMember
          // ignore: cast_nullable_to_non_nullable
          : customerMember as List<CustomerMember>,
    );
  }
}

extension $CustomerCopyWith on Customer {
  /// Returns a callable class that can be used as follows: `instanceOfCustomer.copyWith(...)` or like so:`instanceOfCustomer.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$CustomerCWProxy get copyWith => _$CustomerCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Customer _$CustomerFromJson(Map<String, dynamic> json) => Customer(
      id: (json['id'] as num).toInt(),
      biodata: Biodata.fromJson(json['biodata'] as Map<String, dynamic>),
      gender: json['gender'] as String,
      bloodGroup:
          BloodGroup.fromJson(json['bloodGroup'] as Map<String, dynamic>),
      rhesusType: json['rhesusType'] as String,
      height: (json['height'] as num).toDouble(),
      weight: (json['weight'] as num).toDouble(),
      customerMember: (json['customerMember'] as List<dynamic>)
          .map((e) => CustomerMember.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$CustomerToJson(Customer instance) => <String, dynamic>{
      'id': instance.id,
      'biodata': instance.biodata,
      'gender': instance.gender,
      'bloodGroup': instance.bloodGroup,
      'rhesusType': instance.rhesusType,
      'height': instance.height,
      'weight': instance.weight,
      'customerMember': instance.customerMember,
    };
