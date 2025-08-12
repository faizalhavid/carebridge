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

import com.carebridge.carebridge_api.customer.dto.requests.CustomerRelationRequest;
import com.carebridge.carebridge_api.customer.dto.responses.CustomerRelationResponse;
import com.carebridge.carebridge_api.customer.services.CustomerRelationService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/customer-relations")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CustomerRelationController {

    private final CustomerRelationService customerRelationService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_CUSTOMER_RELATION')")
    public ResponseEntity<PagedModel<EntityModel<CustomerRelationResponse>>> getAllCustomerRelations(
            Pageable pageable) {
        PagedModel<EntityModel<CustomerRelationResponse>> pagedModel = PagedModel.of(
                customerRelationService.getAllCustomerRelations(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        customerRelationService.getAllCustomerRelations(pageable).getTotalElements(),
                        customerRelationService.getAllCustomerRelations(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_CUSTOMER_RELATION')")
    public ResponseEntity<SuccessResponse<CustomerRelationResponse, Object>> getCustomerRelationById(
            @PathVariable Long id) {
        return customerRelationService.getCustomerRelationById(id)
                .map(customerRelation -> ResponseEntity.ok(
                        new SuccessResponse<>(customerRelation, "Get customer relation by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_CUSTOMER_RELATION')")
    public ResponseEntity<SuccessResponse<CustomerRelationResponse, Object>> saveCustomerRelation(
            @RequestBody CustomerRelationRequest customerRelationRequest) {
        return ResponseEntity
                .ok(new SuccessResponse<>(customerRelationService.saveCustomerRelation(customerRelationRequest),
                        "Save customer relation successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_CUSTOMER_RELATION')")
    public ResponseEntity<SuccessResponse<List<CustomerRelationResponse>, Object>> saveCustomerRelations(
            @RequestBody List<CustomerRelationRequest> customerRelationRequests) {
        return ResponseEntity
                .ok(new SuccessResponse<>(customerRelationService.saveCustomerRelations(customerRelationRequests),
                        "Save customer relations successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_CUSTOMER_RELATION')")
    public ResponseEntity<SuccessResponse<CustomerRelationResponse, Object>> updateCustomerRelation(
            @PathVariable Long id,
            @RequestBody CustomerRelationRequest customerRelationRequest) {
        return customerRelationService.updateCustomerRelation(id, customerRelationRequest)
                .map(customerRelation -> ResponseEntity.ok(
                        new SuccessResponse<>(customerRelation, "Update customer relation successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_CUSTOMER_RELATION')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteCustomerRelation(@PathVariable Long id) {
        customerRelationService.deleteCustomerRelation(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete customer relation successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_CUSTOMER_RELATION')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteCustomerRelations(@RequestBody List<Long> ids) {
        customerRelationService.deleteCustomerRelations(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete customer relations successful", 200));
    }

}
