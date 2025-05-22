import React from "react";
import { ResourcePagination } from "./pagination";
import ResourceTableToolbar from "./toolbar";
import ResourceTable from "./table";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { Box } from "@mui/material";

interface ResourceViewProps<T> {
    title: string;
    resource?: RepositoryRestResource<T> | null;
    columns: { key: keyof T; label: string }[];
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onAddClick?: () => void;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    renderActions?: (row: T) => React.ReactNode;
}

function getEmbeddedData<T>(resource?: RepositoryRestResource<T> | null): T[] {
    if (!resource || !resource._embedded) return [];
    const key = Object.keys(resource._embedded)[0];
    return resource._embedded[key] ?? [];
}

function ResourceView<T>({
    title,
    resource,
    columns,
    onSearch,
    onFilterClick,
    onAddClick,
    onPageChange,
    renderActions,
}: ResourceViewProps<T>) {
    const data = getEmbeddedData(resource);

    return (
        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}>
            <ResourceTableToolbar
                title={title}
                onSearch={onSearch}
                onFilterClick={onFilterClick}
                onAddClick={onAddClick}
            />
            <ResourceTable<T> data={data} columns={columns} customTableAction={renderActions} />
            <Box sx={{ flexGrow: 1 }} />
            <ResourcePagination resource={resource} onChange={onPageChange} />
        </Box>
    );
}

export default ResourceView;