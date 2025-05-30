package com.carebridge.carebridge_api.wellness.repositories;

import com.carebridge.carebridge_api.wellness.models.WaterIntakeLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterIntakeLogRepository extends JpaRepository<WaterIntakeLog, Long> {
}