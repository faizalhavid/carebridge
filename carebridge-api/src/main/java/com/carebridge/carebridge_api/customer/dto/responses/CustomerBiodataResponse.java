package com.carebridge.carebridge_api.customer.dto.responses;

import com.carebridge.carebridge_api.user.dto.requests.BiodataRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerBiodataResponse {

    private BiodataRequest biodata;
    private Long customerMemberId;
    private String membershipType;

    // Add other customer-specific fields as needed
}
