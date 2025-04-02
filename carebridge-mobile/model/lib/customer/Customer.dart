import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'customer.g.dart';

@JsonSerializable()
@CopyWith()
class Customer extends Equatable {
  final int id;
  final String fullName;
  final String fullAddress;
  final String? secondFullAddress;
  final String postalCode;
  final String phone;
  final String noIdentification;
  final String userId;
  final String? avatar;
  @JsonKey(name: 'avatarView')
  final String? avatarView;

  const Customer({
    required this.id,
    required this.fullName,
    required this.fullAddress,
    this.secondFullAddress,
    required this.postalCode,
    required this.phone,
    required this.noIdentification,
    required this.userId,
    required this.avatar,
    required this.avatarView,
  });

  factory Customer.fromJson(Map<String, dynamic> json) =>
      _$CustomerFromJson(json);

  Map<String, dynamic> toJson() => _$CustomerToJson(this);

  @override
  List<Object?> get props => [
        id,
        fullName,
        fullAddress,
        secondFullAddress,
        postalCode,
        phone,
        noIdentification,
        userId,
        avatar,
        avatarView,
      ];
}
