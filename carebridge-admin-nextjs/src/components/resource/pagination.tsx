import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { RepositoryRestResource } from '@/interfaces/server-res';
import { AppPagination } from '../pagination';


interface ResourcePaginationProps<T> {
    resource?: RepositoryRestResource<T> | null;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'standard';
    showFirstButton?: boolean;
    showLastButton?: boolean;
    className?: string;
}

export const ResourcePagination = <T,>({
    resource,
    onChange,
    disabled,
    size,
    color,
    showFirstButton,
    showLastButton,
    className,
}: ResourcePaginationProps<T>) => {
    if (!resource || !resource.page) return null;
    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ marginTop: 2 }}>
            <div>
                Total Items: {resource.page.totalElements}
            </div>
            <AppPagination
                count={resource.page.totalPages}
                page={resource.page.number + 1}
                onChange={onChange}
                disabled={disabled}
                size={size}
                color={color}
                showFirstButton={showFirstButton}
                showLastButton={showLastButton}
                className={className}
            />
        </Stack>
    );
};