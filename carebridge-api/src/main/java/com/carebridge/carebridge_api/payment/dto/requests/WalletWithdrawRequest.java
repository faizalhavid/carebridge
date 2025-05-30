package com.carebridge.carebridge_api.payment.dto.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletWithdrawRequest {
    @NotNull(message = "Customer ID cannot be null")
    private Long customerId;

    @NotNull(message = "Wallet Default Nominal ID cannot be null")
    private Long walletDefaultNominalId;

    @NotNull(message = "Amount cannot be null")
    @Min(value = 1, message = "Amount must be greater than 0")
    private Double amount;

    @NotNull(message = "Bank name cannot be null")
    @Size(min = 2, max = 50, message = "Bank name must be between 2 and 50 characters")
    private String bankName;

    @NotNull(message = "Account number cannot be null")
    @Size(min = 5, max = 50, message = "Account number must be between 5 and 50 characters")
    private String accountNumber;

    @NotNull(message = "Account name cannot be null")
    @Size(min = 2, max = 255, message = "Account name must be between 2 and 255 characters")
    private String accountName;

    private Integer otp;
}