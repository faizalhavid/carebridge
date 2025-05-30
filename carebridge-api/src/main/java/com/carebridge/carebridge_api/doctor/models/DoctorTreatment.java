package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "t_doctor_treatment")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DoctorTreatment extends BaseEntity {

    public DoctorTreatment(Long doctorId, String name) {
        this.doctorId = doctorId;
        this.name = name;
    }

    @ManyToOne
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Doctor doctor;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "name")
    private String name;
}
