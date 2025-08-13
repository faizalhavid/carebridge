package com.carebridge.carebridge_api.user.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @Schema(description = "User biodata information", nullable = true)
    @Valid
    private BiodataRequest biodata;

    @Schema(description = "Email", example = "nurhavid123@gmail.com")
    @NotBlank(message = "email cannot be blank")
    @Email(message = "Invalid email address")
    private String email;

    @Schema(description = "Password of the user", example = "Barakadut123@")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$", message = "Password should contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long")
    private String password;

    @Schema(description = "Roles of the user", example = "ADMIN,USER")
    private List<Long> roleIds;

}
