package com.carebridge.carebridge_api.auth.dto.requests;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordRequest {

    @Schema(description = "Email of the user", example = "nurhavid123@gmail.com")
    @Email(message = "Invalid email address")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @Schema(description = "Password of the user", example = "Barakadut123@gmail.com")
    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$", message = "Password should contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long")
    private String password;

    @Schema(description = "Confirm password of the user", example = "Barakadut123@gmail.com")
    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @NotBlank(message = "Token is required")
    private String token;

}
