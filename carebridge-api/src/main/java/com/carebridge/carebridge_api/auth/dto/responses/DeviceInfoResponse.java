package com.carebridge.carebridge_api.auth.dto.responses;

public record DeviceInfoResponse(
        Long id,
        String deviceType,
        String operatingSystem,
        String osVersion,
        String browser,
        String browserVersion,
        String deviceToken,
        String ipAddress,
        Long userId) {
}
