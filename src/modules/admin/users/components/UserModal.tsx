import { useState, useEffect } from 'react';
import type { User } from '../../../../types';
import { X, Loader2, Eye, EyeOff } from 'lucide-react';
import { dialog } from '../../../../shared/utils/dialog';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { name?: string; email?: string; password?: string; mustChangePassword?: boolean }) => Promise<void>;
  user?: User;
}

export const UserModal = ({ isOpen, onClose, onSubmit, user }: UserModalProps) => {
  const isEdit = !!user;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mustChangePassword, setMustChangePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email);
    } else {
      setName('');
      setEmail('');
      setMustChangePassword(true);
    }
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      dialog.error('Las contraseñas no coinciden.', 'Error de validación');
      return;
    }
    if (!isEdit && password.length < 8) {
      dialog.error('La contraseña debe tener al menos 8 caracteres.', 'Error de validación');
      return;
    }
    if (isEdit && password && password.length < 8) {
      dialog.error('La contraseña debe tener al menos 8 caracteres.', 'Error de validación');
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        const payload: { name?: string; email?: string; password?: string } = {};
        if (name !== (user.name ?? '')) payload.name = name;
        if (email !== user.email) payload.email = email;
        if (password) payload.password = password;
        await onSubmit(payload);
      } else {
        await onSubmit({ name: name || undefined, email, password, mustChangePassword });
      }
      onClose();
    } catch (error: any) {
      const msg = error?.response?.data?.message ?? 'Verifica los datos e intenta de nuevo.';
      dialog.error(msg, 'Error al guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Nombre */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Nombre <span className="text-slate-400 font-normal">(Opcional)</span>
            </label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Juan Pérez"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
            <input
              required
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Contraseña */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Contraseña
              {isEdit && <span className="text-slate-400 font-normal"> (dejar vacío para no cambiar)</span>}
            </label>
            <div className="relative">
              <input
                required={!isEdit}
                type={showPassword ? 'text' : 'password'}
                className={`${inputClass} pr-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isEdit ? '••••••••' : 'Mínimo 8 caracteres'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          {(password || !isEdit) && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Confirmar contraseña</label>
              <div className="relative">
                <input
                  required={!isEdit || !!password}
                  type={showConfirm ? 'text' : 'password'}
                  className={`${inputClass} pr-10`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500">Las contraseñas no coinciden</p>
              )}
            </div>
          )}

          {/* Rol — solo lectura */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Rol</label>
            <input
              readOnly
              className={`${inputClass} bg-slate-50 text-slate-500 cursor-not-allowed`}
              value="Administrador"
            />
          </div>

          {/* Obligar cambio de contraseña — solo en creación */}
          {!isEdit && (
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={mustChangePassword}
                  onChange={(e) => setMustChangePassword(e.target.checked)}
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  mustChangePassword ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'
                }`}>
                  {mustChangePassword && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Obligar cambio de contraseña en el primer inicio</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  El usuario deberá establecer una nueva contraseña al iniciar sesión por primera vez.
                </p>
              </div>
            </label>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Guardando...' : isEdit ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
