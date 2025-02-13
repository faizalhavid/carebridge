package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToOne
    @JoinColumn(name = "biodata_id", insertable = false, updatable = false)
    public Biodata biodata;

    @Column(name = "biodata_id")
    private Long biodataId;

    @Column(name = "str", length = 50)
    private String str;

//    @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
//    @JsonBackReference
//    List<CurrentDoctorSpecialization> currentDoctorSpecialization;

    @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
    @JsonBackReference
    List<DoctorOffice> doctorOffices;

//    @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
//    @JsonBackReference
//    List<DoctorTreatment> doctorTreatments;

//    @OneToMany(mappedBy="doctor", cascade=CascadeType.ALL)
//    @JsonBackReference
//    List<CustomerChat> customerChat;
}
