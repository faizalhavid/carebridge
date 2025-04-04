import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:model/Customer/Customer.dart';
import 'package:model/Customer/CustomerRelation.dart';

part 'CustomerMember.g.dart';

@JsonSerializable()
@CopyWith()
class CustomerMember extends Equatable {
  final int id;
  final int parentBiodataId;
  final Customer customer;
  final CustomerRelation customerRelation;

  const CustomerMember(
      {required this.id,
      required this.parentBiodataId,
      required this.customer,
      required this.customerRelation});

  factory CustomerMember.fromJson(Map<String, dynamic> json) =>
      _$CustomerMemberFromJson(json);

  Map<String, dynamic> toJson() => _$CustomerMemberToJson(this);

  @override
  List<Object?> get props => [id, parentBiodataId, customer, customerRelation];
}
