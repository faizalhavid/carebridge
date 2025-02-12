package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.medical.model.MedicalFacility;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "t_doctor_office")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DoctorOffice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Doctor doctor;

    @Column(name = "doctor_id")
    private Long doctorId;

    @ManyToOne
    @JoinColumn(name = "medical_facility_id", insertable = false, updatable = false)
    @JsonManagedReference
    private MedicalFacility medicalFacility;

    @Column(name = "medical_facility_id")
    private Long medicalFacilityId;

    @Column(name = "specialization", length = 100, nullable = false)
    private String specialization;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "service_unit_id", insertable = false, updatable = false)
    @JsonManagedReference
    private ServiceUnit serviceUnit;

    @Column(name = "service_unit_id")
    private Long serviceUnitId;
}
