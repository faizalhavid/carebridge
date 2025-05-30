package com.carebridge.carebridge_api.payment.dto.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletDefaultNominalRequest {
    @NotNull(message = "Nominal cannot be null")
    @Min(value = 1, message = "Nominal must be greater than 0")
    private Double nominal;
}