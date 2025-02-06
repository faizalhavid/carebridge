package com.carebridge.carebridge_api.core.responses;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Pagination<T> {
    private Integer page;
    private Integer limit;
    private Integer total;
    private T data;

}
