package com.carebridge.carebridge_api.auth.dto.requests;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendEmailRequest {
    @Schema(description = "Email to send the email to", example = "nurhavid123@gmail.com")
    @Email(message = "Email should be valid")
    private String email;
}
