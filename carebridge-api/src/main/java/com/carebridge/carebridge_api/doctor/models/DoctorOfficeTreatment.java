package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_doctor_office_treatment")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DoctorOfficeTreatment extends BaseEntity {

    public DoctorOfficeTreatment(Long doctorTreatmentId, Long doctorOfficeId) {
        this.doctorTreatmentId = doctorTreatmentId;
        this.doctorOfficeId = doctorOfficeId;
    }

    @ManyToOne
    @JoinColumn(name = "doctor_treatment_id", insertable = false, updatable = false)
    @JsonManagedReference
    public DoctorTreatment doctorTreatment;

    @Column(name = "doctor_treatment_id")
    private Long doctorTreatmentId;

    @ManyToOne
    @JoinColumn(name = "doctor_office_id", insertable = false, updatable = false)
    @JsonManagedReference
    private DoctorOffice doctorOffice;

    @Column(name = "doctor_office_id")
    private Long doctorOfficeId;
}
