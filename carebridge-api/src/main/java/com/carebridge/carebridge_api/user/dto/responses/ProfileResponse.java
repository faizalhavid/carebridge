package com.carebridge.carebridge_api.user.dto.responses;

import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.doctor.models.Doctor;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
@RequiredArgsConstructor
public class ProfileResponse {
    @NotNull
    private String fullName;
    @NotNull
    private String mobilePhone;
    private String imagePath;
    private String address;

    private Customer customer;
    private Admin admin;
    private Doctor doctor;
    // private Medical medical;
}
