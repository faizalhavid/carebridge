package com.carebridge.carebridge_api.user.dto.projections;


import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.List;

@Projection(name = "adminProjection", types = {AdminProjection.class})
public interface AdminProjection {
    Long getId();

    Boolean getIsDeleted();
;
    int maxGenerateAdminUser();
}
