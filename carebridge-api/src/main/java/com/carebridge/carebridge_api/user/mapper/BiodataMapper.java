package com.carebridge.carebridge_api.user.mapper;

import org.mapstruct.Mapper;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.user.dto.requests.BiodataRequest;
import com.carebridge.carebridge_api.user.dto.responses.BiodataResponse;
import com.carebridge.carebridge_api.user.models.Biodata;

@Mapper(config = MapStructConfig.class)
public interface BiodataMapper extends BaseMapper<Biodata, BiodataRequest, BiodataResponse> {

}
