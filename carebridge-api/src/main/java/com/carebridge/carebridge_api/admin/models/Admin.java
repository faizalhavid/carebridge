package com.carebridge.carebridge_api.admin.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name = "m_admin")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "biodata_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Biodata biodata;

    @Column(name = "biodata_id")
    private Long biodataId;
}