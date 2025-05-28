package com.carebridge.carebridge_api.user.dto.projections;

import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.core.annotations.validators.Views;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.doctor.models.Doctor;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Value;

public interface BiodataProjection {
    Long getId();

    String getFullName();

    String getMobilePhone();

    String getImagePath();

    @JsonView(Views.Public.class)
    @Value("#{target.customer != null ? target.customer : null}")
    Customer getCustomer();

    @JsonView(Views.Public.class)
    @Value("#{target.admin != null ? target.admin : null}")
    Admin getAdmin();

    @JsonView(Views.Public.class)
    @Value("#{target.doctor != null ? target.doctor : null}")
    Doctor getDoctor();

    // @Value("#{target.medical != null ? target.medical : null}")
    // List<Medical> getMedical();
}