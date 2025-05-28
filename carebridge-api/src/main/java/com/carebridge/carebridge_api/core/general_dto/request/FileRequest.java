package com.carebridge.carebridge_api.core.general_dto.request;

import com.carebridge.carebridge_api.core.annotations.FileSize;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileRequest {
    @Schema(description = "File to upload", required = true)
    @NotNull(message = "File must not be null")
    @FileSize(
            maxSize = 5 * 1024 * 1024, // 5 MB
            message = "File size must not exceed 5 MB",
            allowedTypes = {"jpg", "jpeg", "png", "pdf"},
            disallowedTypes = {"exe", "bat"}
    )
    private MultipartFile file;
}