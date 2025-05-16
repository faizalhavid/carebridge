import { RepositoryRestResource, SuccessResponse } from "@/interfaces/server-res";
import { useAuthStore } from "../stores/auth_store";
import { fetcher } from "../utils/fetcher";
import { Menu } from "@/interfaces/models/menu";


class DashboardService {

    public static async getMenus(): Promise<RepositoryRestResource<Menu[]>> {
        return fetcher('/admin/menus', {
            method: 'GET',
        }, true);
    }
}

export default DashboardService;