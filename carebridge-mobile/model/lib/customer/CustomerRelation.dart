import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'CustomerRelation.g.dart';

@JsonSerializable()
@CopyWith()
class CustomerRelation extends Equatable {
  final int id;
  final String name;

  const CustomerRelation({
    required this.id,
    required this.name,
  });

  factory CustomerRelation.fromJson(Map<String, dynamic> json) =>
      _$CustomerRelationFromJson(json);

  Map<String, dynamic> toJson() => _$CustomerRelationToJson(this);

  @override
  List<Object?> get props => [id, name];
}
