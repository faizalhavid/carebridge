import { QueryParamsData } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from ".";
import { MenuRequest } from "@/types/schemas/menu-schema";
import { createMenu, getMenu } from "../apis/menus";




export const menuKey = {
    all: ['menus'] as const,
    detail: (id: string | number) => ['menu', id] as const,
}


export function useMenuQuery(queryParams?: QueryParamsData) {
    return useQuery({
        queryKey: menuKey.all,
        queryFn: getMenu,
        // select: (data),
        placeholderData: () => queryClient.getQueryData(menuKey.all),
        enabled: !queryParams?.search || queryParams.search.length > 0
    })
}


export function useMutationMenuQuery(menuId: string | number) {
    return useMutation({
        // When a mutation is initiated
        onMutate: async (newMenu: MenuRequest) => {
            await queryClient.cancelQueries({ queryKey: menuKey.detail(menuId) });
            const previousMenu = queryClient.getQueryData(menuKey.detail(menuId));
            // Optimistically update the cache with the new menu data
            queryClient.setQueryData(menuKey.detail(menuId), (old: any) => ({
                ...old,
                ...newMenu,
            }));
            return { previousMenu };
        },
        mutationFn: (newMenu: MenuRequest) => createMenu(newMenu),
        // On error, rollback to previous cache
        onError: (err, newMenu, context: any) => {
            if (context?.previousMenu) {
                queryClient.setQueryData(menuKey.detail(menuId), context.previousMenu);
            }
        },
        // After mutation, refetch the menu data
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: menuKey.detail(menuId) });
        }
    });
}