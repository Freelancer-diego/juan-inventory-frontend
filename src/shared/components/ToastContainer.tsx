import type { ReactElement } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../../store/toast.store';
import type { ToastType } from '../../store/toast.store';

const styles: Record<ToastType, { wrapper: string; icon: ReactElement }> = {
  success: {
    wrapper: 'bg-white border border-green-200 text-slate-800',
    icon: <CheckCircle size={18} className="text-green-500 shrink-0" />,
  },
  error: {
    wrapper: 'bg-white border border-red-200 text-slate-800',
    icon: <XCircle size={18} className="text-red-500 shrink-0" />,
  },
  info: {
    wrapper: 'bg-white border border-blue-200 text-slate-800',
    icon: <Info size={18} className="text-blue-500 shrink-0" />,
  },
};

export const ToastContainer = () => {
  const { toasts, dismiss } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const { wrapper, icon } = styles[toast.type];
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-[260px] max-w-sm animate-slide-in ${wrapper}`}
          >
            {icon}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors ml-1"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
