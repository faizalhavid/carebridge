package com.carebridge.carebridge_api.user.dto.projections;


import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.List;

@Projection(name = "userProjection", types = {UserProjection.class})
public interface UserProjection {
    Long getId();

    Boolean getIsDeleted();

    LocalDateTime getCreatedAt();

    BiodataProjection getBiodata();

    @Value("#{target.getRole().getCode()}")
    String getRole();

    String getEmail();

    Boolean getIsLocked();
    LocalDateTime getLastLogin();
    List<DeviceInfo> getDeviceInfos();

    List<GrantedAuthority> getAuthorities();

}
