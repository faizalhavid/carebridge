package com.carebridge.carebridge_api.customer.models;


import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name="m_customer_relation")
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
public class CustomerRelation extends BaseEntity {

    @Column(name="name", length=50)
    private String name;

    @OneToMany(mappedBy="customerRelation", cascade= CascadeType.ALL)
    @JsonBackReference
    List<CustomerMember> customerMember;
}
