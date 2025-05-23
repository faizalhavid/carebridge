import React, { useState } from "react";
import { ResourcePagination } from "./pagination";
import ResourceTableToolbar from "./toolbar";
import ResourceTable from "./table";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { Box } from "@mui/material";
import ResourceDialog, { DialogMode } from "./dialog";

interface ResourceViewProps<T> {
    title: string;
    resource?: RepositoryRestResource<T[]> | null;
    columns: { key: string; label: string }[]
    columnComponents?: { [key: string]: React.ComponentType<{ value: any; row: T }> };
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onAddClick?: () => void;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    customTableAction?: (row: T) => React.ReactNode;
    formBuilder: React.ReactNode;
    onSubmitForm?: (data: any) => void;
    onActionClick?: (mode: DialogMode, data: T) => void;
}


function ResourceView<T>({
    title,
    resource,
    columns,
    columnComponents,
    onSearch,
    onFilterClick,
    onAddClick,
    onPageChange,
    customTableAction: renderActions,
    formBuilder,
    onSubmitForm,
    onActionClick,
}: ResourceViewProps<T>) {
    const [dialogState, setDialogState] = useState({
        open: false,
        mode: 'create' as DialogMode,
        selectedModelResource: null as RepositoryRestResource<T> | null,
    });

    const data = getEmbeddedData(resource);

    function getEmbeddedData<T>(resource?: RepositoryRestResource<T[]> | null): T[] {
        if (!resource || !resource._embedded) return [];
        const key = Object.keys(resource._embedded)[0];
        const embedded = resource._embedded[key];
        if (Array.isArray(embedded)) {
            if (embedded.length > 0 && Array.isArray(embedded[0])) {
                return (embedded as unknown as T[][]).flat();
            }
            return embedded as T[];
        }
        return [];
    }
    return (
        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}>

            <ResourceTableToolbar
                title={title}
                onSearch={onSearch}
                onFilterClick={onFilterClick}
                onAddClick={onAddClick}
            />
            <ResourceTable<T> data={data} columns={columns} customTableAction={renderActions} columnComponents={columnComponents} dialogState={dialogState} setDialogState={setDialogState} onActionClick={onActionClick} />
            <Box sx={{ flexGrow: 1 }} />
            <ResourcePagination resource={resource} onChange={onPageChange} />
            <ResourceDialog
                open={dialogState.open}
                mode={dialogState.mode}
                title={title}
                onClose={() => { setDialogState({ ...dialogState, open: false }) }}
                onSubmit={() => {
                    if (dialogState.mode === "delete") {
                        // Handle delete logic here
                    } else {
                        // Handle create/edit logic here
                        if (onSubmitForm) {
                            onSubmitForm(dialogState.selectedModelResource);
                        }
                    }
                    setDialogState({ ...dialogState, open: false });
                }
                }
                submitLabel="Create"
                deleteLabel="Delete"
                loading={false}
                maxWidth="sm"
                children={dialogState.mode === "delete" ? (
                    <p>Are you sure you want to delete this item?</p>

                ) : formBuilder}
            />
        </Box>
    );
}

export default ResourceView;