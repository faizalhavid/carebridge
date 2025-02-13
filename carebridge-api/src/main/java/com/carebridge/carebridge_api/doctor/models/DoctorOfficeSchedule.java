package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.medical.model.MedicalFacilitySchedule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_doctor_office_schedule")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DoctorOfficeSchedule extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    private Doctor doctor;

    @Column(name = "doctor_id")
    private Long doctorId;

    @ManyToOne
    @JoinColumn(name = "medical_facility_schedule_id", insertable = false, updatable = false)
    private MedicalFacilitySchedule medicalFacilitySchedule;

    @Column(name = "medical_facility_schedule_id")
    private Long medicalFacilityScheduleId;

    @Column(name = "slot")
    private Integer slot;
}