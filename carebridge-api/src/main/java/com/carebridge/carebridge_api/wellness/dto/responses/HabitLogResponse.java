package com.carebridge.carebridge_api.wellness.dto.responses;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HabitLogResponse {
    private Long id;
    private Long habitId;
    private Long userId;
    private LocalDate date;
    private Boolean isDone;
}