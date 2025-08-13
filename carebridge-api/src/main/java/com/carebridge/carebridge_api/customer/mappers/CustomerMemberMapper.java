// src/main/java/com/carebridge/carebridge_api/customer/mappers/CustomerMemberMapper.java
package com.carebridge.carebridge_api.customer.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.customer.dto.requests.CustomerMemberRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerMemberResponse;
import com.carebridge.carebridge_api.customer.models.CustomerMember;

@Mapper(config = MapStructConfig.class, componentModel = "spring", uses = { CustomerRelationMapper.class })
public interface CustomerMemberMapper
        extends BaseMapper<CustomerMember, CustomerMemberRequest, CustomerMemberResponse> {

    @Override
    @Mapping(target = "customer", expression = "java(toEntityFromId(request.getCustomerId(), com.carebridge.carebridge_api.customer.models.Customer.class))")
    @Mapping(target = "customerRelation", expression = "java(toEntityFromIdOrObject(request.getCustomerRelation(), com.carebridge.carebridge_api.customer.models.CustomerRelation.class, customerRelationMapper))")
    CustomerMember toEntity(CustomerMemberRequest request);

    @Override
    @Mapping(target = "customerId", source = "customer")
    @Mapping(target = "customerRelation", source = "customerRelation")
    CustomerMemberResponse toResponse(CustomerMember entity);

}