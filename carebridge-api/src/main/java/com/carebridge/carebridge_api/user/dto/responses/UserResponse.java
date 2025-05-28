package com.carebridge.carebridge_api.user.dto.responses;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @JsonView(Views.Public.class)
public class UserResponse {
    private int id;
    private ProfileResponse biodata;
}
