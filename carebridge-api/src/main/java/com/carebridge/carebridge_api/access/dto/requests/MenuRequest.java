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
public class MenuRequest {

    @Schema(description = "Menu ID - nullable for create, can be used for updates or references", nullable = true)
    private Long id;

    @Schema(description = "Menu name", nullable = false)
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;

    @Schema(description = "Menu URL", nullable = true)
    @Size(max = 255, message = "URL must be at most 255 characters")
    private String url;

    @Schema(description = "Parent menu - can be ID only or full object for create", nullable = true)
    @Valid
    private MenuRequest parent;

    @Schema(description = "Children menus - can be IDs only or full objects for create", nullable = true)
    @Valid
    private List<MenuRequest> children;

    @Schema(description = "Big icon", nullable = true)
    @Size(max = 100, message = "Big icon must be at most 100 characters")
    private String bigIcon;

    @Schema(description = "Small icon", nullable = true)
    @Size(max = 100, message = "Small icon must be at most 100 characters")
    private String smallIcon;

}
