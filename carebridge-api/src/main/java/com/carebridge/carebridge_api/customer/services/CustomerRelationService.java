package com.carebridge.carebridge_api.customer.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.customer.dto.requests.CustomerRelationRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerRelationResponse;
import com.carebridge.carebridge_api.customer.mappers.CustomerRelationMapper;
import com.carebridge.carebridge_api.customer.models.CustomerRelation;
import com.carebridge.carebridge_api.customer.repositories.CustomerRelationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerRelationService {

    private final CustomerRelationRepository customerRelationRepository;
    private final CustomerRelationMapper customerRelationMapper;

    public Page<CustomerRelationResponse> getAllCustomerRelations(Pageable pageable) {
        return customerRelationRepository.findAll(pageable)
                .map(customerRelationMapper::toResponse);
    }

    public Optional<CustomerRelationResponse> getCustomerRelationById(Long id) {
        return customerRelationRepository.findById(id)
                .map(customerRelationMapper::toResponse);
    }

    public CustomerRelationResponse saveCustomerRelation(CustomerRelationRequest customerRelationRequest) {
        CustomerRelation customerRelation = customerRelationMapper.toEntity(customerRelationRequest);
        customerRelation = customerRelationRepository.save(customerRelation);
        return customerRelationMapper.toResponse(customerRelation);
    }

    public List<CustomerRelationResponse> saveCustomerRelations(
            List<CustomerRelationRequest> customerRelationRequests) {
        List<CustomerRelation> customerRelations = customerRelationRequests.stream()
                .map(customerRelationMapper::toEntity)
                .collect(Collectors.toList());
        List<CustomerRelation> savedCustomerRelations = customerRelationRepository.saveAll(customerRelations);
        return savedCustomerRelations.stream()
                .map(customerRelationMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<CustomerRelationResponse> updateCustomerRelation(Long id,
            CustomerRelationRequest customerRelationRequest) {
        return customerRelationRepository.findById(id)
                .map(existingCustomerRelation -> {
                    customerRelationMapper.patch(customerRelationRequest, existingCustomerRelation);
                    CustomerRelation updatedCustomerRelation = customerRelationRepository
                            .save(existingCustomerRelation);
                    return customerRelationMapper.toResponse(updatedCustomerRelation);
                });
    }

    public void deleteCustomerRelation(Long id) {
        // Todo: Implement to update base entity (soft delete)
        customerRelationRepository.deleteById(id);
    }

    public void deleteCustomerRelations(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        customerRelationRepository.deleteAllById(ids);
    }

}
