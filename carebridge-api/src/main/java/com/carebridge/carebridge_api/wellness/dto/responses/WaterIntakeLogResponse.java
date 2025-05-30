package com.carebridge.carebridge_api.wellness.dto.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WaterIntakeLogResponse {
    private Long id;
    private Long userId;
    private LocalDateTime dateTime;
    private Double amountMl;
}