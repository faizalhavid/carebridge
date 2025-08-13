package com.carebridge.carebridge_api.auth.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.auth.dto.requests.DeviceInfoRequest;
import com.carebridge.carebridge_api.auth.dto.responses.DeviceInfoResponse;
import com.carebridge.carebridge_api.auth.mappers.DeviceInfoMapper;
import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import com.carebridge.carebridge_api.auth.repositories.DeviceInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceInfoService {

    private final DeviceInfoRepository deviceInfoRepository;
    private final DeviceInfoMapper deviceInfoMapper;

    public Page<DeviceInfoResponse> getAllDeviceInfos(Pageable pageable) {
        return deviceInfoRepository.findAll(pageable)
                .map(deviceInfoMapper::toResponse);
    }

    public Optional<DeviceInfoResponse> getDeviceInfoById(Long id) {
        return deviceInfoRepository.findById(id)
                .map(deviceInfoMapper::toResponse);
    }

    public DeviceInfoResponse saveDeviceInfo(DeviceInfoRequest deviceInfoRequest) {
        DeviceInfo deviceInfo = deviceInfoMapper.toEntity(deviceInfoRequest);
        deviceInfo = deviceInfoRepository.save(deviceInfo);
        return deviceInfoMapper.toResponse(deviceInfo);
    }

    public List<DeviceInfoResponse> saveDeviceInfos(List<DeviceInfoRequest> deviceInfoRequests) {
        List<DeviceInfo> deviceInfos = deviceInfoRequests.stream()
                .map(deviceInfoMapper::toEntity)
                .collect(Collectors.toList());
        List<DeviceInfo> savedDeviceInfos = deviceInfoRepository.saveAll(deviceInfos);
        return savedDeviceInfos.stream()
                .map(deviceInfoMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<DeviceInfoResponse> updateDeviceInfo(Long id, DeviceInfoRequest deviceInfoRequest) {
        return deviceInfoRepository.findById(id)
                .map(existingDeviceInfo -> {
                    deviceInfoMapper.patch(deviceInfoRequest, existingDeviceInfo);
                    DeviceInfo updatedDeviceInfo = deviceInfoRepository.save(existingDeviceInfo);
                    return deviceInfoMapper.toResponse(updatedDeviceInfo);
                });
    }

    public void deleteDeviceInfo(Long id) {
        // Todo: Implement to update base entity (soft delete)
        deviceInfoRepository.deleteById(id);
    }

    public void deleteDeviceInfos(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        deviceInfoRepository.deleteAllById(ids);
    }

}
