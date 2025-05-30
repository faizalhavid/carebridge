package com.carebridge.carebridge_api.wellness.repositories;

import com.carebridge.carebridge_api.wellness.models.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepository extends JpaRepository<Habit, Long> {
}