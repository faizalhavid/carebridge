package com.carebridge.carebridge_api.medical.model;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_medical_facility_schedule")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class MedicalFacilitySchedule extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "medical_facility_id", insertable = false, updatable = false)
    private MedicalFacility medicalFacility;

    @Column(name = "medical_facility_id")
    private Long medicalFacilityId;

    @Column(name = "day", length = 10)
    private String day;

    @Column(name = "time_schedule_start", length = 10)
    private String timeScheduleStart;

    @Column(name = "time_schedule_end", length = 10)
    private String timeScheduleEnd;
}
