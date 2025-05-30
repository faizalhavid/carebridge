package com.carebridge.carebridge_api.wellness.repositories;

import com.carebridge.carebridge_api.wellness.models.SleepLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SleepLogRepository extends JpaRepository<SleepLog, Long> {
}