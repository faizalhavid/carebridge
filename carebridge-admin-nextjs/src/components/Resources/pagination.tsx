import { PaginationProps, Box, Typography } from "@mui/material";
import { useMemo } from "react";
import AppPagination, { AppPaginationProps } from "../AppPagination";
import { RepositoryRestResource } from "@/interfaces/api";

type ResourcePaginationProps<T> = AppPaginationProps & {
    resource?: RepositoryRestResource<T>;
    showInfo?: boolean;
};

export default function ResourcePagination<T>({
    resource,
    onChange,
    disabled = false,
    size = 'medium',
    color = 'primary',
    showFirstButton = true,
    showLastButton = true,
    className,
    showInfo = true,
}: ResourcePaginationProps<T> & PaginationProps) {
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