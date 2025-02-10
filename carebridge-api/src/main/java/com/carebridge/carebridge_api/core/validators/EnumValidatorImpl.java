package com.carebridge.carebridge_api.core.validators;

        import com.carebridge.carebridge_api.core.annotations.EnumValidator;
        import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
        import jakarta.validation.ConstraintValidator;
        import jakarta.validation.ConstraintValidatorContext;

        import java.util.Arrays;
        import java.util.Set;
        import java.util.stream.Collectors;

        public class EnumValidatorImpl implements ConstraintValidator<EnumValidator, TokenUsedFor> {
            private Set<String> allowedValues;

            @Override
            public void initialize(EnumValidator constraintAnnotation) {
                this.allowedValues = Arrays.stream(constraintAnnotation.enumClass().getEnumConstants())
                        .map(Enum::name)
                        .collect(Collectors.toSet());

                if (constraintAnnotation.acceptedValues().length > 0) {
                    this.allowedValues = Arrays.stream(constraintAnnotation.acceptedValues())
                            .collect(Collectors.toSet());
                }
            }

            @Override
            public boolean isValid(TokenUsedFor value, ConstraintValidatorContext context) {
                if (value == null) {
                    return false;
                }

                return allowedValues.contains(value.name());
            }
        }