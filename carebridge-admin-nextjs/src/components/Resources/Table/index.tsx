import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, ButtonGroup, Typography, Checkbox, Box, TablePagination, Chip, IconButton, Tooltip } from '@mui/material';
import { BaseEntity } from '@/types/models/base-entity';
import ResourceTableToolbar from './toolbar';
import ResourceTableHead from './table-head';
import { Delete, Edit } from '@mui/icons-material';
import { useResourceTableContext } from './provider';
import { extractAllValues, getCellValue, searchInRow, createNestedComparator } from '@/lib/utils';
import { useResourceView } from '@/hooks/resource-provider';

function ResourceTable<T extends BaseEntity>() {
  const { openDialogWithItem, selectMultipleItems, sharedData } = useResourceView();
  const { tableState, setTableState, tableInterface, resource, customColumnComponents, customTableAction, onSearch, onFilterClick, onAddClick, onPageChange } = useResourceTableContext<T>();
  const data: T[] = resource?._embedded ? (Object.values(resource._embedded).flat() as T[]) : [];

  const {
    sorting: { order, orderBy },
    pagination: { page, rowsPerPage },
    display: { dense, headCells, showTableActions: showActions },
    selection: { selectedIdData },
    search,
  } = tableState;

  const columnComponents = customColumnComponents || {};

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setTableState((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, page: newPage },
      }));
    },
    [setTableState]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTableState((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          rowsPerPage: parseInt(event.target.value, 10),
          page: 0,
        },
      }));
    },
    [setTableState]
  );

  const visibleRows = useMemo(() => {
    let filteredData = data;
    if (search.trim()) {
      filteredData = data.filter((row: T) => searchInRow(row, search));
    }
    return [...filteredData].sort(createNestedComparator(orderBy || '', order)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, order, orderBy, page, rowsPerPage, search]);

  const emptyRows = useMemo(() => rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage), [rowsPerPage, data.length, page]);

  const handleRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, row: T, isItemSelected: boolean) => {
      const rowId = Number(row.id);
      setTableState((prev) => ({
        ...prev,
        selection: {
          ...prev.selection,
          selectedIdData: isItemSelected ? prev.selection.selectedIdData.filter((id) => id !== rowId) : [...prev.selection.selectedIdData, rowId],
        },
      }));
      openDialogWithItem(e, 'VIEW', rowId);
    },
    [setTableState, openDialogWithItem]
  );

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent, row: T, isItemSelected: boolean) => {
      e.stopPropagation();
      const rowId = Number(row.id);
      setTableState((prev) => ({
        ...prev,
        selection: {
          ...prev.selection,
          selectedIdData: isItemSelected
            ? prev.selection.selectedIdData.filter((id) => id !== rowId)
            : [...prev.selection.selectedIdData, rowId],
        },
      }));

      if (isItemSelected) {
        selectMultipleItems(
          sharedData.selectedItems.filter(item => Number(item.id) !== rowId)
        );
      } else {
        selectMultipleItems([...sharedData.selectedItems, row]);
      }
    },
    [setTableState, selectMultipleItems, sharedData.selectedItems]
  );

  const renderActions = useCallback(
    (row: T) => {
      if (customTableAction) {
        return customTableAction(row);
      }
      return (
        <ButtonGroup>
          <Tooltip title="Edit">
            <IconButton color="warning" onClick={(e) => openDialogWithItem(e, 'EDIT', row.id as any)} size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={(e) => openDialogWithItem(e, 'DELETE', row.id as any)} size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      );
    },
    [customTableAction, openDialogWithItem]
  );

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Paper sx={{ width: '100%', padding: 2, boxShadow: '0 6px 20px rgba(0,0,0,0.18)' }}>
        <ResourceTableToolbar<T> />
        <TableContainer
          component={Box}
          sx={{
            minWidth: 650,
            overflowX: 'auto',
          }}
        >
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 650 }} aria-labelledby={tableInterface.title} stickyHeader>
            <ResourceTableHead<T> />
            <TableBody sx={{ height: 'auto' }}>
              {visibleRows.map((row: T, idx: number) => {
                const isItemSelected = selectedIdData.includes(Number(row.id));
                return (
                  <TableRow hover key={`${row.id}-${idx}`} onClick={(e) => handleRowClick(e, row, isItemSelected)} aria-checked={isItemSelected} selected={isItemSelected} style={{ cursor: 'pointer' }} role="checkbox">
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
                        <TableCell key={String(col.key ?? col.id)} component={idx === 0 ? 'th' : undefined} scope={idx === 0 ? 'row' : undefined} padding={col.disablePadding ? 'none' : 'normal'}>
                          {Array.isArray(value) ? (
                            value.length > 0 ? (
                              value.map((item: any, i: number) => <Chip key={`${col.key}-${i}`} label={item.name || item.label || String(item)} size="small" sx={{ mr: 0.5, mb: 0.5 }} />)
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                -
                              </Typography>
                            )
                          ) : CustomComponent ? (
                            <CustomComponent value={value} row={row} />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {String(value ?? '-')}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                    {showActions &&
                      <TableCell key={`actions-${row.id}`} align="center" padding="checkbox" sx={{ minWidth: 120, color: 'text.secondary' }}>
                        {!(sharedData.selectedItems.length > 1) ? renderActions(row) : '-'}
                      </TableCell>
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length + (showActions ? 2 : 1)} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </Box>
  );
}

export default ResourceTable;
