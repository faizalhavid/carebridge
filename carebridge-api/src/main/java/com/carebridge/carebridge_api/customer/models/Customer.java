package com.carebridge.carebridge_api.customer.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "m_customer")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "biodata_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Biodata biodata;

    @Column(name = "biodata_id")
    private Long biodataId;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "gender")
    private String gender;

    @ManyToOne
    @JoinColumn(name = "blood_group_id", insertable = false, updatable = false)
    @JsonManagedReference
    public BloodGroup bloodGroup;

    @Column(name = "blood_group_id")
    private Long bloodGroupId;

    @Column(name = "rhesus_type", length = 5)
    private String rhesusType;

    @Column(name = "height")
    private Float height;

    @Column(name = "weight")
    private Float weight;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonBackReference
    List<CustomerMember> customerMember;

    // @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    // @JsonBackReference
    // List<CustomerChat> customerChat;

    // @OneToOne(mappedBy="customer" ,cascade=CascadeType.ALL)
    // @JsonBackReference
    // private CustomerWallet customerWallet;

    // @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    // @JsonBackReference
    // List<CustomerWalletWithdraw> customerWalletWithdraws;

    // @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    // @JsonBackReference
    // List<CustomerCustomNominal> customerCustomNominals;
}
