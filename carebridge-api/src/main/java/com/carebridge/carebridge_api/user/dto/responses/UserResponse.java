package com.carebridge.carebridge_api.user.dto.responses;

import java.time.LocalDate;
import java.util.Collection;

import com.carebridge.carebridge_api.access.dto.responses.RoleResponse;

// @JsonView(Views.Public.class)
public record UserResponse(
        Integer id,
        String email,
        Collection<RoleResponse> roles,
        int loginAttempt,
        boolean isLocked,
        String lastLogin,
        LocalDate createdAt,
        LocalDate updatedAt,
        LocalDate deleteAt,
        boolean isDeleted,
        BiodataResponse biodata) {
}
