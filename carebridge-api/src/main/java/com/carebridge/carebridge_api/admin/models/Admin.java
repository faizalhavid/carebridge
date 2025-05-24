package com.carebridge.carebridge_api.admin.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.Biodata;
import jakarta.persistence.*;
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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "biodata_id", referencedColumnName = "id")
    private Biodata biodata;

    
    @Column(nullable = true, columnDefinition = "int default 2")
    private int maxGenerateAdminUser;
}