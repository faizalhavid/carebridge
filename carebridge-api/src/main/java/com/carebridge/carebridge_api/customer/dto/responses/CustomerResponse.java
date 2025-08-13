package com.carebridge.carebridge_api.customer.dto.responses;

import java.time.LocalDate;
import java.util.List;

import com.carebridge.carebridge_api.customer.models.BloodGroup;
import com.carebridge.carebridge_api.user.dto.responses.BiodataResponse;

public record CustomerResponse(
        Long id,
        BiodataResponse biodata,
        LocalDate dob,
        String gender,
        BloodGroup bloodGroup,
        String rhesusType,
        Float height,
        Float weight,
        List<CustomerMemberResponse> customerMemberIds) {
}
