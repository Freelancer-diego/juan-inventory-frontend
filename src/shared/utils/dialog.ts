import Swal from 'sweetalert2';

const base = {
  customClass: {
    popup:
      'rounded-2xl shadow-xl border border-slate-200/60 font-sans',
    title: 'text-slate-800 text-lg font-bold',
    htmlContainer: 'text-slate-500 text-sm',
    confirmButton:
      'bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors',
    cancelButton:
      'bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors',
    denyButton:
      'bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors',
    actions: 'gap-2',
  },
  buttonsStyling: false,
  reverseButtons: true,
};

interface ConfirmOptions {
  title: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  /** Use 'danger' for destructive actions (delete, logout) */
  variant?: 'default' | 'danger';
}

/** Returns true if the user clicked Confirm */
export const confirmDialog = async ({
  title,
  text,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default',
}: ConfirmOptions): Promise<boolean> => {
  const confirmButtonClass =
    variant === 'danger'
      ? 'bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors'
      : base.customClass.confirmButton;

  const result = await Swal.fire({
    ...base,
    title,
    text,
    icon: variant === 'danger' ? 'warning' : 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      ...base.customClass,
      confirmButton: confirmButtonClass,
    },
  });

  return result.isConfirmed;
};

export const successDialog = (message: string, title = '¡Listo!') =>
  Swal.fire({
    ...base,
    icon: 'success',
    title,
    text: message,
    confirmButtonText: 'Aceptar',
    timer: 2500,
    timerProgressBar: true,
  });

export const errorDialog = (message: string, title = 'Ocurrió un error') =>
  Swal.fire({
    ...base,
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'Entendido',
  });

export const infoDialog = (message: string, title = 'Información') =>
  Swal.fire({
    ...base,
    icon: 'info',
    title,
    text: message,
    confirmButtonText: 'Aceptar',
  });

/** Convenience object for named imports */
export const dialog = {
  confirm: confirmDialog,
  success: successDialog,
  error: errorDialog,
  info: infoDialog,
};
