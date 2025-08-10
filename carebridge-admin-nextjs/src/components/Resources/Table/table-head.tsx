import React, { useCallback, useMemo } from 'react';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { BaseEntity } from '@/types/models/base-entity';
import { useResourceTableContext } from './provider';
import { ResourceTableHeadCell } from './type';
import { calculateSelectionState, createSelectAllHandler, createSortHandler, getSortKey, extractResourceData, createColumnSortHandler, shouldShowActions } from '@/lib/utils';

interface ResourceTableHeadProps<T extends BaseEntity> {
  /** Optional override for showing actions column */
  showActionsOverride?: boolean;
}

function ResourceTableHead<T extends BaseEntity>({ showActionsOverride }: ResourceTableHeadProps<T> = {}) {
  // Get all data from context
  const { tableState, setTableState, resource } = useResourceTableContext<T>();

  // Extract data and properties from nested state structure
  const data = useMemo(() => {
    const extractedData = extractResourceData(resource);
    return extractedData as unknown as T[];
  }, [resource]);

  const {
    sorting: { order, orderBy },
    display: { headCells, showTableActions },
    selection: { selectedIdData },
  } = tableState;

  // Determine if actions should be shown
  const showActions = shouldShowActions(showTableActions, showActionsOverride);

  // Memoized selection state calculations
  const { numSelected, rowCount, isIndeterminate, isAllSelected } = useMemo(() => calculateSelectionState(selectedIdData, data.length), [selectedIdData, data.length]);

  // Memoized handlers
  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSelectedIds = event.target.checked ? data.map((item: T) => Number(item.id)) : [];

      const selectionState = calculateSelectionState(newSelectedIds, data.length);

      setTableState((prev) => ({
        ...prev,
        selection: {
          ...prev.selection,
          selectedIdData: newSelectedIds,
          ...selectionState,
        },
      }));
    },
    [data, setTableState]
  );

  const handleRequestSort = useCallback(
    (property: string) => {
      const isCurrentlyAsc = orderBy === property && order === 'asc';
      const newOrder: 'asc' | 'desc' = isCurrentlyAsc ? 'desc' : 'asc';

      setTableState((prev) => ({
        ...prev,
        sorting: {
          ...prev.sorting,
          order: newOrder,
          orderBy: property,
        },
      }));
    },
    [orderBy, order, setTableState]
  );

  // Memoized sort handler creator for individual columns
  const createSortHandlerForColumn = useCallback(
    (property: string) => (event: React.MouseEvent<unknown>) => {
      event.preventDefault();
      handleRequestSort(property);
    },
    [handleRequestSort]
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
              onChange={handleSelectAllClick}
              inputProps={{
                'aria-label': 'select all items',
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell: ResourceTableHeadCell<T>) => {
          const sortKey = getSortKey(headCell);
          const isActive = orderBy === sortKey;

          return (
            <TableCell key={String(headCell.key ?? headCell.id)} align="left" padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={isActive ? order : false}>
              <TableSortLabel active={isActive} direction={isActive ? order : 'asc'} onClick={createSortHandlerForColumn(sortKey)}>
                {headCell.label}
                {isActive && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
