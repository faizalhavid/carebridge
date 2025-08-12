package com.carebridge.carebridge_api.access.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.access.dto.requests.MenuRequest;
import com.carebridge.carebridge_api.access.dto.responses.MenuResponse;
import com.carebridge.carebridge_api.access.mappers.MenuMapper;
import com.carebridge.carebridge_api.access.models.Menu;
import com.carebridge.carebridge_api.access.repositories.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;
    private final MenuMapper menuMapper;

    public Page<MenuResponse> getAllMenus(Pageable pageable) {
        return menuRepository.findAll(pageable)
                .map(menuMapper::toResponse);
    }

    public Optional<MenuResponse> getMenuById(Long id) {
        return menuRepository.findById(id)
                .map(menuMapper::toResponse);
    }

    public MenuResponse saveMenu(MenuRequest menuRequest) {
        Menu menu = menuMapper.toEntity(menuRequest);
        menu = menuRepository.save(menu);
        return menuMapper.toResponse(menu);
    }

    public List<MenuResponse> saveMenus(List<MenuRequest> menuRequests) {
        List<Menu> menus = menuRequests.stream()
                .map(menuMapper::toEntity)
                .collect(Collectors.toList());
        List<Menu> savedMenus = menuRepository.saveAll(menus);
        return savedMenus.stream()
                .map(menuMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<MenuResponse> updateMenu(Long id, MenuRequest menuRequest) {
        return menuRepository.findById(id)
                .map(existingMenu -> {
                    menuMapper.patch(menuRequest, existingMenu);
                    Menu updatedMenu = menuRepository.save(existingMenu);
                    return menuMapper.toResponse(updatedMenu);
                });
    }

    public void deleteMenu(Long id) {
        // Todo: Implement to update base entity (soft delete)
        menuRepository.deleteById(id);
    }

    public void deleteMenus(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        menuRepository.deleteAllById(ids);
    }

}
