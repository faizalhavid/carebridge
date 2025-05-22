import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { RepositoryRestResource } from '@/interfaces/server-res';

interface PaginationProps {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'standard';
    showFirstButton?: boolean;
    showLastButton?: boolean;
    className?: string;
}

export const AppPagination: React.FC<PaginationProps> = ({
    count,
    page,
    onChange,
    disabled = false,
    size = 'medium',
    color = 'primary',
    showFirstButton = true,
    showLastButton = true,
    className,
}) => (
    <Stack spacing={2} alignItems="center">
        <Pagination
            count={count}
            page={page}
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
