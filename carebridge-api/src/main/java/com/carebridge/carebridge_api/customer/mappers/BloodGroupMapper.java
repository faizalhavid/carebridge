package com.carebridge.carebridge_api.customer.mappers;

import org.mapstruct.Mapper;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.customer.dto.requests.BloodGroupRequest;
import com.carebridge.carebridge_api.customer.dto.responses.BloodGroupResponse;
import com.carebridge.carebridge_api.customer.models.BloodGroup;

@Mapper(config = MapStructConfig.class)
public interface BloodGroupMapper extends BaseMapper<BloodGroup, BloodGroupRequest, BloodGroupResponse> {

}
