package com.carebridge.carebridge_api.wellness.dto.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SleepLogResponse {
    private Long id;
    private Long userId;
    private LocalDateTime sleepStart;
    private LocalDateTime sleepEnd;
    private Double sleepDurationHours;
    private String sleepQuality;
}