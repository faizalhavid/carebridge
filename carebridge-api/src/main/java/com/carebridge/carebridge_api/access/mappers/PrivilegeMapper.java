package com.carebridge.carebridge_api.access.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.access.dto.requests.PrivilegeRequest;
import com.carebridge.carebridge_api.access.dto.responses.PrivilegeResponse;
import com.carebridge.carebridge_api.access.models.Privilege;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

@Mapper(config = MapStructConfig.class)
public interface PrivilegeMapper extends BaseMapper<Privilege, PrivilegeRequest, PrivilegeResponse> {

    @Override
    @Mapping(target = "roles", expression = "java(request.getRoles() != null ? request.getRoles().stream().map(r -> toEntityFromId(r.getId(), com.carebridge.carebridge_api.access.models.Role.class)).collect(java.util.stream.Collectors.toList()) : null)")
    Privilege toEntity(PrivilegeRequest request);

    @Override
    @Mapping(target = "roleIds", expression = "java(entity.getRoles() != null ? entity.getRoles().stream().map(role -> toIdFromEntity(role)).collect(java.util.stream.Collectors.toList()) : null)")
    PrivilegeResponse toResponse(Privilege entity);

}
