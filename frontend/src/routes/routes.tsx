// frontend/src/routes/routes.tsx
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';

// Public routes accessible without authentication
const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
];

// Protected routes that require authentication
const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <div className="dashboard">Dashboard Content</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/payments',
    element: (
      <ProtectedRoute>
        <div className="payments">Payments Content</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <div className="profile">Profile Content</div>
      </ProtectedRoute>
    ),
  },
];

// Root routes configuration
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <div className="dashboard">Dashboard Content</div>
          </ProtectedRoute>
        ),
      },
      ...publicRoutes,
      ...protectedRoutes,
    ],
  },
];

export default routes;