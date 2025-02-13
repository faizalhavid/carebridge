package com.carebridge.carebridge_api.medical.model;


import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_medical_facility")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class MedicalFacility extends BaseEntity {

    @Column(name = "name", length = 50)
    private String name;

    @ManyToOne
    @JoinColumn(name = "medical_facility_category_id", insertable = false, updatable = false)
    private MedicalFacilityCategory medicalFacilityCategory;

    @Column(name = "medical_facility_category_id")
    private Long medicalFacilityCategoryId;

    @ManyToOne
    @JoinColumn(name = "location_id", insertable = false, updatable = false)
    private Location location;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "full_address")
    private String fullAddress;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phone_code", length = 10)
    private String phoneCode;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "fax", length = 15)
    private String fax;
}
