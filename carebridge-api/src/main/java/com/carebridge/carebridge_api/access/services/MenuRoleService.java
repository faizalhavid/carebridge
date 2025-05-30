package com.carebridge.carebridge_api.access.services;

import com.carebridge.carebridge_api.access.dto.response.MenuResponse;
import com.carebridge.carebridge_api.access.dto.response.MenuRoleResponse;
import com.carebridge.carebridge_api.access.models.MenuRole;
import com.carebridge.carebridge_api.access.repositories.MenuRoleRepository;
import java.util.Collection;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuRoleService {
    @Autowired
    private MenuRoleRepository menuRoleRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<MenuRoleResponse> getMenusRole(Pageable pageable) {
        List<String> roles = getRolesFromAuthorities();
        return menuRoleRepository.findByRoles(roles, pageable)
                .map(menuRole -> {
                    MenuRoleResponse response = new MenuRoleResponse();
                    response.setMenu(modelMapper.map(menuRole.getMenu(), MenuResponse.class));
                    response.setRoleCode(menuRole.getRole().getCode());
                    return response;
                });
    }

    public MenuRoleResponse getMenusRoleMenuId(Long menuId) {
        List<String> roles = getRolesFromAuthorities();
        MenuRole menuRole = menuRoleRepository.findByRoleAndMenuId(roles, menuId);
        if (menuRole == null) {
            return null;
        }
        MenuRoleResponse response = new MenuRoleResponse();
        response.setMenu(modelMapper.map(menuRole.getMenu(), MenuResponse.class));
        response.setRoleCode(menuRole.getRole().getCode());
        return response;
    }

    public MenuRoleResponse saveMenuRole(MenuRoleResponse menuRoleResponse) {
        MenuRole menuRole = modelMapper.map(menuRoleResponse, MenuRole.class);
        menuRole = menuRoleRepository.save(menuRole);
        return modelMapper.map(menuRole.getMenu(), MenuRoleResponse.class);
    }

    public List<MenuRoleResponse> saveMenuRoles(List<MenuRoleResponse> menuRoleResponses) {
        List<MenuRole> menuRoles = menuRoleResponses.stream()
                .map(menuRoleResponse -> modelMapper.map(menuRoleResponse, MenuRole.class))
                .collect(Collectors.toList());
        List<MenuRole> savedMenuRoles = menuRoleRepository.saveAll(menuRoles);
        return savedMenuRoles.stream()
                .map(menuRole -> {
                    MenuRoleResponse response = new MenuRoleResponse();
                    response.setMenu(modelMapper.map(menuRole.getMenu(), MenuResponse.class));
                    response.setRoleCode(menuRole.getRole().getCode());
                    return response;
                })
                .collect(Collectors.toList());
    }

    public void deleteMenuRole(Long id) {
        // Todo: Implement to update base entity
        menuRoleRepository.safeDelete(id);
    }

    public void deleteMenuRoles(List<Long> ids) {
        // Todo: Implement to update base entity
        menuRoleRepository.safeDeleteAll(ids);
    }

    public Page<MenuRoleResponse> getAllMenuRoles(Pageable pageable) {
        return menuRoleRepository.findAll(pageable)
                .map(menuRole -> {
                    MenuRoleResponse response = new MenuRoleResponse();
                    response.setMenu(modelMapper.map(menuRole.getMenu(), MenuResponse.class));
                    response.setRoleCode(menuRole.getRole().getCode());
                    return response;
                });
    }

    public void updateMenuRole(MenuRoleResponse menuRoleResponse) {
        MenuRole menuRole = modelMapper.map(menuRoleResponse, MenuRole.class);
        menuRoleRepository.save(menuRole);
    }

    private List<String> getRolesFromAuthorities() {
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities();
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

}
