package com.carebridge.carebridge_api.access.controllers;

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

import com.carebridge.carebridge_api.access.dto.requests.PrivilegeRequest;
import com.carebridge.carebridge_api.access.dto.responses.PrivilegeResponse;
import com.carebridge.carebridge_api.access.services.PrivilegeService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/privileges")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class PrivilegeController {

    private final PrivilegeService privilegeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_PRIVILEGE')")
    public ResponseEntity<PagedModel<EntityModel<PrivilegeResponse>>> getAllPrivileges(Pageable pageable) {
        PagedModel<EntityModel<PrivilegeResponse>> pagedModel = PagedModel.of(
                privilegeService.getAllPrivileges(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        privilegeService.getAllPrivileges(pageable).getTotalElements(),
                        privilegeService.getAllPrivileges(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_PRIVILEGE')")
    public ResponseEntity<SuccessResponse<PrivilegeResponse, Object>> getPrivilegeById(@PathVariable Long id) {
        return privilegeService.getPrivilegeById(id)
                .map(privilege -> ResponseEntity.ok(
                        new SuccessResponse<>(privilege, "Get privilege by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_PRIVILEGE')")
    public ResponseEntity<SuccessResponse<PrivilegeResponse, Object>> savePrivilege(
            @RequestBody PrivilegeRequest privilegeRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(privilegeService.savePrivilege(privilegeRequest),
                "Save privilege successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_PRIVILEGE')")
    public ResponseEntity<SuccessResponse<List<PrivilegeResponse>, Object>> savePrivileges(
            @RequestBody List<PrivilegeRequest> privilegeRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(privilegeService.savePrivileges(privilegeRequests),
                "Save privileges successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_PRIVILEGE')")
    public ResponseEntity<SuccessResponse<PrivilegeResponse, Object>> updatePrivilege(@PathVariable Long id,
            @RequestBody PrivilegeRequest privilegeRequest) {
        return privilegeService.updatePrivilege(id, privilegeRequest)
                .map(privilege -> ResponseEntity.ok(
                        new SuccessResponse<>(privilege, "Update privilege successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_PRIVILEGE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deletePrivilege(@PathVariable Long id) {
        privilegeService.deletePrivilege(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete privilege successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_PRIVILEGE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deletePrivileges(@RequestBody List<Long> ids) {
        privilegeService.deletePrivileges(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete privileges successful", 200));
    }

}
