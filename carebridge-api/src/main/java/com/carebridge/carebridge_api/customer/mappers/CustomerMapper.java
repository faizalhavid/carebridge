package com.carebridge.carebridge_api.customer.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.customer.dto.requests.CustomerRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerResponse;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.user.mapper.BiodataMapper;

@Mapper(config = MapStructConfig.class, uses = { BiodataMapper.class, BloodGroupMapper.class })
public interface CustomerMapper extends BaseMapper<Customer, CustomerRequest, CustomerResponse> {

    @Override
    @Mapping(target = "biodata", expression = "java(toEntityFromIdOrObject(request.getBiodata(), com.carebridge.carebridge_api.user.models.Biodata.class, biodataMapper))")
    @Mapping(target = "bloodGroup", expression = "java(toEntityFromIdOrObject(request.getBloodGroup(), com.carebridge.carebridge_api.customer.models.BloodGroup.class, bloodGroupMapper))")
    @Mapping(target = "customerMember", ignore = true) // Handle separately to avoid circular reference
    Customer toEntity(CustomerRequest request);

    @Override
    @Mapping(target = "biodata", expression = "java(biodataMapper.toResponse(entity.getBiodata()))")
    @Mapping(target = "bloodGroupId", expression = "java(toIdFromEntity(entity.getBloodGroup()))")
    @Mapping(target = "customerMemberIds", expression = "java(entity.getCustomerMember() != null ? entity.getCustomerMember().stream().map(member -> toIdFromEntity(member)).collect(java.util.stream.Collectors.toList()) : null)")
    CustomerResponse toResponse(Customer entity);

}
