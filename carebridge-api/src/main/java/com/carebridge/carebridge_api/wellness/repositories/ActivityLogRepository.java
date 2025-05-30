package com.carebridge.carebridge_api.wellness.repositories;

import com.carebridge.carebridge_api.wellness.models.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}