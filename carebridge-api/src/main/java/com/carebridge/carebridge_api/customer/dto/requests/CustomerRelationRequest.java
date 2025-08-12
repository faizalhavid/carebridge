package com.carebridge.carebridge_api.customer.dto.requests;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRelationRequest {

    @Schema(description = "Customer Relation ID - nullable for create, can be used for updates or references", nullable = true)
    private Long id;

    @Schema(description = "Relation name", nullable = false, example = "Parent")
    @NotBlank(message = "Relation name is required")
    @Size(max = 50, message = "Name must be at most 50 characters")
    private String name;

    @Schema(description = "Customer member IDs", nullable = true)
    private List<Long> customerMemberIds;

}
