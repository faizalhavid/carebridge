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

import com.carebridge.carebridge_api.access.dto.requests.RoleRequest;
import com.carebridge.carebridge_api.access.dto.responses.RoleResponse;
import com.carebridge.carebridge_api.access.services.RoleService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/roles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_ROLE')")
    public ResponseEntity<PagedModel<EntityModel<RoleResponse>>> getAllRoles(Pageable pageable) {
        PagedModel<EntityModel<RoleResponse>> pagedModel = PagedModel.of(
                roleService.getAllRoles(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        roleService.getAllRoles(pageable).getTotalElements(),
                        roleService.getAllRoles(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_ROLE')")
    public ResponseEntity<SuccessResponse<RoleResponse, Object>> getRoleById(@PathVariable Long id) {
        return roleService.getRoleById(id)
                .map(role -> ResponseEntity.ok(
                        new SuccessResponse<>(role, "Get role by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_ROLE')")
    public ResponseEntity<SuccessResponse<RoleResponse, Object>> saveRole(@RequestBody RoleRequest roleRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(roleService.saveRole(roleRequest),
                "Save role successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_ROLE')")
    public ResponseEntity<SuccessResponse<List<RoleResponse>, Object>> saveRoles(
            @RequestBody List<RoleRequest> roleRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(roleService.saveRoles(roleRequests),
                "Save roles successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_ROLE')")
    public ResponseEntity<SuccessResponse<RoleResponse, Object>> updateRole(@PathVariable Long id,
            @RequestBody RoleRequest roleRequest) {
        return roleService.updateRole(id, roleRequest)
                .map(role -> ResponseEntity.ok(
                        new SuccessResponse<>(role, "Update role successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete role successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteRoles(@RequestBody List<Long> ids) {
        roleService.deleteRoles(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete roles successful", 200));
    }

}
