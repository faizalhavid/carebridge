import { RepositoryRestResource, SuccessResponse } from "@/interfaces/api/api-response";
import { useAuthStore } from "../../stores/auth_store";
import { get } from "../axios";
import { Menu } from "@/interfaces/models/menu";


export function getMenus(): Promise<RepositoryRestResource<Menu[]>> {
    return get('/admin/menus');
}
