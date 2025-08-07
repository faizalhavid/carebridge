"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/interfaces/models/user";
import { fetcher } from "@/lib/services/axios";
import { RepositoryRestResource } from "@/interfaces/api/api-response";
import { createApiStore } from "@/lib/stores/api_store";
import ResourceView from "@/components/Resources";
import { Chip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { DialogMode } from "@/components/Resources/dialog";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { userManagementSchema } from "@/interfaces/schemas/user-schema";


const useUserStore = createApiStore<RepositoryRestResource<User[]>, User>({
    fetchFn: () => fetcher('/admin/users', { method: 'GET' }, true),
    postFn: (data) => fetcher('/admin/manage-user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }, true),

});


const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
) => {
    // Handle page change logic here
    console.log("Page changed to:", value);
}



const ROLE_PREVILEGES: { [key: string]: string[] } = {
    SUPER_ADMIN: ["create", "edit", "view", "delete", "manage_password"],
    ADMIN: ["create", "edit", "view"],
    MANAGER: ["view"],
};

export default function UserManagementPage() {
    const { data, loading, error, fetchData, postData } = useUserStore();
    const { user: authenticatedUser } = useAuthStore();

    const [pageState, setPageState] = useState(() => {
        return {
            selectedUser: null as User | null,
            dialogMode: "create" as DialogMode
        };
    });

    const handleSubmitUserForm = async (data: any) => {
        console.log("Form submitted with data:", data);
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(userManagementSchema),
        defaultValues: {
            email: pageState.selectedUser?.email ?? "",
            fullName: pageState.selectedUser?.biodata?.fullName ?? "",
            address: pageState.selectedUser?.biodata?.address ?? "",
            password: "",
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        reset({
            email: pageState.selectedUser?.email ?? "",
            fullName: pageState.selectedUser?.biodata?.fullName ?? "",
            address: pageState.selectedUser?.biodata?.address ?? "",
            password: "",
        });
    }, [pageState.selectedUser, reset]);

    return (
        <ResourceView<User>
            title="User Management"
            resource={data}
            headCells={[
                { key: "id", label: "ID", numeric: true, disablePadding: true },
                { key: "biodata.fullName", label: "Nama", numeric: false, disablePadding: false, },
                { key: "email", label: "Email", numeric: false, disablePadding: false },
                { key: "roles", label: "Role", numeric: false, disablePadding: false },
            ]}
            columnComponents={{
                role: ({ value }) => <Chip label={value.split("_")[1].toLowerCase()} color="primary" size="small" />,
            }}
            onSearch={(v) => console.log(v)}
            onFilterClick={() => console.log("filter")}
            onAddClick={() => console.log("add")}
            onCloseDialog={
                () => {
                    if (pageState.dialogMode == 'edit' || pageState.dialogMode == 'view') {
                        setPageState((prev) => ({
                            ...prev,
                            selectedUser: null,
                        }));
                    }
                }
            }
            onActionClick={(mode, user) => {
                setPageState((prev) => ({
                    ...prev,
                    selectedUser: user,
                    dialogMode: mode,
                }));
            }}
            onPageChange={handlePageChange}
            showActions={false}
            onSubmitForm={handleSubmit(handleSubmitUserForm)}
            formBuilder={
                <form onSubmit={handleSubmit(handleSubmitUserForm)} noValidate className="flex flex-col gap-4">
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <AppTextField
                                {...field}
                                variant="outlined"
                                sizes="small"
                                label="Fullname"
                                helperText={errors.fullName?.message || "Enter your name"}
                                isError={!!errors.fullName}
                                isRequired
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <AppTextField
                                {...field}
                                variant="outlined"
                                sizes="small"
                                label="Email"
                                helperText={errors.email?.message || "Enter your email"}
                                isError={!!errors.email}
                                isRequired
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <AppTextField
                                {...field}
                                variant="outlined"
                                multiline
                                sizes="small"
                                label="Address"
                                helperText={errors.address?.message || "Enter your address"}
                                isRequired
                            />
                        )}
                    />
                    {(pageState.dialogMode === "view") && (
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <AppTextField
                                    {...field}
                                    variant="outlined"
                                    sizes="small"
                                    label="Password"
                                    type="password"
                                    helperText={errors.password?.message || "Enter your password"}
                                    isRequired
                                    isError={!!errors.password}
                                    isDisabled={pageState.dialogMode === "view"}
                                />
                            )}
                        />
                    )}


                </form>
            }
        />

    );
}