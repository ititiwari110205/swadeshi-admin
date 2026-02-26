import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAdminContext } from './context/AdminContext';

import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import SliderManagement from './pages/SliderManagement';
import PaymentHistory from './pages/PaymentHistory';
const ProtectedRoute = () => {
  const { adminUser } = useAdminContext();
  if (!adminUser) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="messages" element={<Messages />} />
          <Route path="slider" element={<SliderManagement />} />
          <Route path="payments" element={<PaymentHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}
