import { Store } from 'lucide-react';

export const SidebarHeader = () => {
    return (
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/50">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                <Store size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none tracking-tight">Stockly</span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Admin Panel</span>
            </div>
        </div>
    );
};
