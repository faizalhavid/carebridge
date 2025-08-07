import React, { useCallback, useMemo } from "react";
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useResourceContext } from "../../hooks/resource-provider";
import { BaseEntity } from "@/types/models/base-entity";

function ResourceTableHead<T extends BaseEntity>() {
    // Get all data from context
    const {
        headCells,
        showActions = true,
        tableState,
        setTableState,
        data // Use data instead of filteredData
    } = useResourceContext<T>();

    const numSelected = tableState.selected.length;
    const rowCount = data.length; // Use data from context

    // Memoized checkbox state
    const isIndeterminate = useMemo(() =>
        numSelected > 0 && numSelected < rowCount,
        [numSelected, rowCount]
    );

    const isAllSelected = useMemo(() =>
        rowCount > 0 && numSelected === rowCount,
        [numSelected, rowCount]
    );

    // Memoized handlers
    const onSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n: T) => Number(n.id));
            setTableState((prev: any) => ({ ...prev, selected: newSelecteds }));
        } else {
            setTableState((prev: any) => ({ ...prev, selected: [] }));
        }
    }, [data, setTableState]);

    const onRequestSort = useCallback((event: React.MouseEvent<unknown>, property: keyof T) => {
        // Get the actual sort key - use headCell.key for nested properties, otherwise use headCell.id
        const headCell = headCells.find(cell => (cell.key || cell.id) === property);
        const sortKey = headCell?.key || String(property);

        const isAsc = tableState.orderBy === sortKey && tableState.order === 'asc';
        setTableState((prev: any) => ({
            ...prev,
            order: isAsc ? 'desc' : 'asc',
            orderBy: sortKey
        }));
    }, [headCells, tableState.orderBy, tableState.order, setTableState]);

    // Memoized sort handler creator
    const createSortHandler = useCallback((property: keyof T) =>
        (event: React.MouseEvent<unknown>) => onRequestSort(event, property),
        [onRequestSort]
    );

    return (
        <TableHead>
            <TableRow>
                {showActions && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={isIndeterminate}
                            checked={isAllSelected}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all items',
                            }}
                        />
                    </TableCell>
                )}

                {headCells.map((headCell) => {
                    const sortKey = headCell.key || headCell.id;
                    const isActive = tableState.orderBy === sortKey;
                    return (
                        <TableCell
                            key={String(headCell.key ?? headCell.id)}
                            align="left"
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={isActive ? tableState.order : false}
                        >
                            <TableSortLabel
                                active={isActive}
                                direction={isActive ? tableState.order : 'asc'}
                                onClick={createSortHandler((headCell.key || headCell.id) as keyof T)}
                            >
                                {headCell.label}
                                {isActive && (
                                    <Box component="span" sx={visuallyHidden}>
                                        {tableState.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                )}
                            </TableSortLabel>
                        </TableCell>
                    );
                })}

                {showActions && (
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                        Actions
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

export default ResourceTableHead;