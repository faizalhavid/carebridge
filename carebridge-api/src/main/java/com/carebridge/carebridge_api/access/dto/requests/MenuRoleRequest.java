package com.carebridge.carebridge_api.access.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuRoleRequest {

    @Schema(description = "Menu - can be ID only or full object for create", nullable = false)
    @NotNull(message = "Menu is required")
    @Valid
    private MenuRequest menu;

    @Schema(description = "Role - can be ID only or full object for create", nullable = false)
    @NotNull(message = "Role is required")
    @Valid
    private RoleRequest role;

}
