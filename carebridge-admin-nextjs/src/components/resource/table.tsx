import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, Typography, Checkbox } from "@mui/material";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { DialogMode } from "./dialog";

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


}

function ResourceTable<T>({
    data,
    columns,
    columnComponents = {},
    customTableAction,
    showActions = true,
    dialogState,
    setDialogState,
}: ResourceTableProps<T>) {

    // const [dialogOpen, setDialogOpen] = useState(false);
    // const [dialogMode, setDialogMode] = useState<CrudDialogMode>("create");
    // const [selectedModelResource, setSelectedModelResource] = useState<RepositoryRestResource<T> | null>(null);


    function getValueByPath(obj: any, path: string) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    const handleOpenDialog = (mode: DialogMode, id: string) => {
        const modelResource = data.find((item) => (item as any).id === id) || null;
        setDialogState({
            open: true,
            mode,
            selectedModelResource: modelResource,
        });
    };

    const renderActions = (row: T) => {
        if (customTableAction) {
            return customTableAction(row);
        }
        return (
            <ButtonGroup>
                <Button variant="contained" size="small" color="warning" onClick={() => handleOpenDialog("edit", row.id)}>Edit</Button>
                <Button variant="contained" size="small" color="error" onClick={() => handleOpenDialog("delete", row.id)}>Delete</Button>
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
                        <TableRow key={idx} hover onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDialog("view", row.id);
                        }} selected={dialogState.selectedModelResource?.id === row.id} style={{ cursor: "pointer" }} role="checkbox">
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