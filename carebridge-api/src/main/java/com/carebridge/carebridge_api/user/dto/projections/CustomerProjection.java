package com.carebridge.carebridge_api.user.dto.projections;


import com.carebridge.carebridge_api.customer.models.BloodGroup;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "adminProjection", types = {CustomerProjection.class})
public interface CustomerProjection {
    Long getId();

    Boolean getIsDeleted();

    LocalDate getDob();

    String getGender();

    BloodGroup getBloodGroup();
}
