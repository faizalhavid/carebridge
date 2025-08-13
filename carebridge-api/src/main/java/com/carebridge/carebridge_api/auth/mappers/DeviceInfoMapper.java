package com.carebridge.carebridge_api.auth.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.auth.dto.requests.DeviceInfoRequest;
import com.carebridge.carebridge_api.auth.dto.responses.DeviceInfoResponse;
import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

import org.mapstruct.Named;
import com.carebridge.carebridge_api.user.models.User;

@Mapper(config = MapStructConfig.class, componentModel = "spring")
public interface DeviceInfoMapper extends BaseMapper<DeviceInfo, DeviceInfoRequest, DeviceInfoResponse> {

    @Override
    @Mapping(target = "user", expression = "java(toUserEntity(request.getUser()))")
    DeviceInfo toEntity(DeviceInfoRequest request);

    @Override
    @Mapping(target = "userId", expression = "java(entity.getUser() != null ? entity.getUser().getId() : null)")
    DeviceInfoResponse toResponse(DeviceInfo entity);

    @Named("toUserEntity")
    default User toUserEntity(Object userValue) {
        if (userValue == null)
            return null;
        if (userValue instanceof User) {
            return (User) userValue;
        } else if (userValue instanceof Long) {
            User user = new User();
            user.setId((Long) userValue);
            return user;
        }
        return null;
    }

    // Mapping method for patch operation
    default User map(Object value) {
        return toUserEntity(value);
    }
}