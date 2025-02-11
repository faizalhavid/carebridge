package com.carebridge.carebridge_api.auth.dto.requests;


import com.carebridge.carebridge_api.core.annotations.EnumValidator;
import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyTokenOtpRequest {
    @Schema(description = "Token", example = "123456")
    @NotBlank(message = "Token cannot be blank")
    private String token;

    @Schema(description = "Email address", example = "nurhavid123@gmail.com")
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @Schema(description = "Used for", example = "REGISTRATION")
    @EnumValidator(
            enumClass = TokenUsedFor.class,
            acceptedValues = {"REGISTRATION", "PASSWORD_RESET"},
            message = "Invalid value for UsedFor. Allowed values: REGISTRATION, PASSWORD_RESET"
    )
    private String usedFor;
}
