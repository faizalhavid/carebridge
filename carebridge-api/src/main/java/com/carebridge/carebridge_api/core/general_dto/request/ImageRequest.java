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
public class ImageRequest {
    @Schema(description = "File to upload", required = true)
    @NotNull(message = "File must not be null")
    @FileSize(
            maxSize = 1 * 1024 * 1024, // 1 MB
            message = "File size must not exceed 1 MB",
            allowedTypes = {"jpg", "jpeg"},
            disallowedTypes = {"exe", "bat", "png", "gif"}
    )
    private MultipartFile image;
}