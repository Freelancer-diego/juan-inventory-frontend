import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from './layout/AdminLayout';
import { Login } from './pages/Login';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { ProductsPage as Products } from './products/ProductsPage';
import { Sales } from './pages/Sales';
import { Dashboard } from './dashboard/Dashboard';
import { UsersPage } from './users/pages/UsersPage';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="change-password" element={<ChangePasswordPage />} />
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="sales" element={<Sales />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
