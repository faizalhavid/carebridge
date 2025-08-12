package com.carebridge.carebridge_api.user.dto.responses;

import jakarta.validation.constraints.NotNull;

public record BiodataResponse(
        Long id,
        @NotNull String fullName,
        @NotNull String mobilePhone,
        String imagePath,
        String address,
        Long customerId,
        Long adminId,
        Long doctorId
// Long medicalId
) {
}
