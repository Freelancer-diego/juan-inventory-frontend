import type { User } from '../../../../types';
import { SmartTable, type TableColumn } from '../../../../shared/components/SmartTable';
import { Edit2, Trash2, ShieldCheck, UserCircle } from 'lucide-react';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserTable = ({ users, loading, onEdit, onDelete }: UserTableProps) => {
  const columns: TableColumn<User>[] = [
    {
      key: 'user',
      header: 'Usuario',
      searchValue: (item) => `${item.name ?? ''} ${item.email}`,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <UserCircle size={18} className="text-slate-400" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{item.name || <span className="text-slate-400 italic">Sin nombre</span>}</p>
            <p className="text-xs text-slate-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Correo electrónico',
      searchValue: (item) => item.email,
      render: (item) => <span className="text-slate-600 text-sm">{item.email}</span>,
    },
    {
      key: 'role',
      header: 'Rol',
      searchValue: (item) => item.role,
      render: () => (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
          <ShieldCheck size={11} />
          Administrador
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      headerClass: 'text-right',
      cellClass: 'text-right',
      render: (item) => (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Editar"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <SmartTable
      data={users}
      columns={columns}
      loading={loading}
      emptyMessage="No hay usuarios registrados."
      pageSize={10}
      getKey={(item) => item.id}
      mobileCard={(item) => (
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <UserCircle size={20} className="text-slate-400" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{item.name || <span className="italic text-slate-400">Sin nombre</span>}</p>
                <p className="text-sm text-slate-500">{item.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(item)}
                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">Rol:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
              <ShieldCheck size={10} />
              Administrador
            </span>
          </div>
        </div>
      )}
    />
  );
};
