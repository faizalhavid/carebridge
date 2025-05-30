package com.carebridge.carebridge_api.doctor.models;

import java.util.List;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_specialization")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Specialization extends BaseEntity {

    @Column(name = "name", length = 50)
    private String name;

    @OneToMany(mappedBy = "specialization", cascade = CascadeType.ALL)
    @JsonBackReference
    List<CurrentDoctorSpecialization> currentDoctorSpecialization;
}
