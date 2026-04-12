import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    to: string;
    onClick?: () => void;
}

export const SidebarItem = ({ icon: Icon, label, to, onClick }: SidebarItemProps) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `
                relative flex items-center gap-3 px-4 py-3 mx-3 rounded-lg transition-all duration-200 group
                ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/10' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }
            `}
        >
            {({ isActive }) => (
                <>
                    {/* Active Indicator Strip (Optional style choice, kept minimal for now) */}
                    
                    <Icon 
                        size={20} 
                        className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                        strokeWidth={isActive ? 2.5 : 2}
                    />
                    
                    <span className={`font-medium tracking-wide ${isActive ? 'text-white' : ''}`}>
                        {label}
                    </span>

                    {/* Hover Glow Effect */}
                    {!isActive && (
                        <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                </>
            )}
        </NavLink>
    );
};
