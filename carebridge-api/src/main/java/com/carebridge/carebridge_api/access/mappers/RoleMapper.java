package com.carebridge.carebridge_api.access.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.access.dto.requests.RoleRequest;
import com.carebridge.carebridge_api.access.dto.responses.RoleResponse;
import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

@Mapper(config = MapStructConfig.class, uses = { PrivilegeMapper.class })
public interface RoleMapper extends BaseMapper<Role, RoleRequest, RoleResponse> {

    @Override
    @Mapping(target = "privileges", expression = "java(request.getPrivileges() != null ? request.getPrivileges().stream().map(p -> toEntityFromIdOrObject(p, com.carebridge.carebridge_api.access.models.Privilege.class, privilegeMapper)).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "users", ignore = true)
    Role toEntity(RoleRequest request);

    @Override
    @Mapping(target = "privilegeIds", expression = "java(entity.getPrivileges() != null ? entity.getPrivileges().stream().map(privilege -> toIdFromEntity(privilege)).collect(java.util.stream.Collectors.toList()) : null)")
    RoleResponse toResponse(Role entity);

}
