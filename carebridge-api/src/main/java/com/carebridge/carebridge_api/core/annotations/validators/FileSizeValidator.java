package com.carebridge.carebridge_api.core.annotations.validators;

import com.carebridge.carebridge_api.core.annotations.FileSize;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class FileSizeValidator implements ConstraintValidator<FileSize, MultipartFile> {
    private long maxSize;
    private String message;
    private String[] allowedExtensions;
    private String[] disallowedExtensions;

    @Override
    public void initialize(FileSize constraintAnnotation) {
        this.maxSize = constraintAnnotation.maxSize();
        this.message = constraintAnnotation.message();
        this.allowedExtensions = constraintAnnotation.allowedTypes();
        this.disallowedExtensions = constraintAnnotation.disallowedTypes();

    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null) return true;

        String filename = file.getOriginalFilename();
        String extension = null;
        if (filename != null && filename.contains(".")) {
            extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        }

        if (file.getSize() > maxSize) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("File size exceeds the maximum allowed size of " + maxSize + " bytes.").addConstraintViolation();
            return false;
        }

        if (allowedExtensions != null && allowedExtensions.length > 0 && extension != null) {
            boolean allowed = false;
            for (String ext : allowedExtensions) {
                if (extension.equals(ext.toLowerCase())) {
                    allowed = true;
                    break;
                }
            }
            if (!allowed) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("File type '" + extension + "' is not allowed. Allowed types: " + String.join(", ", allowedExtensions)).addConstraintViolation();
                return false;
            }
        }

        if (disallowedExtensions != null && disallowedExtensions.length > 0 && extension != null) {
            for (String ext : disallowedExtensions) {
                if (extension.equals(ext.toLowerCase())) {
                    context.disableDefaultConstraintViolation();
                    context.buildConstraintViolationWithTemplate("File type '" + extension + "' is not allowed. Disallowed types: " + String.join(", ", disallowedExtensions)).addConstraintViolation();
                    return false;
                }
            }
        }

        return true;
    }
}