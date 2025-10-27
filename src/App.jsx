import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Interviews from './pages/Interviews';
import Analytics from './pages/Analytics';
import Unauthorized from './pages/Unauthorized';

// Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Framewise Clone
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A modern authentication and role-based access control system
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="/login"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </a>
          
          <a
            href="/signup"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with Dashboard Layout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Dashboard />} />
        </Route>
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Profile />} />
        </Route>
        
        <Route 
          path="/interviews" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Interviews />} />
        </Route>
        
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Analytics />} />
        </Route>

        {/* Admin Only Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Admin Panel
                  </h1>
                  <p className="text-gray-600">
                    Admin-only features will be implemented here.
                  </p>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />

        {/* Manager Routes */}
        <Route 
          path="/manager" 
          element={
            <ProtectedRoute allowedRoles={['manager', 'admin']}>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Manager Panel
                  </h1>
                  <p className="text-gray-600">
                    Manager features will be implemented here.
                  </p>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
