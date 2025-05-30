package com.carebridge.carebridge_api.payment.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.customer.models.Customer;
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
@Data
@Table(name = "t_wallet_withdraw")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class WalletWithdraw extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Customer customer;

    @Column(name = "customer_id")
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "wallet_default_nominal_id", insertable = false, updatable = false)
    @JsonManagedReference
    private WalletDefaultNominal walletDefaultNominal;

    @Column(name = "wallet_default_nominal_id")
    private Long walletDefaultNominalId;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "bank_name", length = 50)
    private String bankName;

    @Column(name = "account_number", length = 50)
    private String accountNumber;

    @Column(name = "account_name", length = 255)
    private String accountName;

    @Column(name = "otp")
    private int otp;
}
