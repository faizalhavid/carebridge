"use client";
import React, { useEffect } from "react";
import { fetcher } from "@/lib/services/axios";
import { RepositoryRestResource } from "@/types/api/api-response";
import { createApiStore } from "@/lib/stores/api_store";
import ResourceView from "@/components/Resources";
import { Role } from "@/types/models/user";
import * as yup from "yup";
import { useAuthStore } from "@/lib/stores/auth_store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { TextField } from "@mui/material";

const useUserStore = createApiStore<RepositoryRestResource<Role[]>, Role>({
    fetchFn: () => fetcher('/admin/roles', { method: 'GET' }, true),
    postFn: (data) => fetcher('/admin/manage-role', {
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

const roleSchema = yup.object().shape({
    name: yup.string().required("Role name is required"),
    privileges: yup.array().of(yup.string()).required("Privileges are required"),
});

export default function RoleManagementPage() {
    const { data, loading, error, fetchData } = useUserStore();
    const { user: authenticatedUser } = useAuthStore();
    const [pageState, setPageState] = React.useState({
        selectedRole: null as Role | null,
    });


    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            name: pageState.selectedRole?.name ?? "",
            privileges: pageState.selectedRole?.privileges?.map((p: any) => typeof p === "string" ? p : p.id ?? p.name) ?? [],
        },
    });


    const handleSubmitRole = async (data: any) => {
        try {
            // await useUserStore.postData(data);
            console.log("Role submitted successfully:", data);
            fetchData();
        } catch (error) {
            console.error("Error submitting role:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        reset({
            name: pageState.selectedRole?.name ?? "",
            privileges: pageState.selectedRole?.privileges?.map((p: any) => typeof p === "string" ? p : p.id ?? p.name) ?? [],
        });
    }, [reset]);

    return (
        <ResourceView<Role>
            title="Role Management"
            resource={data}
            headCells={[
                { key: "id", label: "ID", numeric: true, disablePadding: true },
                { key: "name", label: "Nama", numeric: false, disablePadding: false },
                { key: "privileges", label: "Privileges", numeric: false, disablePadding: false },
            ]}
            onSearch={(v) => console.log(v)}
            onFilterClick={() => console.log("filter")}
            onAddClick={() => console.log("add")}
            onPageChange={handlePageChange} onCloseDialog={function (): void {
                throw new Error("Function not implemented.");
            }}
            formBuilder={
                <form onSubmit={handleSubmit(handleSubmitRole)}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <AppTextField
                                {...field}
                                label="Role Name"
                                variant="outlined"
                                isError={!!errors.name}
                                helperText={errors.name ? errors.name.message : ""}
                                sizes="small"
                            />
                        )}
                    />
                    <Controller
                        name="privileges"
                        control={control}
                        render={({ field }) => (
                            // Use native MUI TextField for select with children
                            <TextField
                                {...field}
                                label="Privileges"
                                variant="outlined"
                                error={!!errors.privileges}
                                helperText={errors.privileges ? errors.privileges.message : ""}
                                size="small"
                                select
                                SelectProps={{
                                    multiple: true,
                                    native: true,
                                }}
                                fullWidth
                            >
                                <option value="" disabled>Select privileges</option>
                                {/* Replace with actual privilege options */}
                                <option value="read">Read</option>
                                <option value="write">Write</option>
                                <option value="delete">Delete</option>
                            </TextField>
                        )}
                    />
                </form>
            }
        />

    );
}