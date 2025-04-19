import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'BloodGroup.g.dart';

@JsonSerializable()
@CopyWith()
class BloodGroup extends Equatable {
  final int id;
  final String code;
  final String description;

  const BloodGroup(
      {required this.id, required this.code, required this.description});

  factory BloodGroup.fromJson(Map<String, dynamic> json) =>
      _$BloodGroupFromJson(json);

  Map<String, dynamic> toJson() => _$BloodGroupToJson(this);

  @override
  List<Object?> get props => [id, code, description];
}
