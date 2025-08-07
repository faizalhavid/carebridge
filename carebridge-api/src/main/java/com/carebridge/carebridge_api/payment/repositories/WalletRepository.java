package com.carebridge.carebridge_api.payment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carebridge.carebridge_api.payment.models.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
}
