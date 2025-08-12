package com.carebridge.carebridge_api.access.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.access.dto.requests.MenuRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuResponse;
import com.carebridge.carebridge_api.access.models.Menu;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

@Mapper(config = MapStructConfig.class)
public interface MenuMapper extends BaseMapper<Menu, MenuRequest, MenuResponse> {

    @Override
    @Mapping(target = "parent", expression = "java(toEntityFromIdOrObject(dto.getParent(), com.carebridge.carebridge_api.access.models.Menu.class, this))")
    @Mapping(target = "children", ignore = true) // anak-anak biasanya dihandle terpisah
    Menu toEntity(MenuRequest dto);

    @Override
    @Mapping(target = "parentId", expression = "java(toIdFromEntity(menu.getParent()))")
    @Mapping(target = "childrenIds", expression = "java(menu.getChildren() != null ? menu.getChildren().stream().map(child -> toIdFromEntity(child)).collect(java.util.stream.Collectors.toList()) : null)")
    MenuResponse toResponse(Menu menu);

}
