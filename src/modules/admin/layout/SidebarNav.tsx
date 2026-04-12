import { LayoutDashboard, Package, Tag } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

interface SidebarNavProps {
    onItemClick?: () => void;
}

export const SidebarNav = ({ onItemClick }: SidebarNavProps) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
        { icon: Package, label: 'Productos', to: '/admin/products' },
        { icon: Tag, label: 'Ventas', to: '/admin/sales' },
    ];

    return (
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div className="px-6 mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Menú
                </p>
            </div>
            {navItems.map((item) => (
                <SidebarItem
                    key={item.to}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    onClick={onItemClick}
                />
            ))}
        </nav>
    );
};
