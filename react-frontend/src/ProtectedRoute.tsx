// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  return <Outlet />; // Render the protected component
};

export default ProtectedRoute;