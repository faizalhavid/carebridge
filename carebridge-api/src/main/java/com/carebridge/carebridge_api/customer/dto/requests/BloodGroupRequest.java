package com.carebridge.carebridge_api.customer.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BloodGroupRequest {

    @Schema(description = "Blood Group ID - nullable for create, can be used for updates or references", nullable = true)
    private Long id;

    @Schema(description = "Blood group code", nullable = false, example = "A")
    @NotBlank(message = "Blood group code is required")
    @Size(max = 5, message = "Code must be at most 5 characters")
    private String code;

    @Schema(description = "Blood group description", nullable = true, example = "Type A")
    @Size(max = 255, message = "Description must be at most 255 characters")
    private String description;

}
