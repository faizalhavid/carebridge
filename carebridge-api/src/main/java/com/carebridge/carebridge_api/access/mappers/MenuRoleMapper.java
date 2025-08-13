package com.carebridge.carebridge_api.access.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.access.dto.requests.MenuRoleRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuRoleResponse;
import com.carebridge.carebridge_api.access.models.MenuRole;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

@Mapper(config = MapStructConfig.class, componentModel = "spring", uses = { MenuMapper.class, RoleMapper.class })
public interface MenuRoleMapper extends BaseMapper<MenuRole, MenuRoleRequest, MenuRoleResponse> {

    @Override
    @Mapping(target = "role", expression = "java(toEntityFromIdOrObject(request.getRole(), com.carebridge.carebridge_api.access.models.Role.class, roleMapper))")
    @Mapping(target = "menu", expression = "java(toEntityFromIdOrObject(request.getMenu(), com.carebridge.carebridge_api.access.models.Menu.class, menuMapper))")
    MenuRole toEntity(MenuRoleRequest request);

    @Override
    @Mapping(target = "roleId", expression = "java(entity.getRole() != null ? entity.getRole().getId() : null)")
    @Mapping(target = "menuId", expression = "java(entity.getMenu() != null ? entity.getMenu().getId() : null)")
    MenuRoleResponse toResponse(MenuRole entity);

}
