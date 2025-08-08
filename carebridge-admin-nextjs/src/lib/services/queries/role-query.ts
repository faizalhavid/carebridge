import { QueryParamsData } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from ".";
import { RoleRequest } from "@/types/schemas/role-schema";
import { createRole, getRoles } from "../apis/roles";




export const roleKey = {
    all: ['roles'] as const,
    detail: (id: string | number) => ['role', id] as const,
}


export function useRoleQuery(queryParams?: QueryParamsData) {
    return useQuery({
        queryKey: roleKey.all,
        queryFn: getRoles,
        // select: (data),
        placeholderData: () => queryClient.getQueryData(roleKey.all),
        enabled: !queryParams?.search || queryParams.search.length > 0
    })
}


export function useMutationRoleQuery(roleId: string | number) {
    return useMutation({
        // When a mutation is initiated
        onMutate: async (newRole: RoleRequest) => {
            await queryClient.cancelQueries({ queryKey: roleKey.detail(roleId) });
            const previousRole = queryClient.getQueryData(roleKey.detail(roleId));
            // Optimistically update the cache with the new role data
            queryClient.setQueryData(roleKey.detail(roleId), (old: any) => ({
                ...old,
                ...newRole,
            }));
            return { previousRole };
        },
        mutationFn: (newRole: RoleRequest) => createRole(newRole),
        // On error, rollback to previous cache
        onError: (err, newRole, context: any) => {
            if (context?.previousRole) {
                queryClient.setQueryData(roleKey.detail(roleId), context.previousRole);
            }
        },
        // After mutation, refetch the role data
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: roleKey.detail(roleId) });
        }
    });
}