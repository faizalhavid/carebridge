package com.carebridge.carebridge_api.medical.model;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_location")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Location extends BaseEntity {

    @Column(name = "name", length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name="parent_id", insertable=false, updatable=false)
    private Location parent;

    @Column(name = "parent_id")
    private Long parentId;

    @ManyToOne
    @JoinColumn(name = "location_level_id", insertable = false, updatable = false)
    @JsonManagedReference
    private LocationLevel locationLevel;

    @Column(name = "location_level_id")
    private Long locationLevelId;

    @OneToMany(mappedBy="location", cascade=CascadeType.ALL)
    @JsonBackReference
    List<MedicalFacility> medicalFacilitys;

}
