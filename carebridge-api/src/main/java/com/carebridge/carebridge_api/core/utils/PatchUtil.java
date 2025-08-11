package com.carebridge.carebridge_api.core.utils;

import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Arrays;

@Component
public class PatchUtil {

    /**
     * Apply partial updates from source to target, only updating non-null fields
     * 
     * @param source        The object containing the updates
     * @param target        The object to be updated
     * @param excludeFields Fields to exclude from patching
     */
    public static void applyPatch(Object source, Object target, String... excludeFields) {
        if (source == null || target == null) {
            return;
        }

        Class<?> sourceClass = source.getClass();
        Class<?> targetClass = target.getClass();

        Field[] sourceFields = sourceClass.getDeclaredFields();

        for (Field sourceField : sourceFields) {
            // Skip excluded fields
            if (Arrays.asList(excludeFields).contains(sourceField.getName())) {
                continue;
            }

            try {
                sourceField.setAccessible(true);
                Object value = sourceField.get(source);

                // Only update if value is not null
                if (value != null) {
                    // Skip empty strings
                    if (value instanceof String && ((String) value).trim().isEmpty()) {
                        continue;
                    }

                    // Find corresponding field in target
                    Field targetField = findField(targetClass, sourceField.getName());
                    if (targetField != null) {
                        targetField.setAccessible(true);
                        targetField.set(target, value);
                    }
                }
            } catch (IllegalAccessException e) {
                // Log error or handle as needed
                System.err.println("Failed to patch field: " + sourceField.getName());
            }
        }
    }

    /**
     * Check if a field should be updated (non-null and non-empty for strings)
     */
    public static boolean shouldUpdate(Object value) {
        if (value == null)
            return false;
        if (value instanceof String) {
            return !((String) value).trim().isEmpty();
        }
        return true;
    }

    private static Field findField(Class<?> clazz, String fieldName) {
        try {
            return clazz.getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            // Try parent classes
            Class<?> superClass = clazz.getSuperclass();
            if (superClass != null) {
                return findField(superClass, fieldName);
            }
            return null;
        }
    }
}
