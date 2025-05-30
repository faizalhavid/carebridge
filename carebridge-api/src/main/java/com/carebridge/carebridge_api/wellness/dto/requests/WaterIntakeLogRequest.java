package com.carebridge.carebridge_api.wellness.dto.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WaterIntakeLogRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "DateTime is required")
    private LocalDateTime dateTime;

    @NotNull(message = "Amount (ml) is required")
    private Double amountMl;
}