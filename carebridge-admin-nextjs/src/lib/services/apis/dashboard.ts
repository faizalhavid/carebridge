import { RepositoryRestResource } from "@/types/api";
import { useAuthStore } from "../../stores/auth_store";
import { get } from "../axios";
import { Menu } from "@/types/models/menu";


export function getMenus(): Promise<RepositoryRestResource<Menu[]>> {
    return get('/admin/menus');
}
