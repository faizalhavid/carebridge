package com.carebridge.carebridge_api.customer.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carebridge.carebridge_api.core.BaseMapper;
import com.carebridge.carebridge_api.core.configs.MapStructConfig;
import com.carebridge.carebridge_api.customer.dto.requests.CustomerRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerResponse;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerMemberResponse;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.customer.models.CustomerMember;
import com.carebridge.carebridge_api.user.mapper.BiodataMapper;

import java.util.List;

@Mapper(config = MapStructConfig.class, componentModel = "spring", uses = { BiodataMapper.class, BloodGroupMapper.class,
        CustomerMemberMapper.class })
public interface CustomerMapper extends BaseMapper<Customer, CustomerRequest, CustomerResponse> {

    @Override
    @Mapping(target = "biodata", expression = "java(toEntityFromIdOrObject(request.getBiodata(), com.carebridge.carebridge_api.user.models.Biodata.class, biodataMapper))")
    @Mapping(target = "bloodGroup", expression = "java(toEntityFromIdOrObject(request.getBloodGroup(), com.carebridge.carebridge_api.customer.models.BloodGroup.class, bloodGroupMapper))")
    @Mapping(target = "customerMember", ignore = true)
    Customer toEntity(CustomerRequest request);

    @Override
    @Mapping(target = "biodata", expression = "java(biodataMapper.toResponse(entity.getBiodata()))")
    @Mapping(target = "bloodGroup", source = "bloodGroup")
    @Mapping(target = "customerMemberIds", expression = "java(mapCustomerMembersToResponses(entity.getCustomerMember()))")
    CustomerResponse toResponse(Customer entity);

    default List<CustomerMemberResponse> mapCustomerMembersToResponses(List<CustomerMember> members) {
        if (members == null)
            return null;
        return members.stream()
                .map(member -> new CustomerMemberResponse(
                        member.getId(),
                        member.getParentBiodataId(),
                        member.getCustomer(),
                        member.getCustomerRelation()))
                .toList();
    }
}