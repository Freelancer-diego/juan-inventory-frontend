import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../../store/auth.store';
import { ToastContainer } from '../../../shared/components/ToastContainer';
import '../admin.css';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export const AdminLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 w-full p-4 md:p-8 overflow-y-auto">
        {/* Mobile Header with Hamburger */}
        <div className="md:hidden flex items-center gap-3 mb-6 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
            <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                aria-label="Toggle menu"
            >
                <Menu size={24} />
            </button>
            <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-tight">Corrales</span>
                <span className="text-xs text-slate-500">Panel de Administración</span>
            </div>
        </div>

        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};
