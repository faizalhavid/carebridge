import React, { useState, useMemo, useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    ButtonGroup,
    Typography,
    Checkbox,
    Box,
    TablePagination,
    Chip,
    IconButton,
    Tooltip
} from "@mui/material";
import { BaseEntity } from "@/interfaces/models/base-entity";
import ResourceTableToolbar from "./toolbar";
import { ResourceComponentInterface as interfaces } from "../../interfaces/resources";
import ResourceTableHead from "./table-head";
import { Delete, Edit } from "@mui/icons-material";
import { useResourceContext } from "../../hooks/resource-context";

function ResourceTable<T extends BaseEntity>() {
    // Get all data from context
    const {
        title,
        data,
        resource,
        headCells,
        columnComponents = {},
        customTableAction,
        showActions = true,
        dialogState,
        tableState,
        setTableState,
        setDialogState,
        onFilterClick,
        onActionClick,
        onSearch
    } = useResourceContext<T>();

    // Memoized handlers
    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        setTableState((prev) => ({ ...prev, page: newPage }));
    }, [setTableState]);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTableState((prev) => ({
            ...prev,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        }));
    }, [setTableState]);

    // Helper function to extract all values from nested objects
    const extractAllValues = useCallback((obj: any, visited = new Set()): string => {
        if (obj === null || obj === undefined) return '';

        // Prevent circular references
        if (visited.has(obj)) return '';
        visited.add(obj);

        const values: string[] = [];

        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                // Handle arrays
                obj.forEach(item => {
                    values.push(extractAllValues(item, visited));
                });
            } else {
                // Handle objects - extract all property values recursively
                Object.values(obj).forEach(value => {
                    if (typeof value === 'string' || typeof value === 'number') {
                        values.push(String(value));
                    } else if (typeof value === 'object') {
                        values.push(extractAllValues(value, visited));
                    }
                });
            }
        } else {
            values.push(String(obj));
        }

        return values.filter(v => v.trim()).join(' ');
    }, []);

    // Memoized cell value getter
    const getCellValue = useCallback((row: T, col: any) => {
        if (col.key) {
            return col.key.split('.').reduce(
                (acc: any, part: string) => acc && acc[part],
                row
            );
        }
        return row[col.id as keyof T];
    }, []);

    // Enhanced search function that handles both regular search and key:value filters
    const searchInRow = useCallback((row: any, searchTerm: string): boolean => {
        if (!searchTerm.trim()) return true;

        // Check for key:value patterns
        const keyValuePattern = /(\w+):([^\s]+)/g;
        const keyValueMatches = Array.from(searchTerm.matchAll(keyValuePattern));

        if (keyValueMatches.length > 0) {
            // Handle structured search (key:value format)
            return keyValueMatches.every(match => {
                const [, key, value] = match;
                const rowValue = getCellValue(row, { key });

                if (rowValue === null || rowValue === undefined) return false;

                const searchableValue = extractAllValues(rowValue).toLowerCase();
                return searchableValue.includes(value.toLowerCase());
            });
        } else {
            // Handle regular text search across all fields
            const searchableText = extractAllValues(row).toLowerCase();
            return searchableText.includes(searchTerm.toLowerCase());
        }
    }, [extractAllValues, getCellValue]);

    // Enhanced comparator that handles nested properties
    const createNestedComparator = useCallback((orderBy: string, order: 'asc' | 'desc') => {
        return (a: T, b: T) => {
            // Extract values using the same logic as getCellValue
            const getNestedValue = (obj: any, path: string) => {
                if (!path) return obj;
                return path.split('.').reduce(
                    (acc: any, part: string) => acc && acc[part],
                    obj
                );
            };

            const aValue = getNestedValue(a, orderBy);
            const bValue = getNestedValue(b, orderBy);

            // Handle null/undefined values
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            // Convert to string for comparison if needed
            const aComp = typeof aValue === 'object' ? String(aValue) : aValue;
            const bComp = typeof bValue === 'object' ? String(bValue) : bValue;

            if (aComp < bComp) return order === 'asc' ? -1 : 1;
            if (aComp > bComp) return order === 'asc' ? 1 : -1;
            return 0;
        };
    }, []);

    // Memoized filtered and sorted data
    const visibleRows = useMemo(() => {
        let filteredData = data;
        if (tableState.search.trim()) {
            filteredData = data.filter((row) => searchInRow(row, tableState.search));
        }
        return [...filteredData]
            .sort(createNestedComparator(tableState.orderBy || '', tableState.order))
            .slice(
                tableState.page * tableState.rowsPerPage,
                tableState.page * tableState.rowsPerPage + tableState.rowsPerPage
            );
    }, [data, tableState.order, tableState.orderBy, tableState.page, tableState.rowsPerPage, tableState.search, searchInRow, createNestedComparator]);

    const emptyRows = useMemo(() =>
        tableState.rowsPerPage - Math.min(tableState.rowsPerPage, data.length - tableState.page * tableState.rowsPerPage),
        [tableState.rowsPerPage, data.length, tableState.page]
    );

    const handleOpenDialog = useCallback((e: React.MouseEvent, mode: any, id: number) => {
        e.stopPropagation();
        const modelResource = visibleRows.find((item: T) => (item as any).id === id);
        if (modelResource) {
            onActionClick?.(mode, modelResource as unknown as T);
        }
        setDialogState({
            open: true,
            mode,
            selectedModelResource: modelResource,
        });
    }, [visibleRows, onActionClick, setDialogState]);

    // Memoized row click handler
    const handleRowClick = useCallback((e: React.MouseEvent, row: T, isItemSelected: boolean) => {
        const rowId = Number(row.id);
        setTableState((prev) => ({
            ...prev,
            selected: isItemSelected
                ? prev.selected.filter((id) => id !== rowId)
                : [...prev.selected, rowId],
        }));
        handleOpenDialog(e, "view", rowId);
    }, [setTableState, handleOpenDialog]);

    // Memoized checkbox click handler  
    const handleCheckboxClick = useCallback((e: React.MouseEvent, row: T, isItemSelected: boolean) => {
        e.stopPropagation();
        const rowId = Number(row.id);
        setTableState((prev) => ({
            ...prev,
            selected: isItemSelected
                ? prev.selected.filter((id) => id !== rowId)
                : [...prev.selected, rowId],
        }));
    }, [setTableState]);

    const renderActions = useCallback((row: T) => {
        if (customTableAction) {
            return customTableAction(row);
        }
        return (
            <ButtonGroup>
                <Tooltip title="Edit">
                    <IconButton
                        color="warning"
                        onClick={(e) => handleOpenDialog(e, "edit", row.id as any)}
                        size="small"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        color="error"
                        onClick={(e) => handleOpenDialog(e, "delete", row.id as any)}
                        size="small"
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        );
    }, [customTableAction, handleOpenDialog]);

    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Paper sx={{ width: '100%', padding: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}>
                <ResourceTableToolbar<T> />
                <TableContainer
                    component={Box}
                    sx={{
                        minWidth: 650,
                        overflowX: 'auto',
                        maxHeight: 345
                    }}
                >
                    <Table
                        size={tableState.dense ? "small" : "medium"}
                        sx={{ minWidth: 650 }}
                        aria-labelledby="tableTitle"
                        stickyHeader
                    >
                        <ResourceTableHead<T> />

                        <TableBody>
                            {visibleRows.map((row: T, idx: number) => {
                                const isItemSelected = tableState.selected.includes(Number(row.id));
                                return (
                                    <TableRow
                                        hover
                                        key={`${row.id}-${idx}`}
                                        onClick={(e) => handleRowClick(e, row, isItemSelected)}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                        style={{ cursor: "pointer" }}
                                        role="checkbox"
                                    >
                                        {showActions && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={(e) => handleCheckboxClick(e, row, isItemSelected)}
                                                    inputProps={{
                                                        'aria-labelledby': `enhanced-table-checkbox-${idx}`,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                        {headCells.map((col) => {
                                            const value = getCellValue(row, col);
                                            const CustomComponent = columnComponents[String(col.key ?? col.id)];

                                            return (
                                                <TableCell
                                                    key={String(col.key ?? col.id)}
                                                    component={idx === 0 ? "th" : undefined}
                                                    scope={idx === 0 ? "row" : undefined}
                                                    padding={col.disablePadding ? "none" : "normal"}
                                                >
                                                    {Array.isArray(value) ? (
                                                        value.length > 0 ? (
                                                            value.map((item: any, i: number) => (
                                                                <Chip
                                                                    key={`${col.key}-${i}`}
                                                                    label={item.name || item.label || String(item)}
                                                                    size="small"
                                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                                />
                                                            ))
                                                        ) : (
                                                            <Typography variant="body2" color="text.secondary">-</Typography>
                                                        )
                                                    ) : CustomComponent ? (
                                                        <CustomComponent value={value} row={row} />
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">
                                                            {String(value ?? "-")}
                                                        </Typography>
                                                    )}
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
                                    <TableCell colSpan={headCells.length + (showActions ? 2 : 1)} />
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