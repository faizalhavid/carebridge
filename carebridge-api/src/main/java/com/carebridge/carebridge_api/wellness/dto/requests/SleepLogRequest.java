package com.carebridge.carebridge_api.wellness.dto.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SleepLogRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Sleep start is required")
    private LocalDateTime sleepStart;

    @NotNull(message = "Sleep end is required")
    private LocalDateTime sleepEnd;

    private Double sleepDurationHours;
    private String sleepQuality;
}