package com.carebridge.carebridge_api.auth.dto.requests;

import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {

    @Schema(description = "Email of the user", example = "nurhavid123@gmail.com")
    @Email(message = "Email should be valid")
    private String email;

    @Schema(description = "Password of the user", example = "Barakadut123@")
    @NotEmpty(message = "Password should not be empty")
    private String password;

    @Schema(description = "Device information of the user", example = "{\"deviceType\":\"Smartphone\",\"operatingSystem\":\"Android\",\"osVersion\":\"11.0\",\"browser\":\"Chrome\",\"browserVersion\":\"89.0\",\"deviceToken\":\"sampleDeviceToken\",\"ipAddress\":\"192.168.1.1\"}")
    private DeviceInfo deviceInfo;

}