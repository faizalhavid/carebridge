package com.carebridge.carebridge_api.customer.controllers;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carebridge.carebridge_api.customer.dto.requests.CustomerRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerResponse;
import com.carebridge.carebridge_api.customer.services.CustomerService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/customers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_CUSTOMER')")
    public ResponseEntity<PagedModel<EntityModel<CustomerResponse>>> getAllCustomers(Pageable pageable) {
        PagedModel<EntityModel<CustomerResponse>> pagedModel = PagedModel.of(
                customerService.getAllCustomers(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        customerService.getAllCustomers(pageable).getTotalElements(),
                        customerService.getAllCustomers(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_CUSTOMER')")
    public ResponseEntity<SuccessResponse<CustomerResponse, Object>> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
                .map(customer -> ResponseEntity.ok(
                        new SuccessResponse<>(customer, "Get customer by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_CUSTOMER')")
    public ResponseEntity<SuccessResponse<CustomerResponse, Object>> saveCustomer(
            @RequestBody CustomerRequest customerRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(customerService.saveCustomer(customerRequest),
                "Save customer successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_CUSTOMER')")
    public ResponseEntity<SuccessResponse<List<CustomerResponse>, Object>> saveCustomers(
            @RequestBody List<CustomerRequest> customerRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(customerService.saveCustomers(customerRequests),
                "Save customers successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_CUSTOMER')")
    public ResponseEntity<SuccessResponse<CustomerResponse, Object>> updateCustomer(@PathVariable Long id,
            @RequestBody CustomerRequest customerRequest) {
        return customerService.updateCustomer(id, customerRequest)
                .map(customer -> ResponseEntity.ok(
                        new SuccessResponse<>(customer, "Update customer successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_CUSTOMER')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete customer successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_CUSTOMER')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteCustomers(@RequestBody List<Long> ids) {
        customerService.deleteCustomers(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete customers successful", 200));
    }

}
