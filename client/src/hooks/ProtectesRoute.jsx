import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmFkNjgyOTNhNzFkOWJhNTc1NzA4MiIsImlhdCI6MTcyNzc5NDQzNiwiZXhwIjoxNzI3Nzk4MDM2fQ.tdJE-65yzsZIfdHZwRFvmW9WRuSXod8T1T_jXSYQ2O4'
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
