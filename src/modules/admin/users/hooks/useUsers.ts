import { useState, useEffect } from 'react';
import type { User } from '../../../../types';
import { useUserStore } from '../../../../store/userStore';
import { useToastStore } from '../../../../store/toast.store';
import { dialog } from '../../../../shared/utils/dialog';

export const useUsers = () => {
  const { users, loading, error, fetchUsers, addUser, updateUser, removeUser } = useUserStore();
  const toast = useToastStore((state) => state.show);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (payload: { name?: string; email?: string; password?: string; mustChangePassword?: boolean }) => {
    try {
      await addUser({
        name: payload.name,
        email: payload.email!,
        password: payload.password!,
        mustChangePassword: payload.mustChangePassword ?? true,
      });
      setIsModalOpen(false);
      toast('Usuario creado exitosamente');
    } catch {
      toast('Error al crear el usuario', 'error');
    }
  };

  const handleUpdate = async (id: string, payload: { name?: string; email?: string; password?: string }) => {
    try {
      await updateUser(id, payload);
      setIsModalOpen(false);
      setSelectedUser(undefined);
      toast('Usuario actualizado exitosamente');
    } catch {
      toast('Error al actualizar el usuario', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await dialog.confirm({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer.',
      confirmText: 'Sí, eliminar',
      variant: 'danger',
    });
    if (!ok) return;
    try {
      await removeUser(id);
      toast('Usuario eliminado');
    } catch {
      toast('Error al eliminar el usuario', 'error');
    }
  };

  const openCreateModal = () => {
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  return {
    users,
    loading,
    error,
    isModalOpen,
    selectedUser,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
