import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, ButtonGroup } from "@mui/material";

interface ResourceTableProps<T> {
    data: T[];
    columns: { key: keyof T; label: string }[];
    customTableAction?: (row: T) => React.ReactNode;
}

function ResourceTable<T>({ data, columns, customTableAction }: ResourceTableProps<T>) {
    const renderActions = (row: T) => {
        if (customTableAction) {
            return customTableAction(row);
        }
        return (
            <ButtonGroup>
                <Button variant="contained" size="small" onClick={() => console.log("View", row)} >View</Button>
                <Button variant="contained" size="small" color="warning" onClick={() => console.log("Edit", row)}>Edit</Button>
                <Button variant="contained" size="small" color="error" onClick={() => console.log("Delete", row)}>Delete</Button>
            </ButtonGroup>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, padding: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={String(col.key)}>{col.label}</TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow key={idx}>
                            {columns.map((col) => (
                                <TableCell key={String(col.key)}>
                                    {String(row[col.key])}
                                </TableCell>
                            ))}
                            {renderActions && <TableCell>{renderActions(row)}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResourceTable;