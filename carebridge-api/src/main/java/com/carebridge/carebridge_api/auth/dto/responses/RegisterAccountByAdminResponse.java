package com.carebridge.carebridge_api.auth.dto.responses;


import com.carebridge.carebridge_api.user.models.Role;
import com.carebridge.carebridge_api.user.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterAccountByAdminResponse {
    private User user;
    private Role role;
    private List<GrantedAuthority> authorities;
}
