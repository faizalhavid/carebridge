import React, { useMemo } from 'react';
import { Pagination, Stack, Typography, Box } from '@mui/material';

export interface AppPaginationProps {
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


export const AppPagination: React.FC<AppPaginationProps> = ({
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


export default AppPagination;