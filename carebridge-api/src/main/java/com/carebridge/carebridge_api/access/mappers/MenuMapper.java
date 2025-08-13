package com.carebridge.carebridge_api.access.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.access.dto.requests.MenuRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuResponse;
import com.carebridge.carebridge_api.access.models.Menu;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

@Mapper(config = MapStructConfig.class, componentModel = "spring")
public interface MenuMapper extends BaseMapper<Menu, MenuRequest, MenuResponse> {

    @Override
    @Mapping(target = "parent", expression = "java(dto.getParent() != null && dto.getParent().getId() != null ? toEntityFromId(dto.getParent().getId(), com.carebridge.carebridge_api.access.models.Menu.class) : null)")
    @Mapping(target = "children", ignore = true) // anak-anak biasanya dihandle terpisah
    Menu toEntity(MenuRequest dto);

    @Override
    @Mapping(target = "parentId", expression = "java(menu.getParent() != null ? menu.getParent().getId() : null)")
    @Mapping(target = "childrenIds", expression = "java(menu.getChildren() != null ? menu.getChildren().stream().map(child -> child.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    MenuResponse toResponse(Menu menu);

}
