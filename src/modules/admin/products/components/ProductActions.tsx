import { Edit2, Trash2 } from 'lucide-react';

interface ProductActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductActions = ({ onEdit, onDelete }: ProductActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={(e) => { e.stopPropagation(); onEdit(); }}
        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        title="Editar"
      >
        <Edit2 size={16} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        title="Eliminar"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
