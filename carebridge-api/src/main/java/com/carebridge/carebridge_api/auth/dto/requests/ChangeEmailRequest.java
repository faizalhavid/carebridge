package com.carebridge.carebridge_api.auth.dto.requests;


import com.carebridge.carebridge_api.access.models.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ChangeEmailRequest extends RegisterAccountRequest {

    @Schema(description = "Current email address of the user", example = "nurfaizal966@gmail.com")
    @NotEmpty(message = "Current email is required")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = "Invalid email format")
    private String currentEmail;

    @Schema(description = "New email address to be set", example = "nurhavid123@gmail.com")
    @NotEmpty(message = "New email is required")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = "Invalid email format")
    private String newEmail;
    @NotBlank(message = "Token is required")
    private String token;

}
