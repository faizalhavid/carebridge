package com.carebridge.carebridge_api.auth.dto.requests;


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
@MappedSuperclass
public class RegisterAccountRequest {
    @NotBlank(message = "email cannot be blank")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "fullname cannot be blank")
    @Size(max = 255, message = "fullname cannot be longer than 255 character")
    private String fullname;

    @Pattern(regexp = "^(?:\\+62|62|0)8[1-9][0-9]{6,9}$|^$", message = "Invalid phone number format")
    private String mobilePhone;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$", message = "Password should contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long")
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    private String imagePath;

}
