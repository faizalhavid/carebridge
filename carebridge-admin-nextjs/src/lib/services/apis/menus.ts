import { RepositoryRestResource } from "@/types/api";
import { Menu } from "@/types/models/menu";
import { del, get, post, put } from "../axios";
import { MenuRequest } from "@/types/schemas/menu-schema";



export function getMenu(): Promise<RepositoryRestResource<Menu[]>> {
    return get('/admin/menus', {}, true);
}

export function getMenuById(id: string | number): Promise<Menu> {
    return get(`/admin/menus/${id}`, {}, true);
}

export function createMenu(req: MenuRequest): Promise<Menu> {
    return post('/admin/menus', req, {}, true);
}

export function updateMenu(id: number | string, req: MenuRequest): Promise<Menu> {
    return put(`/admin/menus/${id}`, req, {}, true);
}

export function deleteMenu(id: number | string): Promise<void> {
    return del(`/admin/menus/${id}`, {}, true);
}