import React, { useCallback, useMemo, useState } from 'react';
import { Toolbar, Typography, TextField, Tooltip, IconButton, Theme, useMediaQuery, Box, Chip, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Add, UnfoldLess, UnfoldMore } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useResourceContext } from '../../../hooks/resource-provider';
import { BaseEntity } from '@/types/models/base-entity';
import { parseSearchInput, type SearchChip } from '@/lib/utils';
import { useResourceTableContext } from './provider';

function ResourceTableToolbar<T extends BaseEntity>() {
  // Get all data from context
  const { tableInterface, tableState, onSearch, setTableState, onFilterClick, onAddClick } = useResourceTableContext<T>();

  // Extract title from tableInterface
  const title = tableInterface?.title || 'Table';

  const numSelected = tableState.selection?.selectedIdData?.length || 0;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // State for search chips
  const [searchChips, setSearchChips] = useState<SearchChip[]>([]);
  const [currentInput, setCurrentInput] = useState('');

  // Memoized toolbar styles
  const toolbarStyles = useMemo(
    () => [
      {
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        minHeight: { xs: 56, sm: 64 },
      },
      numSelected > 0 && {
        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      },
    ],
    [numSelected]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentInput(value);

      // Check if user pressed space after typing key:value
      if (value.endsWith(' ')) {
        const { chips, remainingText } = parseSearchInput(value.trim());

        if (chips.length > 0) {
          // Add new chips and clear current input
          setSearchChips((prev) => {
            const newChips = [...prev];
            chips.forEach((chip) => {
              // Avoid duplicates
              if (!newChips.some((existing) => existing.key === chip.key)) {
                newChips.push(chip);
              }
            });
            return newChips;
          });
          setCurrentInput(remainingText);

          // Update table state with combined search
          const allChips = [...searchChips, ...chips];

          const combinedSearch = remainingText + ' ' + allChips.map((c) => `${c.key}:${c.value}`).join(' ');
          setTableState((prev) => ({ ...prev, search: combinedSearch.trim() }));
          onSearch?.(combinedSearch.trim());
        } else {
          // Regular search
          setTableState((prev) => ({ ...prev, search: value.trim() }));
          onSearch?.(value.trim());
        }
      } else {
        // Update search as user types
        setTableState((prev) => ({ ...prev, search: value }));
        if (!value.includes(':')) {
          onSearch?.(value);
        }
      }
    },
    [searchChips, setTableState, onSearch]
  );

  // Handle chip deletion
  const handleDeleteChip = useCallback(
    (chipToDelete: SearchChip) => {
      setSearchChips((prev) => {
        const newChips = prev.filter((chip) => !(chip.key === chipToDelete.key && chip.value === chipToDelete.value));

        // Update search state
        const combinedSearch = currentInput + ' ' + newChips.map((c) => `${c.key}:${c.value}`).join(' ');
        setTableState((prev) => ({ ...prev, search: combinedSearch.trim() }));

        if (newChips.length > 0 || currentInput.trim()) {
          onSearch?.(combinedSearch.trim());
        } else {
          onSearch?.('');
        }

        return newChips;
      });
    },
    [currentInput, setTableState, onSearch]
  );

  // Memoized density toggle handler
  const handleDensityToggle = useCallback(() => {
    setTableState((prev) => ({
      ...prev,
      display: {
        ...prev.display,
        dense: !prev.display.dense,
      },
    }));
  }, [setTableState]);

  return (
    <Toolbar sx={toolbarStyles}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Box
          sx={{
            flex: '1 1 100%',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div" sx={{ minWidth: 'fit-content' }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: isMobile ? '100%' : '300px',
              minWidth: '200px',
            }}
          >
            {/* Search Chips */}
            {searchChips.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  maxHeight: 60,
                  overflowY: 'auto',
                }}
              >
                {searchChips.map((chip, index) => (
                  <Chip key={`${chip.key}-${chip.value}-${index}`} label={`${chip.key}: ${chip.value}`} size="small" color="primary" variant="outlined" onDelete={() => handleDeleteChip(chip)} sx={{ fontSize: '0.75rem' }} />
                ))}
              </Box>
            )}

            {/* Search Input */}
            <TextField
              size="small"
              placeholder={searchChips.length > 0 ? 'Add more filters...' : 'Search or type key:value...'}
              variant="outlined"
              value={currentInput}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              helperText={searchChips.length === 0 ? 'Try: email:john or role:admin' : undefined}
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        {numSelected === 0 && (
          <Tooltip title="Add New">
            <IconButton onClick={onAddClick} color="primary">
              <Add />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={tableState.display?.dense ? 'Expand rows' : 'Compact rows'}>
          <IconButton onClick={handleDensityToggle}>{tableState.display?.dense ? <UnfoldMore /> : <UnfoldLess />}</IconButton>
        </Tooltip>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={onFilterClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Toolbar>
  );
}

export default ResourceTableToolbar;
