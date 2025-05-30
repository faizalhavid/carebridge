package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_doctor_treatment_price")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DoctorTreatmentPrice extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "doctor_office_treatment_id", insertable = false, updatable = false)
    private DoctorOfficeTreatment doctorOfficeTreatment;

    @Column(name = "doctor_office_treatment_id")
    private Long doctorOfficeTreatmentId;

    @Column(name = "price")
    private Double price;

    @Column(name = "price_start_from")
    private Double priceStartFrom;

    @Column(name = "price_until_from")
    private Double priceUntilForm;
}
