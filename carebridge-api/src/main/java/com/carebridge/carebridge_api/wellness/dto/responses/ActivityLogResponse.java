package com.carebridge.carebridge_api.wellness.dto.responses;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ActivityLogResponse {
    private Long id;
    private Long activityId;
    private Long userId;
    private LocalDate date;
    private Integer durationMinutes;
    private Double caloriesBurned;
}