package com.carebridge.carebridge_api.user.dto.projections;

import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.doctor.models.Doctor;

import org.springframework.beans.factory.annotation.Value;
import java.util.List;

public interface BiodataProjection {
    Long getId();

    String getFullName();

    String getMobilePhone();

    String getImagePath();

    @Value("#{target.customer != null ? target.customer : null}")
    Customer getCustomer();

    @Value("#{target.admin != null ? target.admin : null}")
    Admin getAdmin();

    @Value("#{target.doctor != null ? target.doctor : null}")
    Doctor getDoctor();
    //
    // @Value("#{target.medical != null ? target.medical : null}")
    // List<Medical> getMedical();
}