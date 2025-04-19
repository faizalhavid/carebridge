import 'package:carebridge_models/accounts/Biodata/Biodata.dart';
import 'package:carebridge_models/accounts/BloodGroup/BloodGroup.dart';
import 'package:carebridge_models/accounts/Customer/CustomerMember.dart';
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Customer.g.dart';

@JsonSerializable()
@CopyWith()
class Customer extends Equatable {
  final int id;
  final Biodata biodata;
  final String gender;
  final BloodGroup bloodGroup;
  final String rhesusType;
  final double height;
  final double weight;
  final List<CustomerMember> customerMember;

  const Customer({
    required this.id,
    required this.biodata,
    required this.gender,
    required this.bloodGroup,
    required this.rhesusType,
    required this.height,
    required this.weight,
    required this.customerMember,
  });

  factory Customer.fromJson(Map<String, dynamic> json) =>
      _$CustomerFromJson(json);

  Map<String, dynamic> toJson() => _$CustomerToJson(this);

  @override
  List<Object?> get props => [
    id,
    biodata,
    gender,
    bloodGroup,
    rhesusType,
    rhesusType,
    height,
    weight,
    customerMember,
  ];
}
