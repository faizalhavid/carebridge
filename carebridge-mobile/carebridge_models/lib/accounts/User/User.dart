import 'package:carebridge_models/accounts/Biodata/Biodata.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:copy_with_extension/copy_with_extension.dart';

part 'User.g.dart';

enum UserType { admin, user, medical, customer }

@JsonSerializable()
@CopyWith()
class User extends Equatable {
  final int id;
  final String name;
  final String email;
  final Biodata? biodata;
  final UserType userType;

  const User({
    required this.id,
    required this.name,
    required this.email,
    this.biodata,
    required this.userType,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    // Map role.name or role.code to UserType
    final roleName = json['role']?['name'] ?? json['role']?['code'];
    UserType userType;

    switch (roleName) {
      case 'Admin':
      case 'ROLE_ADMIN':
        userType = UserType.admin;
        break;
      case 'User':
      case 'ROLE_USER':
        userType = UserType.user;
        break;
      case 'Medical':
      case 'ROLE_MEDICAL':
        userType = UserType.medical;
        break;
      case 'Customer':
      case 'ROLE_CUSTOMER':
        userType = UserType.customer;
        break;
      default:
        throw Exception('Unknown role: $roleName');
    }

    return User(
      id: json['id'] as int,
      name: json['username'] as String,
      email: json['email'] as String,
      biodata:
          json['biodata'] == null
              ? null
              : Biodata.fromJson(json['biodata'] as Map<String, dynamic>),
      userType: userType,
    );
  }

  Map<String, dynamic> toJson() => _$UserToJson(this);

  @override
  List<Object?> get props => [id, name, email, biodata, userType];
}
