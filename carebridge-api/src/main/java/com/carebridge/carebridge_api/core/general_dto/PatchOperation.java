package com.carebridge.carebridge_api.core.general_dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatchOperation {

    public enum Operation {
        REPLACE, ADD, REMOVE, COPY, MOVE, TEST
    }

    private Operation op;
    private String path;
    private Object value;
    private String from;
}
