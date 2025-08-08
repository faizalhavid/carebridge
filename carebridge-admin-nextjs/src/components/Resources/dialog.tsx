import React, { useMemo, useCallback, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResourceComponentInterface as interfaces } from "../../types/components/resources";

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
    const [isClosing, setIsClosing] = useState(false);

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

    // Handle close with control
    const handleClose = useCallback(async () => {
        if (isClosing) return; // Prevent multiple simultaneous close attempts

        setIsClosing(true);
        try {
            const result = onClose();

            // If onClose returns a boolean or Promise<boolean>, respect that decision
            if (typeof result === 'boolean') {
                if (!result) {
                    setIsClosing(false);
                    return; // Don't close if result is false
                }
            } else if (result instanceof Promise) {
                const shouldClose = await result;
                if (!shouldClose) {
                    setIsClosing(false);
                    return; // Don't close if promise resolves to false
                }
            }

            // If we get here, either:
            // 1. onClose returned void (original behavior)
            // 2. onClose returned true
            // 3. onClose returned Promise<true>
            // In all these cases, the dialog should close (handled by parent component)
        } catch (error) {
            console.error('Error in onClose handler:', error);
            // On error, don't close the dialog
        } finally {
            setIsClosing(false);
        }
    }, [onClose, isClosing]);

    // Determine if actions should be shown
    const showActions = useMemo(() =>
        mode !== "view" && showAction,
        [mode, showAction]
    );

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth>
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
                    onClick={handleClose}
                    size="small"
                    disabled={loading || isClosing}
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
                        onClick={handleClose}
                        color="inherit"
                        disabled={loading || isClosing}
                        variant="outlined"
                    >
                        Batal
                    </Button>
                    {onSubmit && (
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color={mode === "delete" ? "error" : "primary"}
                            disabled={loading || isClosing}
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