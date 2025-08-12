package com.carebridge.carebridge_api.access.services;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.access.dto.requests.MenuRoleRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuRoleResponse;
import com.carebridge.carebridge_api.access.mappers.MenuRoleMapper;
import com.carebridge.carebridge_api.access.models.MenuRole;
import com.carebridge.carebridge_api.access.repositories.MenuRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuRoleService {

    private final MenuRoleRepository menuRoleRepository;
    private final MenuRoleMapper menuRoleMapper;

    public Page<MenuRoleResponse> getMenusRole(Pageable pageable) {
        List<String> roles = getRolesFromAuthorities();
        return menuRoleRepository.findByRoles(roles, pageable)
                .map(menuRoleMapper::toResponse);
    }

    public Optional<MenuRoleResponse> getMenusRoleMenuId(Long menuId) {
        List<String> roles = getRolesFromAuthorities();
        MenuRole menuRole = menuRoleRepository.findByRoleAndMenuId(roles, menuId);
        if (menuRole == null) {
            return Optional.empty();
        }
        return Optional.of(menuRoleMapper.toResponse(menuRole));
    }

    public MenuRoleResponse saveMenuRole(MenuRoleRequest menuRoleRequest) {
        MenuRole menuRole = menuRoleMapper.toEntity(menuRoleRequest);
        menuRole = menuRoleRepository.save(menuRole);
        return menuRoleMapper.toResponse(menuRole);
    }

    public List<MenuRoleResponse> saveMenuRoles(List<MenuRoleRequest> menuRoleRequests) {
        List<MenuRole> menuRoles = menuRoleRequests.stream()
                .map(menuRoleMapper::toEntity)
                .collect(Collectors.toList());
        List<MenuRole> savedMenuRoles = menuRoleRepository.saveAll(menuRoles);
        return savedMenuRoles.stream()
                .map(menuRoleMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<MenuRoleResponse> updateMenuRole(Long id, MenuRoleRequest menuRoleRequest) {
        return menuRoleRepository.findById(id)
                .map(existingMenuRole -> {
                    menuRoleMapper.patch(menuRoleRequest, existingMenuRole);
                    MenuRole updatedMenuRole = menuRoleRepository.save(existingMenuRole);
                    return menuRoleMapper.toResponse(updatedMenuRole);
                });
    }

    public void deleteMenuRole(Long id) {
        // Todo: Implement to update base entity
        menuRoleRepository.deleteById(id);
    }

    public void deleteMenuRoles(List<Long> ids) {
        // Todo: Implement to update base entity
        menuRoleRepository.deleteAllById(ids);
    }

    public Page<MenuRoleResponse> getAllMenuRoles(Pageable pageable) {
        return menuRoleRepository.findAll(pageable)
                .map(menuRoleMapper::toResponse);
    }

    private List<String> getRolesFromAuthorities() {
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities();
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

}
