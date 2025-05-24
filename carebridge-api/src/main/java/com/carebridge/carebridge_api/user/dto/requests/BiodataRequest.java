package com.carebridge.carebridge_api.user.dto.requests;

import com.carebridge.carebridge_api.user.models.Biodata;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BiodataRequest {

    @Schema(description = "Fullname", example = "John Doe")
    @NotBlank(message = "fullname cannot be blank")
    @Size(max = 255, message = "fullname cannot be longer than 255 character")
    private String fullname;

    @Schema(description = "Mobile phone", example = "081234567890")
    @Pattern(regexp = "^(?:\\+62|62|0)8[1-9][0-9]{6,9}$|^$", message = "Invalid phone number format")
    private String mobilePhone;

}
