package com.carebridge.carebridge_api.core.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TokenUsedFor {
    AUTHENTICATION,
    FORGOT_PASSWORD,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    REGISTRATION,

    // TODO : REDIS - delete this
    REFRESH_TOKEN;

    @JsonCreator
    public static TokenUsedFor fromValue(String value) {
        for (TokenUsedFor tokenUsedFor : TokenUsedFor.values()) {
            if (tokenUsedFor.name().equalsIgnoreCase(value)) {
                return tokenUsedFor;
            }
        }
        throw new IllegalArgumentException("Invalid value for TokenUsedFor: " + value);
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}