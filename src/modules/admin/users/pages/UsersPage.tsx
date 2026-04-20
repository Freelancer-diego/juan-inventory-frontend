import { Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { UserTable } from '../components/UserTable';
import { UserModal } from '../components/UserModal';

export const UsersPage = () => {
  const {
    users,
    loading,
    isModalOpen,
    selectedUser,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Usuarios</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona las cuentas con acceso al panel administrativo.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nuevo Usuario
        </button>
      </div>

      <UserTable
        users={users}
        loading={loading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
        onSubmit={selectedUser ? (data) => handleUpdate(selectedUser.id, data) : handleCreate}
      />
    </div>
  );
};
