import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'DeviceInfo.g.dart';

@JsonSerializable()
class DeviceInfo extends Equatable {
  final String operatingSystem;
  final String osVersion;
  final String deviceToken;
  final String ipAddress;

  const DeviceInfo({
    required this.operatingSystem,
    required this.osVersion,
    required this.deviceToken,
    required this.ipAddress,
  });

  factory DeviceInfo.fromJson(Map<String, dynamic> json) =>
      _$DeviceInfoFromJson(json);
  Map<String, dynamic> toJson() => _$DeviceInfoToJson(this);

  @override
  List<Object?> get props => [
    operatingSystem,
    osVersion,
    deviceToken,
    ipAddress,
  ];
}
