package com.carebridge.carebridge_api.payment.dto.responses;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletWithdrawResponse {
    private Long id;
    private Long customerId;
    private Long walletDefaultNominalId;
    private Double amount;
    private String bankName;
    private String accountNumber;
    private String accountName;
    private Integer otp;
}