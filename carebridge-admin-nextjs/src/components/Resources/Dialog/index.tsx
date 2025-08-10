import React, { useMemo, useCallback, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BaseEntity } from '@/types/models/base-entity';
import { modeTitle, modeSubmitLabel } from './type';
import { useResourceDialogContext } from './provider';

function ResourceDialog<T extends BaseEntity>() {
  const { dialogState, setDialogState, dialogInterface, formBuilder, onCloseDialog, onSubmitDialog, onOpenDialog } = useResourceDialogContext<T>();
  const { mode, selectedModelResource, hasValidationErrors } = dialogState;
  const dialogTitle = useMemo(() => `${dialogInterface.title} ${modeTitle[mode]}`, [dialogInterface.title, mode]);

  const buttonLabel = useMemo(() => {
    return modeSubmitLabel[mode];
  }, [mode]);

  React.useEffect(() => {
    handleOpenDialog(null, dialogState.mode, Number(dialogState.selectedModelResource?.id ?? 0));
  }, []);

  const handleOpenDialog = useCallback(
    (e: React.MouseEvent | null, mode: any, id: number) => {
      if (e) e.stopPropagation();
      setDialogState({
        open: true,
        isLoading: false,
        mode,
        selectedModelResource: null,
        hasValidationErrors: false,
      });
      if (e) {
        onOpenDialog?.(e, mode, id);
      }
    },
    [onOpenDialog]
  );

  const handleCloseDialog = useCallback(
    async (event?: React.MouseEvent, reason?: 'backdropClick' | 'escapeKeyDown') => {
      const result = await onCloseDialog?.(event, reason);
      if (result === false) return;
    },
    [onCloseDialog, mode]
  );

  const handleSubmitDialog = useCallback(
    (data: any) => {
      if (dialogState.hasValidationErrors) {
        console.log('Validation errors found');
        return;
      } else {
        onSubmitDialog?.(data, dialogState.mode);
        handleCloseDialog(undefined, 'escapeKeyDown');
      }
    },
    [dialogState.mode, dialogState.selectedModelResource, onSubmitDialog, handleCloseDialog]
  );

  return (
    <Dialog
      open={dialogState.open}
      onClose={(event, reason) => {
        if (event && 'preventDefault' in event) {
          handleCloseDialog(event as React.MouseEvent, reason);
        }
      }}
      maxWidth={dialogInterface.maxWidth}
      fullWidth
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IconButton aria-label="close" onClick={(event) => handleCloseDialog(event, 'backdropClick')} size="small" disabled={dialogState.isLoading || dialogState.hasValidationErrors}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ minHeight: 120 }}>
        {dialogState.mode === 'DELETE' ? <Box sx={{ py: 2 }}>Are you sure you want to delete this item?</Box> : formBuilder}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleCloseDialog} color="inherit" disabled={dialogState.isLoading || dialogState.hasValidationErrors} variant="outlined">
          Batal
        </Button>
        {dialogState.mode !== 'VIEW' && (
          <Button onClick={handleSubmitDialog} variant="contained" color={dialogState.mode === 'DELETE' ? 'error' : 'primary'} disabled={dialogState.isLoading || dialogState.hasValidationErrors}>
            {buttonLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ResourceDialog;
