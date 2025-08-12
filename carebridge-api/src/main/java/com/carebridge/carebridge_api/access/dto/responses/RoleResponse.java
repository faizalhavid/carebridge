package com.carebridge.carebridge_api.access.dto.responses;

import java.util.List;

public record RoleResponse(
        Long id,
        String name,
        String code,
        List<Long> privilegeIds) {
}