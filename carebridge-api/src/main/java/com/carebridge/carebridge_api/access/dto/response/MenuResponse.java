package com.carebridge.carebridge_api.access.dto.response;

import java.util.List;

import com.carebridge.carebridge_api.access.models.Menu;

import lombok.Data;

@Data
public class MenuResponse {
    private Long id;
    private String name;
    private String url;
    private Menu parent;
    private List<Menu> children;
    private String bigIcon;
    private String smallIcon;
}