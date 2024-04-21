import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import AdminPage2 from './pages/AdminPage2';
import PanoramaForm from './pages/PanoramaForm';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

const Navigation = ({ setAddModal }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AdminPage setAddModal={setAddModal} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university"
          element={
            <ProtectedRoute>
              <AdminPage2 setAddModal={setAddModal} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panorama"
          element={
            <ProtectedRoute>
              <PanoramaForm setAddModal={setAddModal} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
