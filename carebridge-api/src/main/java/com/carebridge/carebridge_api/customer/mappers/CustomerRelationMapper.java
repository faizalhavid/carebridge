package com.carebridge.carebridge_api.customer.mappers;

import org.mapstruct.Mapper;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.customer.dto.requests.CustomerRelationRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerRelationResponse;
import com.carebridge.carebridge_api.customer.models.CustomerRelation;

@Mapper(config = MapStructConfig.class)
public interface CustomerRelationMapper
        extends BaseMapper<CustomerRelation, CustomerRelationRequest, CustomerRelationResponse> {

}
