package com.carebridge.carebridge_api.wellness.dto.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ActivityLogRequest {
    @NotNull(message = "Activity ID is required")
    private Long activityId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private Integer durationMinutes;
    private Double caloriesBurned;
}