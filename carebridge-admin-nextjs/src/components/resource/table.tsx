import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, Typography, Checkbox, TableSortLabel, Toolbar, IconButton, Tooltip, TextField, Box, TablePagination } from "@mui/material";
import { BaseEntity } from "@/interfaces/models/base-entity";
import ResourceTableToolbar from "./toolbar";
import { ResourceComponentInterface as interfaces } from "./type";
import { createComparator } from "@/lib/utils/create-comparator";
import ResourceTableHead from "./table-head";
import { Delete, Edit } from "@mui/icons-material";

function ResourceTable<T extends BaseEntity>({
    title,
    data,
    resource,
    headCells,
    columnComponents = {},
    customTableAction,
    showActions,
    dialogState,
    tableState,
    setTableState,
    setDialogState,
    onFilterClick,
    onActionClick,
    onSearch
}: interfaces.ResourceTableProps<T>) {

    const handleChangePage = (event: unknown, newPage: number) => {
        setTableState((prev) => ({
            ...prev,
            page: newPage,
        }));
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTableState((prev) => ({
            ...prev,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        }));
    }

    const emptyRows =
        tableState.rowsPerPage - Math.min(tableState.rowsPerPage, data.length - tableState.page * tableState.rowsPerPage);

    const visibleRows = React.useMemo(
        () => {
            let filteredData = data;
            if (tableState.search.trim()) {
                filteredData = data.filter((row) =>
                    Object.values(row)
                        .join(" ")
                        .toLowerCase()
                        .includes(tableState.search.toLowerCase())
                );
            }
            return [...filteredData]
                .sort((a, b) =>
                    createComparator(
                        tableState.orderBy as keyof T,
                        tableState.order,
                    )(a as any, b as any)
                )
                .slice(
                    tableState.page * tableState.rowsPerPage,
                    tableState.page * tableState.rowsPerPage + tableState.rowsPerPage
                );
        },
        [data, tableState.order, tableState.orderBy, tableState.page, tableState.rowsPerPage, tableState.search]
    );


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof T,
    ) => {
        const isAsc = tableState.orderBy === property && tableState.order === "asc";
        setTableState({
            ...tableState,
            order: isAsc ? "desc" : "asc",
            orderBy: property as string,
        });
    }

    const handleSelectAllCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = visibleRows.map((n) => n.id).filter((id): id is number => typeof id === "number");
            setTableState({
                ...tableState,
                selected: newSelecteds,
            });
            //createSelectedItemResourceStore.setState({ selectedItemResource: newSelecteds });
            return;
        }
        setTableState({
            ...tableState,
            selected: [],
        });
    }

    const handleOpenDialog = (e: React.MouseEvent, mode: any, id: number) => {
        e.stopPropagation();
        const modelResource = visibleRows.find((item) => (item as any).id === id);
        if (modelResource) {
            onActionClick?.(mode, modelResource as unknown as T);
        }
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
                <Tooltip title="Edit">
                    <IconButton color="warning" onClick={(e) => handleOpenDialog(e, "edit", row.id as any)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={(e) => handleOpenDialog(e, "delete", row.id as any)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ maxHeight: 440, padding: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}>
                <ResourceTableToolbar<T>
                    title={title}
                    numSelected={tableState.selected.length}
                    tableState={tableState}
                    setTableState={setTableState}
                    setDialogState={setDialogState}
                    onSearch={onSearch}
                    onFilterClick={onFilterClick}
                />
                <TableContainer>
                    <Table size={tableState.dense ? "small" : "medium"}
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <ResourceTableHead
                            numSelected={tableState.selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllCheckbox}
                            order={tableState.order}
                            orderBy={tableState.orderBy}
                            rowCount={visibleRows.length}
                            headCells={headCells}
                            showActions={showActions}
                        />

                        <TableBody>
                            {visibleRows.map((row, idx) => {
                                const isItemSelected = tableState.selected.includes(Number(row.id));
                                return (
                                    <TableRow
                                        hover
                                        key={idx}
                                        onClick={(e) => {
                                            setTableState((prev) => ({
                                                ...prev,
                                                selected: isItemSelected
                                                    ? prev.selected.filter((id) => id !== Number(row.id))
                                                    : [...prev.selected, Number(row.id)],
                                            }));
                                            handleOpenDialog(e, "view", Number(row.id))
                                        }}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                        style={{ cursor: "pointer" }}
                                        role="checkbox">
                                        {showActions &&
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setTableState((prev) => ({
                                                            ...prev,
                                                            selected: isItemSelected
                                                                ? prev.selected.filter((id) => id !== Number(row.id))
                                                                : [...prev.selected, Number(row.id)],
                                                        }));

                                                    }}
                                                    inputProps={{
                                                        'aria-labelledby': `enhanced-table-checkbox-${idx}`,
                                                    }}
                                                />
                                            </TableCell>}
                                        {headCells.map((col) => {
                                            const value = col.key ? (row as any)[col.id][col.key] : (row as any)[col.id];
                                            const CustomComponent = columnComponents[String(col.key ?? col.id)];
                                            return (
                                                <TableCell
                                                    key={String(col.key ?? col.id)}
                                                    component={idx === 0 ? "th" : undefined}
                                                    scope={idx === 0 ? "row" : undefined}
                                                    padding={col.disablePadding ? "none" : "normal"}
                                                >
                                                    {CustomComponent
                                                        ? <CustomComponent value={value} row={row} />
                                                        : <Typography variant="body2" color="text.secondary">{String(value)}</Typography>
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                        {showActions && <TableCell>{renderActions(row)}</TableCell>}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (tableState.dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={tableState.rowsPerPage}
                    page={tableState.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default ResourceTable;