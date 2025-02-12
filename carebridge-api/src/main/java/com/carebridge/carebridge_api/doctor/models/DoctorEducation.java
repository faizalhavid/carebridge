package com.carebridge.carebridge_api.doctor.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "m_doctor_education")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DoctorEducation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    private Doctor doctor;

    @Column(name = "doctor_id")
    private Long doctorId;

    @ManyToOne
    @JoinColumn(name = "education_level_id", insertable = false, updatable = false)
    private EducationLevel educationLevel;

    @Column(name = "education_level_id")
    private Long educationLevelId;

    @Column(name = "institution_name", length = 100)
    private String institutionName;

    @Column(name = "major", length = 100)
    private String major;

    @Column(name = "start_year", length = 4)
    private String startYear;

    @Column(name = "end_year", length = 4)
    private String endYear;

    @Column(name = "is_last_education")
    private Boolean isLastEducation = true;

}
