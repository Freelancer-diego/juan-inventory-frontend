import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from './layout/AdminLayout';
import { Login } from './pages/Login';
import { ProductsPage as Products } from './products/ProductsPage';
import { Sales } from './pages/Sales';
import { Dashboard } from './dashboard/Dashboard';
// import { Dashboard } from '../dashboard/Dashboard';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="sales" element={<Sales />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
