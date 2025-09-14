import React from 'react';
import type { RouteObject } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';

// Public routes accessible without authentication
export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    // TODO: Implement RegisterForm component
    element: <div>Register Form</div>,
  },
];

// Protected routes that require authentication
export const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/payments',
    element: (
      <ProtectedRoute>
        <div>Payments</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <div>Profile</div>
      </ProtectedRoute>
    ),
  },
];

// Root routes configuration
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <div>Dashboard</div>
          </ProtectedRoute>
        ),
      },
      ...publicRoutes,
      ...protectedRoutes,
    ],
  },
];

export default routes;