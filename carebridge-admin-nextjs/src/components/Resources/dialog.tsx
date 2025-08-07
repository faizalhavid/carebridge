import React, { useMemo, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResourceComponentInterface as interfaces } from "../../interfaces/components/resources";

export type DialogMode = "create" | "edit" | "delete" | "view";

const modeTitle: Record<DialogMode, string> = {
    create: "Tambah Data",
    edit: "Edit Data",
    delete: "Hapus Data",
    view: "Detail Data"
};

const modeSubmitLabel: Record<DialogMode, string> = {
    create: "Simpan",
    edit: "Update",
    delete: "Hapus",
    view: ""
};

function ResourceDialog<T>({
    open,
    mode,
    title,
    initialData,
    onClose,
    onSubmit,
    loading = false,
    children,
    submitLabel,
    showAction = true,
    deleteLabel,
    maxWidth = "sm",
}: interfaces.ResourceDialogProps<T>) {

    // Memoized dialog title
    const dialogTitle = useMemo(() =>
        `${title} ${modeTitle[mode]}`,
        [title, mode]
    );

    // Memoized submit button label
    const buttonLabel = useMemo(() => {
        if (mode === "delete") {
            return deleteLabel || modeSubmitLabel.delete;
        }
        return submitLabel || modeSubmitLabel[mode];
    }, [mode, deleteLabel, submitLabel]);

    // Memoized submit handler
    const handleSubmit = useCallback(() => {
        onSubmit?.(initialData ?? undefined);
    }, [onSubmit, initialData]);

    // Determine if actions should be shown
    const showActions = useMemo(() =>
        mode !== "view" && showAction,
        [mode, showAction]
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
            <DialogTitle sx={{
                m: 0,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                {dialogTitle}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    size="small"
                    disabled={loading}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ minHeight: 120 }}>
                {children}
            </DialogContent>

            {showActions && (
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={onClose}
                        color="inherit"
                        disabled={loading}
                        variant="outlined"
                    >
                        Batal
                    </Button>
                    {onSubmit && (
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color={mode === "delete" ? "error" : "primary"}
                            disabled={loading}
                        >
                            {buttonLabel}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
}

export default ResourceDialog;