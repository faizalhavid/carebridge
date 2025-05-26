package com.carebridge.carebridge_api.user.dto.responses;

import com.carebridge.carebridge_api.core.validators.Views;
import com.carebridge.carebridge_api.user.dto.projections.BiodataProjection;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.carebridge.carebridge_api.user.models.User;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    @JsonView(Views.Public.class)
    private User user;
    @JsonView(Views.Public.class)
    private Biodata biodata;
}
