import { X } from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside 
        className={`
            fixed md:sticky top-0 left-0 h-screen z-50
            flex flex-col
            w-72 bg-slate-900 text-white
            transition-transform duration-300 ease-out
            border-r border-slate-800
            shadow-2xl md:shadow-none
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Mobile Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white md:hidden"
        >
            <X size={24} />
        </button>

        <SidebarHeader />
        
        <SidebarNav onItemClick={() => {
            // Only close on mobile when an item is clicked
            if (window.innerWidth < 768) {
                onClose();
            }
        }} />
        
        <SidebarFooter />
      </aside>
    </>
  );
};
