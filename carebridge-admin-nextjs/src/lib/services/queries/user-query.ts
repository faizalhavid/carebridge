import { QueryParamsData } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "../apis/users";
import { queryClient } from ".";
import { UserRequest } from "@/types/schemas/user-schema";



export const userKey = {
    all: ['users'] as const,
    detail: (id: string | number) => ['user', id] as const,
}


export function useUserQuery(queryParams?: QueryParamsData) {
    return useQuery({
        queryKey: userKey.all,
        queryFn: getUsers,
        // select: (data),
        placeholderData: () => queryClient.getQueryData(userKey.all),
        enabled: !queryParams?.search || queryParams.search.length > 0
    })
}


export function useMutationUserQuery(userId: string | number) {
    return useMutation({
        // When a mutation is initiated
        onMutate: async (newUser: UserRequest) => {
            await queryClient.cancelQueries({ queryKey: userKey.detail(userId) });
            const previousUser = queryClient.getQueryData(userKey.detail(userId));
            // Optimistically update the cache with the new user data
            queryClient.setQueryData(userKey.detail(userId), (old: any) => ({
                ...old,
                ...newUser,
            }));
            return { previousUser };
        },
        mutationFn: (newUser: UserRequest) => createUser(newUser),
        // On error, rollback to previous cache
        onError: (err, newUser, context: any) => {
            if (context?.previousUser) {
                queryClient.setQueryData(userKey.detail(userId), context.previousUser);
            }
        },
        // After mutation, refetch the user data
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: userKey.detail(userId) });
        }
    });
}