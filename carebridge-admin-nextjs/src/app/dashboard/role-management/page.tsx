"use client";
import React, { useEffect } from "react";
import ResourceView from "@/components/Resources";
import { Privilege, Role } from "@/types/models/user";
import { useAuthStore } from "@/lib/stores/auth_store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { TextField } from "@mui/material";
import { RoleFormSchema, roleSchema } from "@/types/schemas/role-schema";
import { useRoleQuery } from "@/lib/services/queries/role-query";



const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
) => {
    // Handle page change logic here
    console.log("Page changed to:", value);
}


export default function RoleManagementPage() {
    const { data, isLoading, error, refetch } = useRoleQuery();
    const { user: authenticatedUser } = useAuthStore();
    const [pageState, setPageState] = React.useState({
        selectedRole: null as Role | null,
        selectedPrivileges: [] as Privilege[],
    });


    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RoleFormSchema>({
        resolver: zodResolver(roleSchema as any),
        defaultValues: {
            name: pageState.selectedRole?.name ?? "",
            privileges: pageState.selectedPrivileges.map((p: Privilege) => p.id) ?? [],
        },
    });


    const handleSubmitRole = async (data: any) => {
        try {
            // await useUserStore.postData(data);
            console.log("Role submitted successfully:", data);
            refetch();
        } catch (error) {
            console.error("Error submitting role:", error);
        }
    }


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