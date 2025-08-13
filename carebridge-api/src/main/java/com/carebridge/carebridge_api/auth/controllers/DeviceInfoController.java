package com.carebridge.carebridge_api.auth.controllers;

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

import com.carebridge.carebridge_api.auth.dto.requests.DeviceInfoRequest;
import com.carebridge.carebridge_api.auth.dto.responses.DeviceInfoResponse;
import com.carebridge.carebridge_api.auth.services.DeviceInfoService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/device-infos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class DeviceInfoController {

    private final DeviceInfoService deviceInfoService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_DEVICE_INFO')")
    public ResponseEntity<PagedModel<EntityModel<DeviceInfoResponse>>> getAllDeviceInfos(Pageable pageable) {
        PagedModel<EntityModel<DeviceInfoResponse>> pagedModel = PagedModel.of(
                deviceInfoService.getAllDeviceInfos(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        deviceInfoService.getAllDeviceInfos(pageable).getTotalElements(),
                        deviceInfoService.getAllDeviceInfos(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_DEVICE_INFO')")
    public ResponseEntity<SuccessResponse<DeviceInfoResponse, Object>> getDeviceInfoById(@PathVariable Long id) {
        return deviceInfoService.getDeviceInfoById(id)
                .map(deviceInfo -> ResponseEntity.ok(
                        new SuccessResponse<>(deviceInfo, "Get device info by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_DEVICE_INFO')")
    public ResponseEntity<SuccessResponse<DeviceInfoResponse, Object>> saveDeviceInfo(
            @RequestBody DeviceInfoRequest deviceInfoRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(deviceInfoService.saveDeviceInfo(deviceInfoRequest),
                "Save device info successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_DEVICE_INFO')")
    public ResponseEntity<SuccessResponse<List<DeviceInfoResponse>, Object>> saveDeviceInfos(
            @RequestBody List<DeviceInfoRequest> deviceInfoRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(deviceInfoService.saveDeviceInfos(deviceInfoRequests),
                "Save device infos successful", 201));
    }

  /*  @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_DEVICE_INFO')")
    public ResponseEntity<SuccessResponse<DeviceInfoResponse, Object>> updateDeviceInfo(@PathVariable Long id,
            @RequestBody DeviceInfoRequest deviceInfoRequest) {
        return deviceInfoService.updateDeviceInfo(id, deviceInfoRequest)
                .map(deviceInfo -> ResponseEntity.ok(
                        new SuccessResponse<>(deviceInfo, "Update device info successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }
*/
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_DEVICE_INFO')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteDeviceInfo(@PathVariable Long id) {
        deviceInfoService.deleteDeviceInfo(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete device info successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_DEVICE_INFO')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteDeviceInfos(@RequestBody List<Long> ids) {
        deviceInfoService.deleteDeviceInfos(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete device infos successful", 200));
    }

}
