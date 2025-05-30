import React from "react";
import { Toolbar, Typography, TextField, Tooltip, IconButton, Theme, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Add, UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { alpha } from '@mui/material/styles';
import { ResourceComponentInterface as interfaces } from "./type";


function ResourceTableToolbar<T>({
    title,
    numSelected,
    tableState,
    onSearch,
    setDialogState,
    setTableState,
    onFilterClick,
}: interfaces.ResourceTableToolbarProps<T>) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {
                numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            {title}
                        </Typography>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            variant="outlined"
                            value={tableState.search}
                            onChange={(e) => {
                                setTableState((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }));
                                if (onSearch) onSearch(e.target.value);
                            }}
                            sx={{ marginRight: 2, width: isMobile ? "100%" : "500px" }}
                        />
                        <Tooltip title={numSelected > 0 ? "Actions" : "Add New"}>
                            <IconButton onClick={() => {
                                setDialogState({
                                    open: true,
                                    mode: "create",
                                    selectedModelResource: {} as T,
                                });
                            }}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </>
                )}

            <Tooltip title="Expand">
                <IconButton onClick={() => {
                    setTableState((prev) => ({
                        ...prev,
                        dense: !prev.dense,
                    }));
                }}>
                    {tableState.dense ? <UnfoldLess /> : <UnfoldMore />}
                </IconButton>
            </Tooltip>
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar >
    );
}

export default ResourceTableToolbar;