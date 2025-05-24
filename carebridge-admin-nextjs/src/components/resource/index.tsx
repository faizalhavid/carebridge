import React, { useState } from "react";
import ResourceTable from "./table";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { Box } from "@mui/material";
import ResourceDialog, { DialogMode } from "./dialog";
import { BaseEntity } from "@/interfaces/models/base-entity";
import { ResourceComponentInterface as interfaces } from "./type";


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
    customTableAction: renderActions,
    onSubmitForm,
    onActionClick,
}: interfaces.ResourceViewProps<T>) {

    const [dialogState, setDialogState] = useState<interfaces.DialogState<T>>({
        open: false,
        mode: 'create' as DialogMode,
        selectedModelResource: null as T | null,
    });

    const [tableState, setTableState] = useState<interfaces.TableState<T>>({
        order: "asc" as "asc" | "desc",
        orderBy: headCells.length > 0 ? headCells[0].key : "",
        selected: [] as number[],
        page: resource?.page?.number || 0,
        dense: false,
        rowsPerPage: resource?.page?.size || 5,
        search: "",
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
            <ResourceTable<T>
                title={title}
                data={data}
                resource={resource}
                showActions={showActions}
                onSearch={onSearch}
                onFilterClick={onFilterClick}
                onAddClick={onAddClick}
                onPageChange={onPageChange}
                onSubmitForm={onSubmitForm}
                onActionClick={onActionClick}
                formBuilder={formBuilder}
                headCells={headCells}
                customTableAction={renderActions}
                columnComponents={columnComponents}
                dialogState={dialogState}
                setDialogState={setDialogState}
                tableState={tableState}
                setTableState={setTableState}
            />
            <Box sx={{ flexGrow: 1 }} />

            <ResourceDialog
                open={dialogState.open}
                mode={dialogState.mode}
                title={title}
                onClose={() => {
                    setTableState({
                        ...tableState,
                        selected: [],
                    });
                    setDialogState({ ...dialogState, open: false })
                }}
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