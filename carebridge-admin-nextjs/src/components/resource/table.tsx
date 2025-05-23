import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, Typography, Checkbox } from "@mui/material";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { DialogMode } from "./dialog";
import { createSelectedItemResourceStore } from "@/lib/stores/resource_store";

interface ResourceTableProps<T> {
    data: RepositoryRestResource<T>[];
    columns: { key: string; label: string }[];
    columnComponents?: { [key: string]: React.ComponentType<{ value: any; row: T }> };
    showActions?: boolean;
    customTableAction?: (row: T) => React.ReactNode;
    dialogState: {
        open: boolean;
        mode: DialogMode;
        selectedModelResource: RepositoryRestResource<T> | null;
    };
    setDialogState: React.Dispatch<React.SetStateAction<{
        open: boolean;
        mode: DialogMode;
        selectedModelResource: RepositoryRestResource<T> | null;
    }>>;
    onActionClick?: (mode: DialogMode, data: T) => void;


}

function ResourceTable<T>({
    data,
    columns,
    columnComponents = {},
    customTableAction,
    showActions = true,
    dialogState,
    setDialogState,
    onActionClick,
}: ResourceTableProps<T>) {

    function getValueByPath(obj: any, path: string) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
    const useSelectedItemResourceStore = createSelectedItemResourceStore<T>();

    const handleOpenDialog = (e: React.MouseEvent, mode: DialogMode, id: string) => {
        e.stopPropagation();
        const modelResource = data.find((item) => (item as any).id === id) || null;
        onActionClick?.(mode, modelResource as T);
        setDialogState({
            open: true,
            mode,
            selectedModelResource: modelResource,
        });
        console.log("Selected Model Resource:", dialogState);
    };

    const renderActions = (row: T) => {
        if (customTableAction) {
            return customTableAction(row);
        }
        return (
            <ButtonGroup>
                <Button variant="contained" size="small" color="warning" onClick={(e) => handleOpenDialog(e, "edit", row.id)}>Edit</Button>
                <Button variant="contained" size="small" color="error" onClick={(e) => handleOpenDialog(e, "delete", row.id)}>Delete</Button>
            </ButtonGroup>
        );
    };


    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, padding: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                // checked={rowCount > 0 && numSelected === rowCount}
                                // onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all desserts',
                                }}
                            />
                        </TableCell>
                        {columns.map((col) => (
                            <TableCell key={String(col.key)}>{col.label}</TableCell>
                        ))}
                        {showActions && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow key={idx} hover onClick={(e) =>
                            handleOpenDialog(e, "view", row.id)} selected={dialogState.selectedModelResource?.id === row.id} style={{ cursor: "pointer" }} role="checkbox">
                            {showActions && <TableCell padding="checkbox"><Checkbox
                                color="primary"
                                // checked={isItemSelected}
                                onClick={(e) => e.stopPropagation()}
                                inputProps={{
                                    'aria-labelledby': `enhanced-table-checkbox-${idx}`,
                                }}
                            /></TableCell>}
                            {columns.map((col) => {
                                const value = getValueByPath(row, col.key);
                                const CustomComponent = columnComponents[col.key];
                                return (
                                    <TableCell key={col.key}>
                                        {CustomComponent
                                            ? <CustomComponent value={value} row={row} />
                                            : <Typography variant="body2" color="text.secondary">{String(value)}</Typography>
                                        }
                                    </TableCell>
                                );
                            })}
                            {showActions && <TableCell>{renderActions(row)}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResourceTable;