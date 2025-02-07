package com.carebridge.carebridge_api.customer.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;



@Entity
@Data
@Table(name = "m_blood_group")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class BloodGroup extends BaseEntity {

    @Column(name="code", length=5)
    private String code;

    @Column(name="description", length=255)
    private String description;
}

