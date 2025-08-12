package com.carebridge.carebridge_api.customer.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerMemberRequest {

    @Schema(description = "Customer Member ID - nullable for create, can be used for updates or references", nullable = true)
    private Long id;

    @Schema(description = "Parent biodata ID", nullable = true)
    private Long parentBiodataId;

    @Schema(description = "Customer ID for reference", nullable = false)
    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @Schema(description = "Customer relation - can be ID only or full object for create", nullable = true)
    @Valid
    private CustomerRelationRequest customerRelation;

}
