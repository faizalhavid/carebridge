// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'CustomerMember.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$CustomerMemberCWProxy {
  CustomerMember id(int id);

  CustomerMember parentBiodataId(int parentBiodataId);

  CustomerMember customer(Customer customer);

  CustomerMember customerRelation(CustomerRelation customerRelation);

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `CustomerMember(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// CustomerMember(...).copyWith(id: 12, name: "My name")
  /// ````
  CustomerMember call({
    int id,
    int parentBiodataId,
    Customer customer,
    CustomerRelation customerRelation,
  });
}

/// Proxy class for `copyWith` functionality. This is a callable class and can be used as follows: `instanceOfCustomerMember.copyWith(...)`. Additionally contains functions for specific fields e.g. `instanceOfCustomerMember.copyWith.fieldName(...)`
class _$CustomerMemberCWProxyImpl implements _$CustomerMemberCWProxy {
  const _$CustomerMemberCWProxyImpl(this._value);

  final CustomerMember _value;

  @override
  CustomerMember id(int id) => this(id: id);

  @override
  CustomerMember parentBiodataId(int parentBiodataId) =>
      this(parentBiodataId: parentBiodataId);

  @override
  CustomerMember customer(Customer customer) => this(customer: customer);

  @override
  CustomerMember customerRelation(CustomerRelation customerRelation) =>
      this(customerRelation: customerRelation);

  @override

  /// This function **does support** nullification of nullable fields. All `null` values passed to `non-nullable` fields will be ignored. You can also use `CustomerMember(...).copyWith.fieldName(...)` to override fields one at a time with nullification support.
  ///
  /// Usage
  /// ```dart
  /// CustomerMember(...).copyWith(id: 12, name: "My name")
  /// ````
  CustomerMember call({
    Object? id = const $CopyWithPlaceholder(),
    Object? parentBiodataId = const $CopyWithPlaceholder(),
    Object? customer = const $CopyWithPlaceholder(),
    Object? customerRelation = const $CopyWithPlaceholder(),
  }) {
    return CustomerMember(
      id: id == const $CopyWithPlaceholder()
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as int,
      parentBiodataId: parentBiodataId == const $CopyWithPlaceholder()
          ? _value.parentBiodataId
          // ignore: cast_nullable_to_non_nullable
          : parentBiodataId as int,
      customer: customer == const $CopyWithPlaceholder()
          ? _value.customer
          // ignore: cast_nullable_to_non_nullable
          : customer as Customer,
      customerRelation: customerRelation == const $CopyWithPlaceholder()
          ? _value.customerRelation
          // ignore: cast_nullable_to_non_nullable
          : customerRelation as CustomerRelation,
    );
  }
}

extension $CustomerMemberCopyWith on CustomerMember {
  /// Returns a callable class that can be used as follows: `instanceOfCustomerMember.copyWith(...)` or like so:`instanceOfCustomerMember.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$CustomerMemberCWProxy get copyWith => _$CustomerMemberCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CustomerMember _$CustomerMemberFromJson(Map<String, dynamic> json) =>
    CustomerMember(
      id: (json['id'] as num).toInt(),
      parentBiodataId: (json['parentBiodataId'] as num).toInt(),
      customer: Customer.fromJson(json['customer'] as Map<String, dynamic>),
      customerRelation: CustomerRelation.fromJson(
          json['customerRelation'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$CustomerMemberToJson(CustomerMember instance) =>
    <String, dynamic>{
      'id': instance.id,
      'parentBiodataId': instance.parentBiodataId,
      'customer': instance.customer,
      'customerRelation': instance.customerRelation,
    };
