"use client";
import React, { useEffect } from "react";
import { User } from "@/types/models/user";
import ResourceView from "@/components/Resources";
import { Chip } from "@mui/material";
import { DialogMode } from "@/components/Resources/dialog";
import { useAuthStore } from "@/lib/stores/auth_store";
import { useUserManagement } from "@/hooks/use-user-management";
import { UserForm, UserFormData } from "./_components/user-form";

const ROLE_PRIVILEGES: { [key: string]: string[] } = {
    SUPER_ADMIN: ["create", "edit", "view", "delete", "manage_password"],
    ADMIN: ["create", "edit", "view"],
    MANAGER: ["view"],
};

export default function UserManagementPage() {
    const { user: authenticatedUser } = useAuthStore();

    // Get user privileges based on role
    const role = authenticatedUser?.roles.find((r) => r.name.startsWith("ROLE_"))?.name || "ROLE_USER";
    const privileges = ROLE_PRIVILEGES[role] || [];

    const {
        data,
        loading,
        error,
        fetchData,
        pageState,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        openCreateDialog,
        openEditDialog,
        openViewDialog,
        openDeleteDialog,
        closeDialog,
    } = useUserManagement(
        privileges.includes("create"),
        privileges.includes("edit"),
        privileges.includes("view"),
        privileges.includes("delete")
    );

    const handleSubmitUserForm = async (formData: UserFormData) => {
        try {
            if (pageState.dialogMode === "create") {
                await handleCreateUser({
                    email: formData.email,
                    fullName: formData.fullName,
                    address: formData.address,
                    password: formData.password,
                });
            } else if (pageState.dialogMode === "edit" && pageState.selectedUser) {
                await handleUpdateUser({
                    id: pageState.selectedUser.id,
                    email: formData.email,
                    fullName: formData.fullName,
                    address: formData.address,
                    ...(formData.password && { password: formData.password }),
                });
            } else if (pageState.dialogMode === "delete" && pageState.selectedUser) {
                await handleDeleteUser(pageState.selectedUser.id);
            }

            closeDialog();
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        // Handle page change logic here
        console.log("Page changed to:", value);
    };

    const handleActionClick = (mode: DialogMode, user: User) => {
        switch (mode) {
            case "view":
                openViewDialog(user);
                break;
            case "edit":
                openEditDialog(user);
                break;
            case "delete":
                openDeleteDialog(user);
                break;
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <ResourceView<User>
            title="User Management"
            resource={data}
            headCells={[
                { key: "id", label: "ID", numeric: true, disablePadding: true },
                { key: "biodata.fullName", label: "Full Name", numeric: false, disablePadding: false },
                { key: "email", label: "Email", numeric: false, disablePadding: false },
                { key: "roles", label: "Role", numeric: false, disablePadding: false },
            ]}
            columnComponents={{
                roles: ({ value }) => {
                    const role = Array.isArray(value) ? value[0]?.name : value;
                    const roleName = role ? role.split("_")[1]?.toLowerCase() : "user";
                    return <Chip label={roleName} color="primary" size="small" />;
                },
            }}
            onSearch={(searchTerm) => {
                console.log("Search term:", searchTerm);
                // Implement search logic here
            }}
            onFilterClick={() => {
                console.log("Filter clicked");
                // Implement filter logic here
            }}
            onAddClick={openCreateDialog}
            onCloseDialog={closeDialog}
            onActionClick={handleActionClick}
            onPageChange={handlePageChange}
            showActions={true}
            onSubmitForm={handleSubmitUserForm}
            formBuilder={
                <UserForm
                    selectedUser={pageState.selectedUser}
                    dialogMode={pageState.dialogMode}
                    isAuthorizedToEdit={pageState.isAuthorizedToEdit}
                    isAuthorizedToCreate={pageState.isAuthorizedToCreate}
                    onSubmit={handleSubmitUserForm}
                />
            }
        />
    );
}