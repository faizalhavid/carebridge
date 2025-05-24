package com.carebridge.carebridge_api.access.services;

import com.carebridge.carebridge_api.access.models.MenuRole;
import com.carebridge.carebridge_api.access.repositories.MenuRoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuRoleService {
    @Autowired
    private MenuRoleRepository menuRoleRepository;

    public List<MenuRole> getMenusByRoleId(String role) {
        System.out.println("Role :" + role);
        return menuRoleRepository.findByRole(role);
    }

    public MenuRole getMenusByRoleIdAndMenuId(String role, Long menuId) {
        return menuRoleRepository.findByRoleAndMenuId(role, menuId);
    }

    public MenuRole saveMenuRole(MenuRole menuRole) {
        return menuRoleRepository.save(menuRole);
    }

    public void deleteMenuRoleById(Long id) {
        menuRoleRepository.deleteById(id);
    }

    public void updateMenuRole(MenuRole menuRole) {
        menuRoleRepository.save(menuRole);
    }


}
