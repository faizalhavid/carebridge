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

import com.carebridge.carebridge_api.access.dto.requests.MenuRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuResponse;
import com.carebridge.carebridge_api.access.services.MenuService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/menus")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_MENU')")
    public ResponseEntity<PagedModel<EntityModel<MenuResponse>>> getAllMenus(Pageable pageable) {
        PagedModel<EntityModel<MenuResponse>> pagedModel = PagedModel.of(
                menuService.getAllMenus(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        menuService.getAllMenus(pageable).getTotalElements(),
                        menuService.getAllMenus(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR','ADMIN_CREDENTIALS', 'ADMIN_DATA_MASTER') or hasAnyAuthority('READ_MENU')")
    public ResponseEntity<SuccessResponse<MenuResponse, Object>> getMenuById(@PathVariable Long id) {
        return menuService.getMenuById(id)
                .map(menu -> ResponseEntity.ok(
                        new SuccessResponse<>(menu, "Get menu by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_MENU')")
    public ResponseEntity<SuccessResponse<MenuResponse, Object>> saveMenu(@RequestBody MenuRequest menuRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(menuService.saveMenu(menuRequest),
                "Save menu successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_MENU')")
    public ResponseEntity<SuccessResponse<List<MenuResponse>, Object>> saveMenus(
            @RequestBody List<MenuRequest> menuRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(menuService.saveMenus(menuRequests),
                "Save menus successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_MENU')")
    public ResponseEntity<SuccessResponse<MenuResponse, Object>> updateMenu(@PathVariable Long id,
            @RequestBody MenuRequest menuRequest) {
        return menuService.updateMenu(id, menuRequest)
                .map(menu -> ResponseEntity.ok(
                        new SuccessResponse<>(menu, "Update menu successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_MENU')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete menu successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_MENU')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteMenus(@RequestBody List<Long> ids) {
        menuService.deleteMenus(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete menus successful", 200));
    }

}
