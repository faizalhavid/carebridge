package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.core.annotations.validators.Views;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_doctor")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Doctor extends BaseEntity {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "biodata_id", referencedColumnName = "id")
    @JsonView(Views.Public.class)
    private Biodata biodata;


    @Column(name = "str", length = 50)
    @JsonView(Views.Public.class)
    private String str;

    // @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
    // @JsonBackReference
    // List<CurrentDoctorSpecialization> currentDoctorSpecialization;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonBackReference
    @JsonView(Views.Public.class)
    List<DoctorOffice> doctorOffices;

    // @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
    // @JsonBackReference
    // List<DoctorTreatment> doctorTreatments;

    // @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
    // @JsonBackReference
    // List<CustomerChat> customerChat;
}
