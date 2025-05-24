"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/interfaces/models/user";
import { fetcher } from "@/lib/utils/fetcher";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { createApiStore } from "@/lib/stores/api_store";
import ResourceView from "@/components/resource";
import { Chip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { createSelectedItemResourceStore } from "@/lib/stores/resource_store";


const useUserStore = createApiStore<RepositoryRestResource<User[]>>(
    () => fetcher('/admin/users', { method: 'GET' }, true)
);

const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
) => {
    // Handle page change logic here
    console.log("Page changed to:", value);
}

const userManagementSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    fullName: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    password: yup.string().required("Password is required"),
});



export default function UserManagementPage() {
    const { data, loading, error, fetchData } = useUserStore();

    const [selectedUser, setSelectedUser] = useState<User>();

    const handleSubmitUserForm = (data: any) => {
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

            email: selectedUser?.email ?? "",
            fullName: selectedUser?.biodata?.fullName ?? "",
            address: selectedUser?.biodata?.address ?? "",
            password: "",
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        reset({
            email: selectedUser?.email ?? "",
            fullName: selectedUser?.biodata?.fullName ?? "",
            address: selectedUser?.biodata?.address ?? "",
            password: "",
        });
    }, [selectedUser, reset]);

    return (
        <ResourceView<User>
            title="User Management"
            resource={data}
            headCells={[
                { id: "id", label: "ID", numeric: true, disablePadding: true },
                { id: "biodata", label: "Nama", numeric: false, disablePadding: false, key: "fullName" },
                { id: "email", label: "Email", numeric: false, disablePadding: false },
                { id: "role", label: "Role", numeric: false, disablePadding: false },
            ]}
            columnComponents={{
                role: ({ value }) => <Chip label={value.split("_")[1].toLowerCase()} color="primary" size="small" />,

            }}
            onSearch={(v) => console.log(v)}
            onFilterClick={() => console.log("filter")}
            onAddClick={() => console.log("add")}
            onActionClick={(mode, user) => {
                console.log("User clicked:", user);
                setSelectedUser(user);

                console.log("Selected user:", selectedUser);
            }}
            onPageChange={handlePageChange}
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
                                sizes="small"
                                label="Address"
                                helperText={errors.address?.message || "Enter your address"}
                                isRequired
                            />
                        )}
                    />
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
                            />
                        )}
                    />

                </form>
            }

        />

    );
}