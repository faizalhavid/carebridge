import { useState, useCallback } from "react";
import { User } from "@/types/models/user";
import { DialogMode } from "@/components/Resources/dialog";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    CreateUserRequest,
    UpdateUserRequest
} from "@/lib/services/apis/user-management";
import { createApiStore } from "@/lib/stores/api_store";
import { RepositoryRestResource } from "@/types/api/repository";

export interface UserPageState {
    selectedUser: User | null;
    dialogMode: DialogMode;
    isAuthorizedToCreate: boolean;
    isAuthorizedToEdit: boolean;
    isAuthorizedToView: boolean;
    isAuthorizedToDelete: boolean;
}

/* 
TODO : REFACTORY THIS TO BE GENERIC AS CAN DO SOMETHING BASED ON ROLE : 1. getLocalUser 2. getRole 3. getAccessbility 4. returnAction
*/

export interface UserManagementHookResult {
    // Store state
    data: RepositoryRestResource<User[]> | null;
    loading: boolean;
    error: string | null;

    // Store actions
    fetchData: (force?: boolean) => Promise<void>;

    // Page state
    pageState: UserPageState;
    setPageState: React.Dispatch<React.SetStateAction<UserPageState>>;

    // User operations
    handleCreateUser: (userData: CreateUserRequest) => Promise<void>;
    handleUpdateUser: (userData: UpdateUserRequest) => Promise<void>;
    handleDeleteUser: (userId: string | number) => Promise<void>;

    // UI Actions
    openCreateDialog: () => void;
    openEditDialog: (user: User) => void;
    openViewDialog: (user: User) => void;
    openDeleteDialog: (user: User) => void;
    closeDialog: () => void;
}

const useUserStore = createApiStore<RepositoryRestResource<User[]>, CreateUserRequest>({
    fetchFn: () => getUsers(),
});

export function useUserManagement(
    isAuthorizedToCreate: boolean,
    isAuthorizedToEdit: boolean,
    isAuthorizedToView: boolean,
    isAuthorizedToDelete: boolean
): UserManagementHookResult {
    const { data, loading, error, fetchData } = useUserStore();

    const [pageState, setPageState] = useState<UserPageState>({
        selectedUser: null,
        dialogMode: "create",
        isAuthorizedToCreate,
        isAuthorizedToEdit,
        isAuthorizedToView,
        isAuthorizedToDelete,
    });

    const handleCreateUser = useCallback(async (userData: CreateUserRequest) => {
        try {
            await createUser(userData);
            await fetchData(true); // Refresh data
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }, [fetchData]);

    const handleUpdateUser = useCallback(async (userData: UpdateUserRequest) => {
        try {
            await updateUser(userData);
            await fetchData(true); // Refresh data
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }, [fetchData]);

    const handleDeleteUser = useCallback(async (userId: string | number) => {
        try {
            await deleteUser(userId);
            await fetchData(true); // Refresh data
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }, [fetchData]);

    const openCreateDialog = useCallback(() => {
        setPageState(prev => ({
            ...prev,
            selectedUser: null,
            dialogMode: "create",
        }));
    }, []);

    const openEditDialog = useCallback((user: User) => {
        setPageState(prev => ({
            ...prev,
            selectedUser: user,
            dialogMode: "edit",
        }));
    }, []);

    const openViewDialog = useCallback((user: User) => {
        setPageState(prev => ({
            ...prev,
            selectedUser: user,
            dialogMode: "view",
        }));
    }, []);

    const openDeleteDialog = useCallback((user: User) => {
        setPageState(prev => ({
            ...prev,
            selectedUser: user,
            dialogMode: "delete",
        }));
    }, []);

    const closeDialog = useCallback(() => {
        setPageState(prev => ({
            ...prev,
            selectedUser: null,
        }));
    }, []);

    return {
        data,
        loading,
        error,
        fetchData,
        pageState,
        setPageState,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        openCreateDialog,
        openEditDialog,
        openViewDialog,
        openDeleteDialog,
        closeDialog,
    };
}
