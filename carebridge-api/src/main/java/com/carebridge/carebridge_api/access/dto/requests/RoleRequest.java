package com.carebridge.carebridge_api.access.dto.requests;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleRequest {

    @Schema(description = "Role ID - nullable for create, can be used for updates or references", nullable = true)
    private Long id;

    @Schema(description = "Role name", nullable = false)
    @NotBlank(message = "Name is required")
    @Size(max = 80, message = "Name must be at most 80 characters")
    private String name;

    @Schema(description = "Role code", nullable = false)
    @NotBlank(message = "Code is required")
    @Size(max = 60, message = "Code must be at most 60 characters")
    private String code;

    @Schema(description = "Privileges - can be IDs only or full objects for create", nullable = true)
    @Valid
    private List<PrivilegeRequest> privileges;

}
