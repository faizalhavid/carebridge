package com.carebridge.carebridge_api.user.dto.requests;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BiodataRequest {

    @Schema(description = "Fullname", example = "John Doe", nullable = true)
    @Size(max = 255, message = "fullname cannot be longer than 255 character")
    private String fullName;

    @Schema(description = "Mobile phone", example = "081234567890", nullable = true)
    @Pattern(regexp = "^(?:\\+62|62|0)8[1-9][0-9]{6,9}$|^$", message = "Invalid phone number format")
    private String mobilePhone;

    @Schema(description = "Address", example = "123 Main St", nullable = true)
    private String address;
}