package com.carebridge.carebridge_api.access.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuRoleResponse {
    private MenuResponse menu;
    @JsonIgnore
    private String roleCode;
}