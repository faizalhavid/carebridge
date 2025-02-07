package com.carebridge.carebridge_api.auth.dto.requests;


import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyTokenOtpRequest {
    @NotBlank(message = "Token cannot be blank")
    private String token;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotEmpty(message = "Used for cannot be empty")
    private TokenUsedFor usedFor;
}
