'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/models/user';
import ResourceView from '@/components/Resources';
import { Chip } from '@mui/material';
import { DialogMode } from '@/components/Resources/Dialog/type';
import { useAuthStore } from '@/lib/stores/auth_store';
import { UserForm } from './_components/user-form';
import { useMutationUserQuery, useUserQuery } from '@/lib/services/queries/user-query';
import { UserFormSchema } from '@/types/schemas/user-schema';

export default function UserManagementPage() {
  const { user: authenticatedUser } = useAuthStore();

  const { data, refetch } = useUserQuery();
  const { mutate: createUser } = useMutationUserQuery();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Handle data refresh
  const handleRefreshData = useCallback(async () => {
    console.log('Refreshing user data...');
    return await refetch();
  }, [refetch]);

  // Handle form submission
  const handleSubmitUserForm = useCallback(
    async (formData: UserFormSchema, mode: keyof typeof DialogMode) => {
      try {
        if (mode === 'CREATE') {
          await createUser({
            email: formData.email,
            fullName: formData.fullName,
            address: formData.address,
            password: formData.password,
          });
        } else if (mode === 'EDIT' && selectedUser) {
          // await handleUpdateUser({
          //     id: selectedUser.id,
          //     email: formData.email,
          //     fullName: formData.fullName,
          //     address: formData.address,
          //     ...(formData.password && { password: formData.password }),
          // });
        } else if (mode === 'DELETE' && selectedUser) {
          // await handleDeleteUser(selectedUser.id);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        throw error; // Re-throw to let ResourceProvider handle it
      }
    },
    [createUser, selectedUser]
  );

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
    setSelectedUser(null);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch, data]);

  return (
    <ResourceView<User>
      title="User Management"
      resource={data || null}
      headCells={[
        { id: 'id', label: 'ID', numeric: true, disablePadding: true, key: 'id', visible: true },
        { id: 'biodata', label: 'Full Name', numeric: false, disablePadding: false, key: 'biodata.fullName', visible: true },
        { id: 'email', label: 'Email', numeric: false, disablePadding: false, key: 'email', visible: true },
        { id: 'roles', label: 'Role', numeric: false, disablePadding: false, key: 'roles', visible: true },
      ]}
      columnComponents={{
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
      showActions={true}
      formBuilder={<UserForm selectedUser={selectedUser} onSubmit={handleSubmitUserForm} />}
    />

  );
}
