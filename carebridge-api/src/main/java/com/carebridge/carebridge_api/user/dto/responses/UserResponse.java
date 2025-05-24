package com.carebridge.carebridge_api.user.dto.responses;

import com.carebridge.carebridge_api.user.dto.projections.BiodataProjection;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private UserProjection user;
    private BiodataProjection biodata;

}
