import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F4]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1A1A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] text-[#1A1A1A] font-sans">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
