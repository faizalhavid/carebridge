package com.carebridge.carebridge_api.customer.dto.requests;

import java.time.LocalDate;
import java.util.List;

import com.carebridge.carebridge_api.user.dto.requests.BiodataRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {

    @Schema(description = "Customer ID - nullable for create, can be used for updates or references", nullable = true)
    private Long id;

    @Schema(description = "Biodata - can be ID only or full object for create", nullable = false)
    @NotNull(message = "Biodata is required")
    @Valid
    private BiodataRequest biodata;

    @Schema(description = "Date of birth", nullable = false, example = "1990-01-15")
    @NotNull(message = "Date of birth is required")
    private LocalDate dob;

    @Schema(description = "Gender", nullable = false, example = "M", allowableValues = { "M", "F" })
    @NotNull(message = "Gender is required")
    @Pattern(regexp = "^[MF]$", message = "Gender must be M (Male) or F (Female)")
    private String gender;

    @Schema(description = "Blood group - can be ID only or full object for create", nullable = true)
    @Valid
    private BloodGroupRequest bloodGroup;

    @Schema(description = "Rhesus type", nullable = true, example = "+", allowableValues = { "+", "-" })
    @Size(max = 5, message = "Rhesus type must be at most 5 characters")
    @Pattern(regexp = "^[+-]$", message = "Rhesus type must be + or -")
    private String rhesusType;

    @Schema(description = "Height in cm", nullable = true, example = "170.5")
    @DecimalMin(value = "0.0", inclusive = false, message = "Height must be greater than 0")
    @Max(value = 300, message = "Height must be less than 300 cm")
    private Float height;

    @Schema(description = "Weight in kg", nullable = true, example = "70.0")
    @DecimalMin(value = "0.0", inclusive = false, message = "Weight must be greater than 0")
    @Max(value = 500, message = "Weight must be less than 500 kg")
    private Float weight;

    @Schema(description = "Customer members - can be IDs only or full objects for create", nullable = true)
    @Valid
    private List<CustomerMemberRequest> customerMembers;

}
