package com.carebridge.carebridge_api.access.controllers;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.carebridge.carebridge_api.access.models.MenuRole;
import com.carebridge.carebridge_api.access.services.MenuRoleService;
import com.carebridge.carebridge_api.core.responses.SuccessResponse;

@RestController
@RequestMapping("/admin/menu-role")
@AllArgsConstructor
@CrossOrigin("*")
public class MenuRoleController {
    final private MenuRoleService menuRoleService;

    @GetMapping("/getMenusByRoleId")
    public SuccessResponse<List<MenuRole>, Object> getMenusByRoleId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null);
        System.out.println("Role :" + role);
        return new SuccessResponse<>(menuRoleService.getMenusByRoleId(role), "Menus retrieved successfully", 200);
    }

    @GetMapping("/getMenusByRoleIdAndMenuId")
    public SuccessResponse<MenuRole, Object> getMenusByRoleIdAndMenuId(Long menuId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null);
        return new SuccessResponse<>(menuRoleService.getMenusByRoleIdAndMenuId(role, menuId),
                "Menus retrieved successfully", 200);
    }

}
