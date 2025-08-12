package com.carebridge.carebridge_api.customer.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.customer.dto.requests.CustomerMemberRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerMemberResponse;
import com.carebridge.carebridge_api.customer.models.CustomerMember;

@Mapper(config = MapStructConfig.class, uses = { CustomerRelationMapper.class })
public interface CustomerMemberMapper
        extends BaseMapper<CustomerMember, CustomerMemberRequest, CustomerMemberResponse> {

    @Override
    @Mapping(target = "customer", expression = "java(toEntityFromId(request.getCustomer(), com.carebridge.carebridge_api.customer.models.Customer.class))")
    @Mapping(target = "member", expression = "java(toEntityFromId(request.getMember(), com.carebridge.carebridge_api.customer.models.Customer.class))")
    @Mapping(target = "relation", expression = "java(toEntityFromIdOrObject(request.getRelation(), com.carebridge.carebridge_api.customer.models.CustomerRelation.class, customerRelationMapper))")
    CustomerMember toEntity(CustomerMemberRequest request);

    @Override
    @Mapping(target = "customerId", expression = "java(toIdFromEntity(entity.getCustomer()))")
    @Mapping(target = "memberId", expression = "java(toIdFromEntity(entity.getMember()))")
    @Mapping(target = "relationId", expression = "java(toIdFromEntity(entity.getRelation()))")
    CustomerMemberResponse toResponse(CustomerMember entity);

}
