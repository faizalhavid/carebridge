package com.carebridge.carebridge_api.auth.dto.requests;

import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterAccountRequest {

    @Schema(description = "Token", example = "123456")
    @NotBlank(message = "Token cannot be blank")
    private String token;

    @Schema(description = "Email", example = "nurhavid123@gmail.com")
    @NotBlank(message = "email cannot be blank")
    @Email(message = "Invalid email address")
    private String email;

    @Schema(description = "Fullname", example = "John Doe")
    @NotBlank(message = "fullname cannot be blank")
    @Size(max = 255, message = "fullname cannot be longer than 255 character")
    private String fullname;

    @Schema(description = "Mobile phone", example = "081234567890")
    @Pattern(regexp = "^(?:\\+62|62|0)8[1-9][0-9]{6,9}$|^$", message = "Invalid phone number format")
    private String mobilePhone;

    @Schema(description = "Password", example = "Barakadut123@")
    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$", message = "Password should contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long")
    private String password;

    @Schema(description = "Confirm password", example = "Barakadut123@")
    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    private String imagePath;

}
