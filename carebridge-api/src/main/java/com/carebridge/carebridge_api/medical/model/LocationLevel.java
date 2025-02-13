package com.carebridge.carebridge_api.medical.model;


import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_location_level")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class LocationLevel extends BaseEntity {

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "abbreviation", length = 50)
    private String abbreviation;

    @OneToMany(mappedBy="locationLevel", cascade= CascadeType.ALL)
    @JsonBackReference
    List<Location> location;
}
