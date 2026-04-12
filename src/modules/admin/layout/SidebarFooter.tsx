import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/auth.store';
import { useNavigate } from 'react-router-dom';
import { dialog } from '../../../shared/utils/dialog';

export const SidebarFooter = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const ok = await dialog.confirm({
            title: '¿Cerrar sesión?',
            text: 'Tendrás que volver a iniciar sesión para acceder.',
            confirmText: 'Sí, salir',
            cancelText: 'Cancelar',
            variant: 'danger',
        });
        if (!ok) return;
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="p-4 border-t border-slate-800/50 bg-slate-900/30">
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
            >
                <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                <span className="font-medium">Cerrar Sesión</span>
            </button>
        </div>
    );
};
