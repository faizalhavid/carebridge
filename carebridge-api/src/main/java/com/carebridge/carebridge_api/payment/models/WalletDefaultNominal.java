package com.carebridge.carebridge_api.payment.models;

import java.util.List;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "m_wallet_default_nominal")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class WalletDefaultNominal extends BaseEntity {
    @Column(name = "nominal")
    private Double nominal;

    @OneToMany(mappedBy = "walletDefaultNominal", cascade = CascadeType.ALL)
    @JsonBackReference
    List<WalletWithdraw> customerWalletWithdraws;
}
