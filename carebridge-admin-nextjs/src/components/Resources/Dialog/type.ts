export const DialogMode = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
  DELETE: 'DELETE',
} as const;

export interface DialogState<T> {
  open: boolean;
  isLoading: boolean;
  mode: (typeof DialogMode)[keyof typeof DialogMode];
  selectedModelResource?: T | null;
  hasValidationErrors: boolean;
}

export const modeTitle: Record<(typeof DialogMode)[keyof typeof DialogMode], string> = {
  CREATE: 'Tambah Data',
  EDIT: 'Edit Data',
  DELETE: 'Hapus Data',
  VIEW: 'Detail Data',
};

export const modeSubmitLabel: Record<(typeof DialogMode)[keyof typeof DialogMode], string> = {
  CREATE: 'Simpan',
  EDIT: 'Update',
  DELETE: 'Hapus',
  VIEW: '',
};

export interface DialogInterface {
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
