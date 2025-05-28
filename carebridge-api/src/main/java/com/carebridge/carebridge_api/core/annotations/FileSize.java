package com.carebridge.carebridge_api.core.annotations;


import com.carebridge.carebridge_api.core.annotations.validators.FileSizeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FileSizeValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface FileSize {
    String message() default "File size exceeds the maximum limit";

    Class<?>[] groups() default {};

    Class<? extends jakarta.validation.Payload>[] payload() default {};

    long maxSize() default 10485760; // Default to 10 MB

    String[] allowedTypes() default {"image/jpeg", "image/png", "application/pdf"};

    String[] disallowedTypes() default {"application/x-msdownload", "application/x-shockwave-flash"};

    Class<? extends Payload>[] view() default {};
}
