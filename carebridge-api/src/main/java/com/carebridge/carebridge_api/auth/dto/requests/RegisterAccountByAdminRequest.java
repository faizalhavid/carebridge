package com.carebridge.carebridge_api.auth.dto.requests;


import com.carebridge.carebridge_api.user.models.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class RegisterAccountByAdminRequest extends RegisterAccountRequest {

    @Schema(description = "Role of the user", example = "ADMIN")
    private Role role;
    @Schema(description = "List of authorities of the user", example = "[{\"authority\":\"ROLE_ADMIN\"}]")
    private List<GrantedAuthority> authorities;
}
