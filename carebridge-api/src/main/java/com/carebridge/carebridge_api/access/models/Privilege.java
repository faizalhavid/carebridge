package com.carebridge.carebridge_api.access.models;

import java.util.Collection;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "m_privileges")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Privilege extends BaseEntity {

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "code", length = 20)
    private String code;

    @ManyToMany(mappedBy = "privileges")
    @JsonBackReference
    private Collection<Role> roles;

}
