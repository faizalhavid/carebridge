package com.carebridge.carebridge_api.auth.dto.requests;


import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    @Email(message = "Email should be valid")
    private String email;
    @NotEmpty(message = "Password should not be empty")
    private String password;
    private DeviceInfo deviceInfo;
}
