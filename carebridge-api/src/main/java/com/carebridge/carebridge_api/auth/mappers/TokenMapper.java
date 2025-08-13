package com.carebridge.carebridge_api.auth.mappers;

import org.mapstruct.Mapper;

import com.carebridge.carebridge_api.auth.dto.requests.TokenRequest;
import com.carebridge.carebridge_api.auth.dto.responses.TokenResponse;
import com.carebridge.carebridge_api.auth.models.Token;
import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;

@Mapper(config = MapStructConfig.class, componentModel = "spring")
public interface TokenMapper extends BaseMapper<Token, TokenRequest, TokenResponse> {

}
