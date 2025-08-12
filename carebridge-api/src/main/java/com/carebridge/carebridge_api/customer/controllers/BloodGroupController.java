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

import com.carebridge.carebridge_api.customer.dto.requests.BloodGroupRequest;
import com.carebridge.carebridge_api.customer.dto.responses.BloodGroupResponse;
import com.carebridge.carebridge_api.customer.services.BloodGroupService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/blood-groups")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class BloodGroupController {

    private final BloodGroupService bloodGroupService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_BLOOD_GROUP')")
    public ResponseEntity<PagedModel<EntityModel<BloodGroupResponse>>> getAllBloodGroups(Pageable pageable) {
        PagedModel<EntityModel<BloodGroupResponse>> pagedModel = PagedModel.of(
                bloodGroupService.getAllBloodGroups(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        bloodGroupService.getAllBloodGroups(pageable).getTotalElements(),
                        bloodGroupService.getAllBloodGroups(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_BLOOD_GROUP')")
    public ResponseEntity<SuccessResponse<BloodGroupResponse, Object>> getBloodGroupById(@PathVariable Long id) {
        return bloodGroupService.getBloodGroupById(id)
                .map(bloodGroup -> ResponseEntity.ok(
                        new SuccessResponse<>(bloodGroup, "Get blood group by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_BLOOD_GROUP')")
    public ResponseEntity<SuccessResponse<BloodGroupResponse, Object>> saveBloodGroup(
            @RequestBody BloodGroupRequest bloodGroupRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(bloodGroupService.saveBloodGroup(bloodGroupRequest),
                "Save blood group successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_BLOOD_GROUP')")
    public ResponseEntity<SuccessResponse<List<BloodGroupResponse>, Object>> saveBloodGroups(
            @RequestBody List<BloodGroupRequest> bloodGroupRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(bloodGroupService.saveBloodGroups(bloodGroupRequests),
                "Save blood groups successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_BLOOD_GROUP')")
    public ResponseEntity<SuccessResponse<BloodGroupResponse, Object>> updateBloodGroup(@PathVariable Long id,
            @RequestBody BloodGroupRequest bloodGroupRequest) {
        return bloodGroupService.updateBloodGroup(id, bloodGroupRequest)
                .map(bloodGroup -> ResponseEntity.ok(
                        new SuccessResponse<>(bloodGroup, "Update blood group successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_BLOOD_GROUP')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteBloodGroup(@PathVariable Long id) {
        bloodGroupService.deleteBloodGroup(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete blood group successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_BLOOD_GROUP')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteBloodGroups(@RequestBody List<Long> ids) {
        bloodGroupService.deleteBloodGroups(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete blood groups successful", 200));
    }

}
