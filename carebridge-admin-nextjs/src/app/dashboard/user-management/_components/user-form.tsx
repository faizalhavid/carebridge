import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppTextField } from '@/themes/mui_components/app_text_field';
import { User } from '@/types/models/user';
import { UserFormSchema, userSchema } from '@/types/schemas/user-schema';
import { useResourceDialog } from '@/hooks/resource-provider';
import { DialogMode } from '@/components/Resources/Dialog/type';

interface UserFormProps {
  selectedUser?: User | null;
  onSubmit: (data: UserFormSchema, mode: keyof typeof DialogMode) => Promise<void>;
}

export function UserForm({ selectedUser, onSubmit }: UserFormProps) {
  // Access dialog context from ResourceProvider
  const { dialogState } = useResourceDialog<User>();

  const isAuthorizedToEdit = true;
  const isAuthorizedToCreate = true;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema as any),
    defaultValues: {
      email: selectedUser?.email ?? '',
      fullName: selectedUser?.biodata?.fullName ?? '',
      address: selectedUser?.biodata?.address ?? '',
      password: '',
    },
  });

  const mode = dialogState.mode;
  const isCreateMode = mode === DialogMode.CREATE;
  const isEditMode = mode === DialogMode.EDIT;
  const isViewMode = mode === DialogMode.VIEW;

  React.useEffect(() => {
    const currentUser = dialogState.selectedModelResource || selectedUser;
    reset({
      email: currentUser?.email ?? '',
      fullName: currentUser?.biodata?.fullName ?? '',
      address: currentUser?.biodata?.address ?? '',
      password: '',
    });
  }, [dialogState.selectedModelResource, selectedUser, reset]);

  const handleFormSubmit = async (data: UserFormSchema) => {
    await onSubmit(data, mode as keyof typeof DialogMode);
  };

  const showPasswordField = (isAuthorizedToEdit && isEditMode) || (isAuthorizedToCreate && isCreateMode);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-4">
      <Controller name="fullName" control={control} render={({ field }) => <AppTextField {...field} variant="outlined" sizes="small" label="Full Name" helperText={errors.fullName?.message || "Enter the user's full name"} isError={!!errors.fullName} isRequired isDisabled={isViewMode} />} />

      <Controller name="email" control={control} render={({ field }) => <AppTextField {...field} variant="outlined" sizes="small" label="Email" type="email" helperText={errors.email?.message || "Enter the user's email address"} isError={!!errors.email} isRequired isDisabled={isViewMode} />} />

      <Controller name="address" control={control} render={({ field }) => <AppTextField {...field} variant="outlined" multiline sizes="small" label="Address" helperText={errors.address?.message || "Enter the user's address"} isError={!!errors.address} isRequired isDisabled={isViewMode} />} />

      {showPasswordField && <Controller name="password" control={control} render={({ field }) => <AppTextField {...field} variant="outlined" sizes="small" label={isCreateMode ? 'Password' : 'New Password'} type="password" helperText={!isAuthorizedToEdit && isEditMode ? "You don't have permission to edit password" : errors.password?.message || (isEditMode ? 'Leave empty to keep current password' : 'Enter a secure password')} isRequired={isCreateMode} isError={!!errors.password} isDisabled={isViewMode || (!isAuthorizedToEdit && isEditMode)} />} />}
    </form>
  );
}
