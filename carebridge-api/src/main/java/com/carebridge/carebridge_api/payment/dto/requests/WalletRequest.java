package com.carebridge.carebridge_api.payment.dto.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletRequest {
    @NotNull(message = "Customer ID cannot be null")
    private Long customerId;

    @Size(min = 6, max = 6, message = "PIN must be 6 digits")
    private String pin;

    @Min(value = 0, message = "Balance cannot be negative")
    private Double balance;

    private String barcode;

    @Min(value = 0, message = "Points cannot be negative")
    private Double points;

    private Integer pinAttempt;
    private Boolean isBlocked;
}