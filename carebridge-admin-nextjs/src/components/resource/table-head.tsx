import React from "react";
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ResourceComponentInterface as interfaces } from "./type";
import { BaseEntity } from "@/interfaces/models/base-entity";



function ResourceTableHead<T extends BaseEntity>({
    numSelected,
    onRequestSort,
    onSelectAllClick,
    order,
    orderBy,
    rowCount,
    headCells,
    showActions
}: interfaces.ResourceTableHeadProps<T>) {
    console.log("showActions", showActions);
    return (
        <TableHead>
            <TableRow>
                {showActions &&
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                }
                {headCells.map((headCell) => (
                    <TableCell
                        key={String(headCell.key ?? headCell.id)}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={(event) => onRequestSort(event, headCell.id as keyof T)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {showActions && <TableCell>Actions</TableCell>}
            </TableRow>
        </TableHead>
    );
}

export default ResourceTableHead;