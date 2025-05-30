package com.carebridge.carebridge_api.wellness.repositories;

import com.carebridge.carebridge_api.wellness.models.HabitLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitLogRepository extends JpaRepository<HabitLog, Long> {
}