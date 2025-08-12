package com.carebridge.carebridge_api.customer.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.customer.dto.requests.CustomerMemberRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerMemberResponse;
import com.carebridge.carebridge_api.customer.mappers.CustomerMemberMapper;
import com.carebridge.carebridge_api.customer.models.CustomerMember;
import com.carebridge.carebridge_api.customer.repositories.CustomerMemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerMemberService {

    private final CustomerMemberRepository customerMemberRepository;
    private final CustomerMemberMapper customerMemberMapper;

    public Page<CustomerMemberResponse> getAllCustomerMembers(Pageable pageable) {
        return customerMemberRepository.findAll(pageable)
                .map(customerMemberMapper::toResponse);
    }

    public Optional<CustomerMemberResponse> getCustomerMemberById(Long id) {
        return customerMemberRepository.findById(id)
                .map(customerMemberMapper::toResponse);
    }

    public CustomerMemberResponse saveCustomerMember(CustomerMemberRequest customerMemberRequest) {
        CustomerMember customerMember = customerMemberMapper.toEntity(customerMemberRequest);
        customerMember = customerMemberRepository.save(customerMember);
        return customerMemberMapper.toResponse(customerMember);
    }

    public List<CustomerMemberResponse> saveCustomerMembers(List<CustomerMemberRequest> customerMemberRequests) {
        List<CustomerMember> customerMembers = customerMemberRequests.stream()
                .map(customerMemberMapper::toEntity)
                .collect(Collectors.toList());
        List<CustomerMember> savedCustomerMembers = customerMemberRepository.saveAll(customerMembers);
        return savedCustomerMembers.stream()
                .map(customerMemberMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<CustomerMemberResponse> updateCustomerMember(Long id, CustomerMemberRequest customerMemberRequest) {
        return customerMemberRepository.findById(id)
                .map(existingCustomerMember -> {
                    customerMemberMapper.patch(customerMemberRequest, existingCustomerMember);
                    CustomerMember updatedCustomerMember = customerMemberRepository.save(existingCustomerMember);
                    return customerMemberMapper.toResponse(updatedCustomerMember);
                });
    }

    public void deleteCustomerMember(Long id) {
        // Todo: Implement to update base entity (soft delete)
        customerMemberRepository.deleteById(id);
    }

    public void deleteCustomerMembers(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        customerMemberRepository.deleteAllById(ids);
    }

}
