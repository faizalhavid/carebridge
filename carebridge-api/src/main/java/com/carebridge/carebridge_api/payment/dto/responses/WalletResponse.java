package com.carebridge.carebridge_api.payment.dto.responses;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletResponse {
    private Long id;
    private Long customerId;
    private String pin;
    private Double balance;
    private String barcode;
    private Double points;
    private Integer pinAttempt;
    private Boolean isBlocked;
}