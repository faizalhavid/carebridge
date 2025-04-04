import 'dart:ffi';

import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:model/Biodata/Biodata.dart';
import 'package:model/BloodGroup/BloodGroup.dart';
import 'package:model/Customer/CustomerMember.dart';

part 'Customer.g.dart';

@JsonSerializable()
@CopyWith()
class Customer extends Equatable {
  final int id;
  final Biodata biodata;
  final String gender;
  final BloodGroup bloodGroup;
  final String rhesusType;
  final Float height;
  final Float weight;
  final List<CustomerMember> customerMember;

  const Customer(
      {required this.id,
      required this.biodata,
      required this.gender,
      required this.bloodGroup,
      required this.rhesusType,
      required this.height,
      required this.weight,
      required this.customerMember});

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
