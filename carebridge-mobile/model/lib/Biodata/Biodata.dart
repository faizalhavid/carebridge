import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Biodata.g.dart';

@JsonSerializable()
@CopyWith()
class Biodata extends Equatable {
  final int id;
  final String fullName;
  final String mobilePhone;
  final String imagePath;

  const Biodata(
      {required this.id,
      required this.fullName,
      required this.mobilePhone,
      required this.imagePath});

  factory Biodata.fromJson(Map<String, dynamic> json) =>
      _$BiodataFromJson(json);

  Map<String, dynamic> toJson() => _$BiodataToJson(this);

  @override
  List<Object?> get props => [id, fullName, mobilePhone, imagePath];
}
