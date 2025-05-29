import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResourceComponentInterface as interfaces } from "./type";


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

export type DialogMode = "create" | "edit" | "delete" | "view";



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


    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                {`${title} ${modeTitle[mode]}`}

                <IconButton aria-label="close" onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            {(mode !== "view" && showAction) && (
                <DialogActions>
                    <Button onClick={onClose} color="inherit" disabled={loading}>
                        Batal
                    </Button>
                    {onSubmit && (
                        <Button
                            onClick={() => onSubmit(initialData ?? undefined)}
                            variant="contained"
                            color={mode === "delete" ? "error" : "primary"}
                            disabled={loading}
                        >
                            {mode === "delete"
                                ? (deleteLabel || modeSubmitLabel.delete)
                                : (submitLabel || modeSubmitLabel[mode])
                            }
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
}

export default ResourceDialog;