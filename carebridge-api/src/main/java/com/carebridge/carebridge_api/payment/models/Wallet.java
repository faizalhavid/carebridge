package com.carebridge.carebridge_api.payment.models;

import java.time.LocalDate;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "t_wallet")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Wallet extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Customer customer;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "pin", length = 6)
    private String pin;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "barcode", length = 50)
    private String barcode;

    @Column(name = "points")
    private Double points;

    @Column(name = "pin_attempt")
    private Integer pinAttempt;

    @Column(name = "block_ends")
    private LocalDate blockEnds;

    @Column(name = "is_blocked")
    private Boolean isBlocked;
}
