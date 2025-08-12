package com.carebridge.carebridge_api.access.controllers;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carebridge.carebridge_api.access.dto.requests.MenuRoleRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuRoleResponse;
import com.carebridge.carebridge_api.access.services.MenuRoleService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/menu/roles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class MenuRoleController {

    private final MenuRoleService menuRoleService;

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
    public ResponseEntity<SuccessResponse<MenuRoleResponse, Object>> getMenusByRoleIdAndMenuId(
            @PathVariable Long menuId) {
        return menuRoleService.getMenusRoleMenuId(menuId)
                .map(menuRole -> ResponseEntity.ok(
                        new SuccessResponse<>(menuRole, "Get menu by role and menu ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<MenuRoleResponse, Object>> saveMenuRole(
            @RequestBody MenuRoleRequest menuRoleRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(menuRoleService.saveMenuRole(menuRoleRequest),
                "Save menu role successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<List<MenuRoleResponse>, Object>> saveMenuRoles(
            @RequestBody List<MenuRoleRequest> menuRoleRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(menuRoleService.saveMenuRoles(menuRoleRequests),
                "Save menu roles successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<MenuRoleResponse, Object>> updateMenuRole(@PathVariable Long id,
            @RequestBody MenuRoleRequest menuRoleRequest) {
        return menuRoleService.updateMenuRole(id, menuRoleRequest)
                .map(menuRole -> ResponseEntity.ok(
                        new SuccessResponse<>(menuRole, "Update menu role successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteMenuRole(@PathVariable Long id) {
        menuRoleService.deleteMenuRole(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete menu role successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_MENU_ROLE')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteMenuRoles(@RequestBody List<Long> ids) {
        menuRoleService.deleteMenuRoles(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete menu roles successful", 200));
    }

}