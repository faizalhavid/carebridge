'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/models/user';
import ResourceView from '@/components/Resources';
import { Chip } from '@mui/material';
import { DialogMode, DialogState } from '@/components/Resources/Dialog/type';
import { useAuthStore } from '@/lib/stores/auth_store';
import { useMutationUserQuery, useUpdateMutationUser, useUserQuery } from '@/lib/services/queries/user-query';
import { UserFormSchema, userSchema } from '@/types/schemas/user-schema';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { SharedResourceData, useResourceDialog } from '@/hooks/resource-provider';
import { AppTextField } from '@/themes/mui_components/app_text_field';
import { TableState } from '@/components/Resources/Table/type';

export default function UserManagementPage() {
  const { user: authenticatedUser } = useAuthStore();

  const { data, refetch } = useUserQuery();
  const { mutate: createUser } = useMutationUserQuery();
  const { mutate: updateUser } = useUpdateMutationUser();

  const [tableState, setTableState] = useState<TableState<User>>({
    search: '',
    sorting: { order: 'asc', orderBy: '' },
    pagination: { page: 0, rowsPerPage: 10, emptyRows: 0 },
    selection: { selectedIdData: [], isIndeterminate: false, isAllSelected: false, numSelected: 0, rowCount: 0 },
    display: {
      dense: false,
      headCells: [
        { id: 'id', label: 'ID', numeric: true, disablePadding: true, key: 'id', visible: true },
        { id: 'biodata', label: 'Full Name', numeric: false, disablePadding: false, key: 'biodata.fullName', visible: true },
        { id: 'email', label: 'Email', numeric: false, disablePadding: false, key: 'email', visible: true },
        { id: 'roles', label: 'Role', numeric: false, disablePadding: false, key: 'roles', visible: true },
      ],
      visibleRows: [],
      showTableActions: true,
    },
  });


  const [dialogState, setDialogState] = useState<DialogState<User>>({
    open: false,
    mode: DialogMode.CREATE,
    selectedModelResource: null,
    isLoading: false,
    hasValidationErrors: false,
  });



  const [sharedData, setSharedData] = useState<SharedResourceData<User>>({
    isLoading: false,
    selectedItems: [],
    currentItem: null,
    hasUnsavedChanges: false,
    lastAction: null,
    filters: {},
  });


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
    clearErrors,
    trigger,
  } = useForm<UserFormSchema>({
    mode: 'onChange', // Enable validation on change
    defaultValues: {
      email: '',
      biodata: {
        fullName: '',
        address: '',
      },
      password: '',
    },
  });

  // Custom validation function
  const validateForm = useCallback(async (data: UserFormSchema) => {
    clearErrors();

    try {
      // Validate with Zod
      userSchema.parse(data);

      // Additional validation based on mode
      if (dialogState.mode === DialogMode.CREATE && (!data.password || data.password.length < 6)) {
        setError('password', { message: 'Password must be at least 6 characters' });
        return false;
      }

      if (dialogState.mode === DialogMode.EDIT && data.password && data.password.length < 6) {
        setError('password', { message: 'Password must be at least 6 characters' });
        return false;
      }

      return true;
    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((err: any) => {
          setError(err.path[0] as keyof UserFormSchema, { message: err.message });
        });
      }
      return false;
    }
  }, [clearErrors, setError, dialogState.mode]);

  const mode = dialogState.mode;
  const isCreateMode = mode === DialogMode.CREATE;
  const isEditMode = mode === DialogMode.EDIT;
  const isViewMode = mode === DialogMode.VIEW;

  React.useEffect(() => {
    const currentUser = dialogState.selectedModelResource;
    reset({
      email: currentUser?.email ?? '',
      biodata: {
        fullName: currentUser?.biodata?.fullName ?? '',
        address: currentUser?.biodata?.address ?? '',
      },
      password: '',
    });
  }, [dialogState.selectedModelResource, reset]);



  React.useEffect(() => {
    setDialogState((prev) => ({
      ...prev,
      hasValidationErrors: !isValid,
    }));
    console.log('Validation errors:', errors, 'hasErrors:', isValid, 'dialogState.hasValidationErrors:', !isValid);
  }, [isValid, setDialogState]);


  const showPasswordField = true;

  // Handle form submission - this will be called by React Hook Form with validated data
  const onSubmitForm: SubmitHandler<UserFormSchema> = useCallback(
    async (formData) => {
      console.log('Form submitted with data:', formData);
      const isValid = await validateForm(formData);
      if (!isValid) {
        console.log('Form validation failed');
        return;
      }


      try {
        const mode = dialogState.mode;
        console.log('Form is valid, proceeding with submission', mode, dialogState.selectedModelResource);
        if (mode === DialogMode.CREATE) {
          await createUser({
            email: formData.email,
            biodata: formData.biodata,
            password: formData.password,
          });
        } else if (mode === DialogMode.EDIT && dialogState.selectedModelResource) {
          await updateUser({
            id: dialogState.selectedModelResource.id, userData: {
              email: formData.email,
              biodata: formData.biodata,
              ...(formData.password && { password: formData.password }),
            }
          });
        } else if (mode === DialogMode.DELETE && dialogState.selectedModelResource) {
          // await handleDeleteUser(dialogState.selectedModelResource.id);
        }
        // Close dialog after successful submission
        setDialogState(prev => ({ ...prev, open: false }));
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      }
    },
    [validateForm, createUser, dialogState.selectedModelResource, dialogState.mode, setDialogState]
  );

  // Handle form submission for ResourceView (this will trigger the form validation)
  const handleSubmitUserForm = useCallback(
    async (formData: any) => {
      handleSubmit(onSubmitForm)();
    },
    [handleSubmit, onSubmitForm]
  );

  // Handle data refresh
  const handleRefreshData = useCallback(async () => {
    console.log('Refreshing user data...');
    return await refetch();
  }, [refetch]);


  // Handle page change
  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    console.log('Page changed to:', value);
  }, []);

  // Error handler
  const handleError = useCallback((error: any) => {
    console.error('Resource error:', error);
    alert(`Error: ${error.message || 'An error occurred'}`);
  }, []);

  // Success handler
  const handleSuccess = useCallback((message: string) => {
    console.log('Resource success:', message);
    // alert(`Success: ${message}`);
  }, []);

  // Search handler
  const handleSearch = useCallback((searchTerm: string) => {
    console.log('Search term:', searchTerm);
    // Implement search logic here
  }, []);

  // Filter handler
  const handleFilterClick = useCallback(() => {
    console.log('Filter clicked');
    // Implement filter logic here
  }, []);

  // Add handler
  const handleAddClick = useCallback(() => {
    console.log('Add clicked');
    setDialogState((prev) => ({ ...prev, selectedModelResource: null }))
  }, []);


  return (
    <ResourceView<User>
      dialogInterface={{ title: 'User Management', maxWidth: 'md' }}
      tableInterface={{ title: 'User Management', size: 'large' }}
      resource={data || null}
      customColumnComponents={{
        roles: ({ value }) => {
          const role = Array.isArray(value) ? value[0]?.name : value;
          const roleName = role ? role.split('_')[1]?.toLowerCase() : 'user';
          return <Chip label={roleName} color="primary" size="small" />;
        },
      }}
      onRefreshData={handleRefreshData}
      onSubmitForm={handleSubmitUserForm}
      onError={handleError}
      onSuccess={handleSuccess}
      onSearch={handleSearch}
      onFilterClick={handleFilterClick}
      onAddClick={handleAddClick}
      onPageChange={handlePageChange}
      formBuilder={
        <form onSubmit={handleSubmit(handleSubmitUserForm)} noValidate className="flex flex-col gap-4">
          <Controller
            name="biodata.fullName"
            control={control}
            rules={{
              required: 'Full name is required',
              minLength: { value: 1, message: 'Full name is required' }
            }}
            render={({ field }) => (
              <AppTextField
                {...field}
                variant="outlined"
                sizes="small"
                label="Full Name"
                helperText={errors.biodata?.fullName?.message || "Enter the user's full name"}
                isError={!!errors.biodata?.fullName}
                isRequired
                isDisabled={isViewMode}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
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
            name="biodata.address"
            control={control}
            rules={{
              required: 'Address is required',
              minLength: { value: 1, message: 'Address is required' }
            }}
            render={({ field }) => (
              <AppTextField
                {...field}
                variant="outlined"
                multiline
                sizes="small"
                label="Address"
                helperText={errors.biodata?.address?.message || "Enter the user's address"}
                isError={!!errors.biodata?.address}
                isRequired
                isDisabled={isViewMode}
              />
            )}
          />

          {showPasswordField && (
            <Controller
              name="password"
              control={control}
              rules={{
                required: isCreateMode ? 'Password is required' : false,
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                },
                validate: (value) => {
                  if (isCreateMode && (!value || value.length < 6)) {
                    return 'Password must be at least 6 characters';
                  }
                  if (isEditMode && value && value.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return true;
                }
              }}
              render={({ field }) => (
                <AppTextField
                  {...field}
                  variant="outlined"
                  sizes="small"
                  isAutoComplete={false}
                  label={isCreateMode ? 'Password' : 'New Password'}
                  type="password"
                  helperText={
                    isEditMode && !errors.password
                      ? "Leave empty to keep current password"
                      : errors.password?.message || (isCreateMode ? 'Enter a secure password' : 'Leave empty to keep current password')
                  }
                  isRequired={isCreateMode}
                  isError={!!errors.password}
                  isDisabled={isViewMode}
                />
              )}
            />
          )}
        </form>
      }
      dialogState={dialogState}
      setDialogState={setDialogState}
      tableState={tableState}
      setTableState={setTableState}
      sharedData={sharedData}
      setSharedData={setSharedData}

    />

  );
}
