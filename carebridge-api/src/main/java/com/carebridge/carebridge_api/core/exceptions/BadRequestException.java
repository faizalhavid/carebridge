package com.carebridge.carebridge_api.core.exceptions;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BadRequestException extends org.apache.coyote.BadRequestException {
    private final String field;

    public BadRequestException(String field, String message) {
        super(message);
        this.field = field;
    }
}