package com.carebridge.carebridge_api.user.dto.projections;

import com.carebridge.carebridge_api.auth.models.DeviceInfo;

import java.time.LocalDateTime;
import java.util.List;

public interface ProfileProjection {
    Long getId();
    Boolean getIsDeleted();
    LocalDateTime getCreatedAt();
    String getEmail();

    Boolean getIsLocked();
    LocalDateTime getLastLogin();
    List<DeviceInfo> getDeviceInfos();


}
