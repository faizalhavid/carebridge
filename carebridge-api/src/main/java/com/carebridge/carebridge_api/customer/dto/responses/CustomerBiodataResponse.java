package com.carebridge.carebridge_api.customer.dto.responses;


import com.carebridge.carebridge_api.customer.repositories.CustomerMemberRepository;
import com.carebridge.carebridge_api.user.dto.projections.BiodataProjection;
import com.carebridge.carebridge_api.user.dto.projections.ProfileProjection;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerBiodataResponse {
    ProfileProjection projection;
    CustomerMemberRepository customerMemberRepository;
}
