package com.carebridge.carebridge_api.user.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Data
@Table(name="m_role")
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
public class Role extends BaseEntity {

    @Column(name = "name", length=20)
    private String name;

    @Column(name = "code", length=20)
    private String code;

    @OneToMany(mappedBy = "role")
    @JsonBackReference
    private List<User> users;

}
