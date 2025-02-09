package com.carebridge.carebridge_api.user.dto.projections;

import java.time.LocalDateTime;

public interface RoleProjection {
    Long getId();

    String getName();

    String getCode();

    LocalDateTime getCreatedAt();
}