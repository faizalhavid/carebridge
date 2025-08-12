package com.carebridge.carebridge_api.user.mapper;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.models.User;

import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class, uses = { BiodataMapper.class })
public interface UserMapper extends BaseMapper<User, UserRequest, UserResponse> {

}
