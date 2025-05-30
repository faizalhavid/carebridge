package com.carebridge.carebridge_api.payment.dto.responses;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletDefaultNominalResponse {
    private Long id;
    private Double nominal;
}