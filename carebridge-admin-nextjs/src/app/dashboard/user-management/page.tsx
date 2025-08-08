"use client";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "@/types/models/user";
import ResourceView from "@/components/Resources";
import { Chip } from "@mui/material";
import { DialogMode } from "@/components/Resources/dialog";
import { useAuthStore } from "@/lib/stores/auth_store";
import { UserForm } from "./_components/user-form";
import { useMutationUserQuery, useUserQuery } from "@/lib/services/queries/user-query";
import { UserFormSchema } from "@/types/schemas/user-schema";

export default function UserManagementPage() {
    const { user: authenticatedUser } = useAuthStore();

    const { data, refetch } = useUserQuery();
    const { mutate: createUser } = useMutationUserQuery();

    const [pageState, setPageState] = useState<{
        selectedUser: User | null;
        dialogMode: DialogMode;
    }>({
        selectedUser: null,
        dialogMode: "create"
    });

    const closeDialog = useCallback(() => {
        setPageState(prev => ({
            ...prev,
            selectedUser: null,
        }));
        return true;
    }, []);

    const openViewDialog = useCallback((user: User) => {
        setPageState(prev => ({
            ...prev,
            selectedUser: user,
            dialogMode: "view",
        }));
    }, []);

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

    const openDeleteDialog = useCallback((user: User) => {
        setPageState(prev => ({
            ...prev,
            selectedUser: user,
            dialogMode: "delete",
        }));
    }, []);


    const handleSubmitUserForm = async (formData: UserFormSchema) => {
        try {
            if (pageState.dialogMode === "create") {
                await createUser({
                    email: formData.email,
                    fullName: formData.fullName,
                    address: formData.address,
                    password: formData.password,
                });
                refetch();
            } else if (pageState.dialogMode === "view") {
                // No action needed for view mode
            } else if (pageState.dialogMode === "edit" && pageState.selectedUser) {
                // await handleUpdateUser({
                //     id: pageState.selectedUser.id,
                //     email: formData.email,
                //     fullName: formData.fullName,
                //     address: formData.address,
                //     ...(formData.password && { password: formData.password }),
                // });
            } else if (pageState.dialogMode === "delete" && pageState.selectedUser) {
                // await handleDeleteUser(pageState.selectedUser.id);
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
        refetch();
    }, []);

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
                    onSubmit={handleSubmitUserForm}
                />
            }
        />
    );
}