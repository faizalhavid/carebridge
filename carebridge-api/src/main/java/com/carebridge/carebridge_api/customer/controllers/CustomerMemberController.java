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

import com.carebridge.carebridge_api.customer.dto.requests.CustomerMemberRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerMemberResponse;
import com.carebridge.carebridge_api.customer.services.CustomerMemberService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/customer-members")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CustomerMemberController {

    private final CustomerMemberService customerMemberService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_CUSTOMER_MEMBER')")
    public ResponseEntity<PagedModel<EntityModel<CustomerMemberResponse>>> getAllCustomerMembers(Pageable pageable) {
        PagedModel<EntityModel<CustomerMemberResponse>> pagedModel = PagedModel.of(
                customerMemberService.getAllCustomerMembers(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        customerMemberService.getAllCustomerMembers(pageable).getTotalElements(),
                        customerMemberService.getAllCustomerMembers(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_CUSTOMER_MEMBER')")
    public ResponseEntity<SuccessResponse<CustomerMemberResponse, Object>> getCustomerMemberById(
            @PathVariable Long id) {
        return customerMemberService.getCustomerMemberById(id)
                .map(customerMember -> ResponseEntity.ok(
                        new SuccessResponse<>(customerMember, "Get customer member by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_CUSTOMER_MEMBER')")
    public ResponseEntity<SuccessResponse<CustomerMemberResponse, Object>> saveCustomerMember(
            @RequestBody CustomerMemberRequest customerMemberRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(customerMemberService.saveCustomerMember(customerMemberRequest),
                "Save customer member successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_CUSTOMER_MEMBER')")
    public ResponseEntity<SuccessResponse<List<CustomerMemberResponse>, Object>> saveCustomerMembers(
            @RequestBody List<CustomerMemberRequest> customerMemberRequests) {
        return ResponseEntity
                .ok(new SuccessResponse<>(customerMemberService.saveCustomerMembers(customerMemberRequests),
                        "Save customer members successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_CUSTOMER_MEMBER')")
    public ResponseEntity<SuccessResponse<CustomerMemberResponse, Object>> updateCustomerMember(@PathVariable Long id,
            @RequestBody CustomerMemberRequest customerMemberRequest) {
        return customerMemberService.updateCustomerMember(id, customerMemberRequest)
                .map(customerMember -> ResponseEntity.ok(
                        new SuccessResponse<>(customerMember, "Update customer member successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_CUSTOMER_MEMBER')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteCustomerMember(@PathVariable Long id) {
        customerMemberService.deleteCustomerMember(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete customer member successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_CUSTOMER_MEMBER')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteCustomerMembers(@RequestBody List<Long> ids) {
        customerMemberService.deleteCustomerMembers(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete customer members successful", 200));
    }

}
