import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { User } from "@/types/models/user";
import { UserFormSchema, userSchema } from "@/types/schemas/user-schema";
import { DialogMode } from "@/components/Resources/dialog";



interface UserFormProps {
    selectedUser?: User | null;
    dialogMode: DialogMode;
    onSubmit: (data: UserFormSchema) => void;
}

export function UserForm({
    selectedUser,
    dialogMode,
    onSubmit
}: UserFormProps) {
    const isAuthorizedToEdit = true, isAuthorizedToCreate = true;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFormSchema>({
        resolver: zodResolver(userSchema as any),
        defaultValues: {
            email: selectedUser?.email ?? "",
            fullName: selectedUser?.biodata?.fullName ?? "",
            address: selectedUser?.biodata?.address ?? "",
            password: "",
        },
    });

    React.useEffect(() => {
        reset({
            email: selectedUser?.email ?? "",
            fullName: selectedUser?.biodata?.fullName ?? "",
            address: selectedUser?.biodata?.address ?? "",
            password: "",
        });
    }, [selectedUser, reset]);

    const isViewMode = dialogMode === "view";
    const isEditMode = dialogMode === "edit";
    const isCreateMode = dialogMode === "create";
    const showPasswordField = (isAuthorizedToEdit && isEditMode) || (isAuthorizedToCreate && isCreateMode);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                    <AppTextField
                        {...field}
                        variant="outlined"
                        sizes="small"
                        label="Full Name"
                        helperText={errors.fullName?.message || "Enter the user's full name"}
                        isError={!!errors.fullName}
                        isRequired
                        isDisabled={isViewMode}
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
                        type="email"
                        helperText={errors.email?.message || "Enter the user's email address"}
                        isError={!!errors.email}
                        isRequired
                        isDisabled={isViewMode}
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
                        helperText={errors.address?.message || "Enter the user's address"}
                        isError={!!errors.address}
                        isRequired
                        isDisabled={isViewMode}
                    />
                )}
            />

            {showPasswordField && (
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            label={isCreateMode ? "Password" : "New Password"}
                            type="password"
                            helperText={
                                !isAuthorizedToEdit && isEditMode
                                    ? "You don't have permission to edit password"
                                    : errors.password?.message ||
                                    (isEditMode
                                        ? "Leave empty to keep current password"
                                        : "Enter a secure password")
                            }
                            isRequired={isCreateMode}
                            isError={!!errors.password}
                            isDisabled={isViewMode || (!isAuthorizedToEdit && isEditMode)}
                        />
                    )}
                />
            )}
        </form>
    );
}
