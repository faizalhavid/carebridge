package com.carebridge.carebridge_api.wellness.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ActivityRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;
}