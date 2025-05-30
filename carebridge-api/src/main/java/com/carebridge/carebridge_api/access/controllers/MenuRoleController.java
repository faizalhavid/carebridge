package com.carebridge.carebridge_api.access.controllers;

import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.carebridge.carebridge_api.access.dto.response.MenuRoleResponse;
import com.carebridge.carebridge_api.access.services.MenuRoleService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

@RestController
@RequestMapping("/api/${env.api.version}/menu/roles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MenuRoleController {
    @Autowired
    private MenuRoleService menuRoleService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_MENU_ROLE')")
    public ResponseEntity<PagedModel<EntityModel<MenuRoleResponse>>> getMenusByRoleId(Pageable pageable) {
        PagedModel<EntityModel<MenuRoleResponse>> pagedModel = PagedModel.of(
                menuRoleService.getMenusRole(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        menuRoleService.getMenusRole(pageable).getTotalElements(),
                        menuRoleService.getMenusRole(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{menuId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<MenuRoleResponse, Object>> getMenusByRoleIdAndMenuId(Long menuId) {
        return ResponseEntity.ok(
                new SuccessResponse<>(menuRoleService.getMenusRoleMenuId(menuId),
                        "Get menu by role and menu ID successful", 200));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<MenuRoleResponse, Object>> saveMenuRole(MenuRoleResponse menuRoleResponse) {
        return ResponseEntity.ok(new SuccessResponse<>(menuRoleService.saveMenuRole(menuRoleResponse),
                "Save menu role successful", 200));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> saveMenuRoles(
            List<MenuRoleResponse> menuRoleResponses) {
        menuRoleResponses.forEach(menuRoleService::saveMenuRole);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Save menu roles successful", 200));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteMenuRole(Long id) {
        menuRoleService.deleteMenuRole(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete menu role successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteMenuRoles(List<Long> ids) {
        menuRoleService.deleteMenuRoles(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete menu roles successful", 200));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> updateMenuRole(MenuRoleResponse menuRoleResponse) {
        menuRoleService.updateMenuRole(menuRoleResponse);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Update menu role successful", 200));
    }
}