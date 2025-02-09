package com.carebridge.carebridge_api.auth.repositories;

import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DeviceInfoRepository extends JpaRepository<DeviceInfo, Long> {
}
