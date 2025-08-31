'use client';
import ResourceView from '@/components/Resources';
import { DialogMode, DialogState } from '@/components/Resources/Dialog/type';
import { TableState } from '@/components/Resources/Table/type';
import { SharedResourceData } from '@/hooks/resource-provider';
import { useMutationUserQuery, useUpdateMutationUser, useUserQuery } from '@/lib/services/queries/user-query';
import { useAuthStore } from '@/lib/stores/auth_store';
import { User } from '@/types/models/user';
import { UserFormSchema, userSchema } from '@/types/schemas/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui';

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
    resolver: zodResolver(userSchema),
    mode: 'onChange',
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
  const validateForm = useCallback(
    async (data: UserFormSchema) => {
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
    },
    [clearErrors, setError, dialogState.mode]
  );

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
  }, [isValid, setDialogState]);

  const showPasswordField = true;

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
            id: dialogState.selectedModelResource.id,
            userData: {
              email: formData.email,
              biodata: formData.biodata,
              ...(formData.password && { password: formData.password }),
            },
          });
        } else if (mode === DialogMode.DELETE && dialogState.selectedModelResource) {
          // await handleDeleteUser(dialogState.selectedModelResource.id);
        }

        setDialogState((prev) => ({ ...prev, open: false }));
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      }
    },
    [validateForm, createUser, dialogState.selectedModelResource, dialogState.mode, setDialogState]
  );

  const handleSubmitUserForm = useCallback(
    async (formData: any) => {
      handleSubmit(onSubmitForm)();
    },
    [handleSubmit, onSubmitForm]
  );

  const handleRefreshData = useCallback(async () => {
    console.log('Refreshing user data...');
    return await refetch();
  }, [refetch]);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    console.log('Page changed to:', value);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('Resource error:', error);
    alert(`Error: ${error.message || 'An error occurred'}`);
  }, []);

  const handleSuccess = useCallback((message: string) => {
    console.log('Resource success:', message);
    // alert(`Success: ${message}`);
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    console.log('Search term:', searchTerm);
    // Implement search logic here
  }, []);

  const handleFilterClick = useCallback(() => {
    console.log('Filter clicked');
    // Implement filter logic here
  }, []);

  const handleAddClick = useCallback(() => {
    console.log('Add clicked');

    // Reset form when opening create dialog
    reset({
      email: '',
      biodata: { fullName: '', address: '' },
      password: '',
    });
    clearErrors();

    setDialogState((prev) => ({
      ...prev,
      selectedModelResource: null,
      open: true,
      mode: DialogMode.CREATE,
    }));
  }, [reset, clearErrors]);

  const handleCloseDialog = useCallback(() => {
    // Reset form when closing
    reset({
      email: '',
      biodata: { fullName: '', address: '' },
      password: '',
    });
    clearErrors();

    setDialogState((prev) => ({ ...prev, open: false }));
  }, [reset, clearErrors]);

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
      onCloseForm={handleCloseDialog}
      onPageChange={handlePageChange}
      formBuilder={
        <FormContainer
          key={`${dialogState.open}-${dialogState.mode}-${dialogState.selectedModelResource?.id || 'new'}`}
          defaultValues={{
            email: dialogState.selectedModelResource?.email || '',
            biodata: {
              fullName: dialogState.selectedModelResource?.biodata?.fullName || '',
              address: dialogState.selectedModelResource?.biodata?.address || '',
            },
            password: '',
          }}
          onSuccess={handleSubmitUserForm}
          resolver={zodResolver(userSchema)}
          mode="onChange"
          FormProps={{
            noValidate: true,
            className: 'flex flex-col gap-4',
          }}
        >
          <TextFieldElement name="biodata.fullName" label="Full Name" variant="outlined" size="small" required={true} disabled={isViewMode} helperText="Enter the user's full name" />

          <TextFieldElement name="email" label="Email" type="email" variant="outlined" size="small" required={true} disabled={isViewMode} helperText="Enter the user's email address" />

          <TextFieldElement name="biodata.address" label="Address" variant="outlined" size="small" multiline required={true} disabled={isViewMode} helperText="Enter the user's address" />

          {showPasswordField && <PasswordElement name="password" label={isCreateMode ? 'Password' : 'New Password'} variant="outlined" size="small" required={isCreateMode} disabled={isViewMode} helperText={isEditMode ? 'Leave empty to keep current password' : isCreateMode ? 'Enter a secure password' : 'Leave empty to keep current password'} />}
        </FormContainer>
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
