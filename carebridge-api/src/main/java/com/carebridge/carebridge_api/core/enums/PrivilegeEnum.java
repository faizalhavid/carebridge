package com.carebridge.carebridge_api.core.enums;

public enum PrivilegeEnum {
    USER_CREATE("user:create"),
    USER_READ("user:read"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete");

    private final String value;

    PrivilegeEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
