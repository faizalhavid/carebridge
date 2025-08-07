import React, { useMemo } from "react";
import ResourceTable from "./table";
import { Box } from "@mui/material";
import ResourceDialog from "./dialog";
import { ResourceProvider, useResourceContext } from "../../hooks/resource-provider";
import { BaseEntity } from "@/types/models/base-entity";
import { ResourceComponentInterface } from "@/types/components/resources";
import { RepositoryRestResource } from "@/types/api";

// Extract embedded data utility
function getEmbeddedData<T>(resource?: RepositoryRestResource<T[]> | null): T[] {
    if (!resource?._embedded) return [];
    const key = Object.keys(resource._embedded)[0];
    const embedded = resource._embedded[key];

    if (Array.isArray(embedded)) {
        return embedded.length > 0 && Array.isArray(embedded[0])
            ? (embedded as unknown as T[][]).flat()
            : embedded as T[];
    }
    return [];
}

// Dialog component that uses context
function ResourceDialogWrapper<T extends BaseEntity>() {
    const {
        dialogState,
        title,
        formBuilder,
        handleCloseDialog,
        handleSubmitDialog
    } = useResourceContext<T>();

    return (
        <ResourceDialog
            open={dialogState.open}
            mode={dialogState.mode}
            title={title}
            initialData={dialogState.selectedModelResource}
            onClose={handleCloseDialog}
            onSubmit={handleSubmitDialog}
            submitLabel={dialogState.mode === "create" ? "Create" : dialogState.mode === "edit" ? "Update" : "Delete"}
            deleteLabel="Delete"
            loading={false}
            maxWidth="sm"
        >
            {dialogState.mode === "delete" ? (
                <Box sx={{ py: 2 }}>
                    Are you sure you want to delete this item?
                </Box>
            ) : (
                formBuilder
            )}
        </ResourceDialog>
    );
}

function ResourceView<T extends BaseEntity>({
    title,
    resource,
    headCells,
    columnComponents,
    showActions = true,
    formBuilder,
    onSearch,
    onFilterClick,
    onAddClick,
    onPageChange,
    onCloseDialog,
    customTableAction,
    onSubmitForm,
    onActionClick,
}: ResourceComponentInterface.ResourceViewProps<T>) {

    // Memoized data extraction
    const data = useMemo(() => getEmbeddedData(resource) as T[], [resource]);

    return (
        <ResourceProvider
            title={title}
            data={data}
            resource={resource}
            headCells={headCells}
            showActions={showActions}
            columnComponents={columnComponents}
            customTableAction={customTableAction}
            formBuilder={formBuilder}
            onSearch={onSearch}
            onFilterClick={onFilterClick}
            onAddClick={onAddClick}
            onPageChange={onPageChange}
            onSubmitForm={onSubmitForm}
            onActionClick={onActionClick}
            onCloseDialog={onCloseDialog}
        >
            <Box
                sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flexGrow: 1,
                    height: "100%",
                    overflow: "hidden"
                }}
            >
                <ResourceTable<T> />
                <ResourceDialogWrapper<T> />
            </Box>
        </ResourceProvider>
    );
}

export default ResourceView;