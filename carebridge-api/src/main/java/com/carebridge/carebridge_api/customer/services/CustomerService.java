package com.carebridge.carebridge_api.customer.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.customer.dto.requests.CustomerRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerResponse;
import com.carebridge.carebridge_api.customer.mappers.CustomerMapper;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.customer.repositories.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public Page<CustomerResponse> getAllCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable)
                .map(customerMapper::toResponse);
    }

    public Optional<CustomerResponse> getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(customerMapper::toResponse);
    }

    public CustomerResponse saveCustomer(CustomerRequest customerRequest) {
        Customer customer = customerMapper.toEntity(customerRequest);
        customer = customerRepository.save(customer);
        return customerMapper.toResponse(customer);
    }

    public List<CustomerResponse> saveCustomers(List<CustomerRequest> customerRequests) {
        List<Customer> customers = customerRequests.stream()
                .map(customerMapper::toEntity)
                .collect(Collectors.toList());
        List<Customer> savedCustomers = customerRepository.saveAll(customers);
        return savedCustomers.stream()
                .map(customerMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<CustomerResponse> updateCustomer(Long id, CustomerRequest customerRequest) {
        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    customerMapper.patch(customerRequest, existingCustomer);
                    Customer updatedCustomer = customerRepository.save(existingCustomer);
                    return customerMapper.toResponse(updatedCustomer);
                });
    }

    public void deleteCustomer(Long id) {
        // Todo: Implement to update base entity (soft delete)
        customerRepository.deleteById(id);
    }

    public void deleteCustomers(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        customerRepository.deleteAllById(ids);
    }

}
