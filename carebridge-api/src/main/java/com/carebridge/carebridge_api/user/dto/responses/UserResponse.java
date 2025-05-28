package com.carebridge.carebridge_api.user.dto.responses;

import java.time.LocalDate;
import java.util.Collection;

import com.carebridge.carebridge_api.access.dto.response.RoleResponse;
import com.carebridge.carebridge_api.access.models.Role;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @JsonView(Views.Public.class)
public class UserResponse {
    private int id;
    private String email;
    private Collection<RoleResponse> roles;
    private int loginAttempt;
    private boolean isLocked;

    private String lastLogin;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private LocalDate deleteAt;

    private boolean isDeleted;

    private ProfileResponse biodata;
}
