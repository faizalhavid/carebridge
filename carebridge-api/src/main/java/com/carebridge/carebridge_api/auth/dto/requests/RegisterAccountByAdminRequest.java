package com.carebridge.carebridge_api.auth.dto.requests;


import com.carebridge.carebridge_api.user.models.Role;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class RegisterAccountByAdminRequest extends RegisterAccountRequest {
    private Role role;
    private List<GrantedAuthority> authorities;
}
