package com.carebridge.carebridge_api.wellness.dto.responses;

import lombok.Data;

@Data
public class HabitResponse {
    private Long id;
    private String name;
    private String description;
    private Long userId;
}