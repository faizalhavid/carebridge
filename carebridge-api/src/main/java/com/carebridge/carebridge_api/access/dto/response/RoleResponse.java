package com.carebridge.carebridge_api.access.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoleResponse {
    private int id;
    private String name;
    private String code;
}