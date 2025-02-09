package com.carebridge.carebridge_api.customer.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_customer_member")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMember extends BaseEntity {

    @Column(name = "parent_biodata_id")
    private Long parentBiodataId;

    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "customer_relation_id", insertable = false, updatable = false)
    @JsonManagedReference
    private CustomerRelation customerRelation;

}
