package com.carebridge.carebridge_api.auth.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceInfoRequest {

    @NotBlank(message = "Device type is required")
    @Size(max = 50, message = "Device type cannot exceed 50 characters")
    private String deviceType;

    @NotBlank(message = "Operating system is required")
    @Size(max = 50, message = "Operating system cannot exceed 50 characters")
    private String operatingSystem;

    @Size(max = 20, message = "OS version cannot exceed 20 characters")
    private String osVersion;

    @Size(max = 50, message = "Browser cannot exceed 50 characters")
    private String browser;

    @Size(max = 20, message = "Browser version cannot exceed 20 characters")
    private String browserVersion;

    @NotBlank(message = "Device token is required")
    @Size(max = 255, message = "Device token cannot exceed 255 characters")
    private String deviceToken;

    @Size(max = 50, message = "IP address cannot exceed 50 characters")
    private String ipAddress;

    private Object user; // Can be ID (Long) or User object

}
