import React, { useMemo } from 'react';
import { Pagination, Stack, Typography, Box } from '@mui/material';
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

interface ResourcePaginationProps<T> {
    resource?: RepositoryRestResource<T[]> | null;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'standard';
    showFirstButton?: boolean;
    showLastButton?: boolean;
    className?: string;
    showInfo?: boolean;
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

export function ResourcePagination<T>({
    resource,
    onChange,
    disabled = false,
    size = 'medium',
    color = 'primary',
    showFirstButton = true,
    showLastButton = true,
    className,
    showInfo = true,
}: ResourcePaginationProps<T>) {
    // Memoized pagination info
    const paginationInfo = useMemo(() => {
        if (!resource?.page) return null;

        const { page } = resource;
        return {
            currentPage: page.number + 1,
            totalPages: page.totalPages,
            totalElements: page.totalElements,
            pageSize: page.size,
            startItem: page.number * page.size + 1,
            endItem: Math.min((page.number + 1) * page.size, page.totalElements),
        };
    }, [resource]);

    if (!paginationInfo) return null;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            py: 2
        }}>
            {showInfo && (
                <Typography variant="body2" color="text.secondary">
                    Showing {paginationInfo.startItem}-{paginationInfo.endItem} of{' '}
                    {paginationInfo.totalElements} items
                </Typography>
            )}

            <AppPagination
                count={paginationInfo.totalPages}
                page={paginationInfo.currentPage}
                onChange={onChange}
                disabled={disabled}
                size={size}
                color={color}
                showFirstButton={showFirstButton}
                showLastButton={showLastButton}
                className={className}
            />
        </Box>
    );
}

export default AppPagination;