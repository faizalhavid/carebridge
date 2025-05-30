package com.carebridge.carebridge_api.wellness.dto.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class HabitLogRequest {
    @NotNull(message = "Habit ID is required")
    private Long habitId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "isDone is required")
    private Boolean isDone;
}