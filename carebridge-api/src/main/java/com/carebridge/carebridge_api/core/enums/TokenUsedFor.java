package com.carebridge.carebridge_api.core.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TokenUsedFor {
    AUTHENTICATION("authentication"),
    FORGOT_PASSWORD("forgot_password"),
    CHANGE_EMAIL("change_email"),
    CHANGE_PASSWORD("change_password"),
    REGISTRATION("registration"),
    REFRESH_TOKEN("refresh_token");

    private final String value;

    TokenUsedFor(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static TokenUsedFor fromString(String value) {
        for (TokenUsedFor tokenUsedFor : TokenUsedFor.values()) {
            if (tokenUsedFor.name().equalsIgnoreCase(value)) {
                return tokenUsedFor;
            }
        }
        throw new IllegalArgumentException("Invalid value for TokenUsedFor: " + value);
    }


}
