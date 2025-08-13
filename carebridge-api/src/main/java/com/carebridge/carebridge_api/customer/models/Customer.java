package com.carebridge.carebridge_api.customer.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.core.annotations.validators.Views;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Data
@Table(name = "m_customer")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends BaseEntity {

    public Customer(Long id) {
        super(id);
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "biodata_id", referencedColumnName = "id")
    @JsonView(Views.Internal.class)
    @JsonBackReference
    private Biodata biodata;

    @Column(name = "dob")
    @JsonView(Views.Public.class)
    private LocalDate dob;

    @Column(name = "gender")
    @JsonView(Views.Public.class)
    private String gender;

    @ManyToOne
    @JoinColumn(name = "blood_group_id", insertable = false, updatable = false)
    @JsonManagedReference
    @JsonView(Views.Public.class)
    public BloodGroup bloodGroup;

    @Column(name = "rhesus_type", length = 5)
    @JsonView(Views.Public.class)
    private String rhesusType;

    @Column(name = "height")
    @JsonView(Views.Public.class)
    private Float height;

    @Column(name = "weight")
    @JsonView(Views.Public.class)
    private Float weight;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonBackReference
    @JsonView(Views.Public.class)
    List<CustomerMember> customerMember;

    // @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    // @JsonBackReference
    // @JsonView(Views.Public.class)
    // List<CustomerChat> customerChat;

    // @OneToOne(mappedBy="customer" ,cascade=CascadeType.ALL)
    // @JsonBackReference
    // @JsonView(Views.Public.class)
    // private CustomerWallet customerWallet;

    // @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    // @JsonBackReference
    // @JsonView(Views.Public.class)
    // List<CustomerWalletWithdraw> customerWalletWithdraws;

    // @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    // @JsonBackReference
    // @JsonView(Views.Public.class)
    // List<CustomerCustomNominal> customerCustomNominals;
}
