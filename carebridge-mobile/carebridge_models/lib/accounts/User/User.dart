import 'package:carebridge_models/accounts/Biodata/Biodata.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:copy_with_extension/copy_with_extension.dart';

part 'User.g.dart';

enum UserType { admin, user, medical }

@JsonSerializable()
@CopyWith()
class User extends Equatable {
  final int id;
  final String name;
  final String email;
  final Biodata biodata;
  final UserType userType;

  const User({
    required this.id,
    required this.name,
    required this.email,
    required this.biodata,
    required this.userType,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);

  @override
  List<Object?> get props => [id, name, email, biodata, userType];
}
