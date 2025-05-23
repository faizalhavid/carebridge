import React from "react";
import { Box, Typography, TextField, Button, Stack, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

interface TableToolbarProps {
    title: string;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onAddClick?: () => void;
    children?: React.ReactNode;
}


interface ResourceTableToolbarProps {
    title: string;
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onAddClick?: () => void;
    addButtonText?: string;
    children?: React.ReactNode;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
    title,
    searchPlaceholder = "Cari...",
    onSearch,
    onFilterClick,
    onAddClick,
    children,
}) => {
    const [search, setSearch] = React.useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                gap: 2,
                flexWrap: "wrap",
            }}
        >
            <Typography variant="subtitle1" component="div">
                {title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                    size="small"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={handleSearchChange}
                    variant="outlined"
                />
                <IconButton color="primary" onClick={onFilterClick}>
                    <FilterListIcon />
                </IconButton>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={onAddClick}
                >
                    Tambah
                </Button>
                {children}
            </Stack>
        </Box>
    );
};


const ResourceTableToolbar: React.FC<ResourceTableToolbarProps> = (props) => (
    <TableToolbar
        title={props.title}
        onSearch={props.onSearch}
        onFilterClick={props.onFilterClick}
        onAddClick={props.onAddClick}
    >
        {props.children}
    </TableToolbar>
);

export default ResourceTableToolbar;