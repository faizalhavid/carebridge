package com.carebridge.carebridge_api.wellness.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HabitRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @NotNull(message = "User ID is required")
    private Long userId;
}