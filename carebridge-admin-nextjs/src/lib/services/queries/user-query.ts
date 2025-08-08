import { QueryParamsData } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../apis/users";
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




export function useMutationUserQuery() {
    return useMutation({
        mutationFn: (newUser: UserRequest) => createUser(newUser),

        // When a mutation is initiated
        onMutate: async (newUser: UserRequest) => {
            // For CREATE operations, we work with the 'all' users list
            // For UPDATE operations, we would work with specific user detail

            // Cancel any outgoing refetches for users list
            await queryClient.cancelQueries({ queryKey: userKey.all });

            // Snapshot the previous users list
            const previousUsers = queryClient.getQueryData(userKey.all);

            // Optimistically add the new user to the list
            // Note: We don't have an ID yet, so we can use a temporary one
            queryClient.setQueryData(userKey.all, (old: any) => {
                if (!old) return old;

                // Add new user with temporary ID (will be replaced after success)
                const tempUser = {
                    ...newUser,
                    id: `temp-${Date.now()}`, // Temporary ID
                    createdAt: new Date().toISOString(),
                };

                return {
                    ...old,
                    data: [...(old.data || []), tempUser]
                };
            });

            return { previousUsers };
        },

        // On success, update cache with real data from server
        onSuccess: (data, newUser, context) => {
            // Remove the temporary user and add the real one with server-generated ID
            queryClient.setQueryData(userKey.all, (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map((user: any) =>
                        user.id.toString().startsWith('temp-') ? data.data : user
                    )
                };
            });

            // Cache the individual user data
            if (data.data?.id) {
                queryClient.setQueryData(userKey.detail(data.data.id), data.data);
            }
        },

        // On error, rollback to previous cache
        onError: (err, newUser, context: any) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(userKey.all, context.previousUsers);
            }
        },

        // After mutation (success or error), refetch to ensure consistency
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: userKey.all });
        }
    });
}
// ...existing code...

export function useUpdateUserMutation() {
    return useMutation({
        mutationFn: ({ id, userData }: { id: string | number; userData: Partial<UserRequest> }) =>
            updateUser(id, userData), // You'll need to create this API function

        // Optimistic update
        onMutate: async ({ id, userData }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: userKey.all });
            await queryClient.cancelQueries({ queryKey: userKey.detail(id) });

            // Snapshot previous values
            const previousUsers = queryClient.getQueryData(userKey.all);
            const previousUser = queryClient.getQueryData(userKey.detail(id));

            // Optimistically update the user in the list
            queryClient.setQueryData(userKey.all, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: old.data.map((user: any) =>
                        user.id === id ? { ...user, ...userData } : user
                    )
                };
            });

            // Optimistically update individual user cache
            queryClient.setQueryData(userKey.detail(id), (old: any) => {
                if (!old) return old;
                return { ...old, ...userData };
            });

            return { previousUsers, previousUser, id };
        },

        // On success, update with server data
        onSuccess: (data, { id }) => {
            // Update both list and detail caches with real server data
            queryClient.setQueryData(userKey.all, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: old.data.map((user: any) =>
                        user.id === id ? data.data : user
                    )
                };
            });

            queryClient.setQueryData(userKey.detail(id), data.data);
        },

        // On error, rollback
        onError: (err, { id }, context: any) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(userKey.all, context.previousUsers);
            }
            if (context?.previousUser) {
                queryClient.setQueryData(userKey.detail(id), context.previousUser);
            }
        },

        // Invalidate queries to ensure consistency
        onSettled: (data, error, { id }) => {
            queryClient.invalidateQueries({ queryKey: userKey.all });
            queryClient.invalidateQueries({ queryKey: userKey.detail(id) });
        }
    });
}

export function useDeleteUserMutation() {
    return useMutation({
        mutationFn: (id: string | number) => deleteUser(id), // You'll need to create this API function

        // Optimistic delete
        onMutate: async (id) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: userKey.all });
            await queryClient.cancelQueries({ queryKey: userKey.detail(id) });

            // Snapshot previous values
            const previousUsers = queryClient.getQueryData(userKey.all);
            const previousUser = queryClient.getQueryData(userKey.detail(id));

            // Optimistically remove user from list
            queryClient.setQueryData(userKey.all, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: old.data.filter((user: any) => user.id !== id)
                };
            });

            // Remove individual user cache
            queryClient.removeQueries({ queryKey: userKey.detail(id) });

            return { previousUsers, previousUser, id };
        },

        // On success, no additional cache updates needed for delete
        onSuccess: (data, id) => {
            // Optionally handle success response
            console.log(`User ${id} deleted successfully`);
        },

        // On error, rollback
        onError: (err, id, context: any) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(userKey.all, context.previousUsers);
            }
            if (context?.previousUser) {
                queryClient.setQueryData(userKey.detail(id), context.previousUser);
            }
        },

        // Invalidate queries to ensure consistency
        onSettled: (data, error, id) => {
            queryClient.invalidateQueries({ queryKey: userKey.all });
        }
    });
}