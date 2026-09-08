"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe, loginUser, registerUser, logoutUser } from '@/lib/api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'

  const checkAuth = useCallback(async () => {
    try {
      const response = await getMe();
      if (response && response.status === 'success' && response.data) {
        setUser(response.data);
        setStatus('authenticated');
      } else {
        setUser(null);
        setStatus('unauthenticated');
      }
    } catch {
      setUser(null);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    if (response && response.status === 'success' && response.data) {
      setUser(response.data);
      setStatus('authenticated');
      return response.data;
    }
    throw new Error(response?.message || 'Login failed');
  };

  const register = async (email, password) => {
    const response = await registerUser(email, password);
    if (response && response.status === 'success' && response.data) {
      setUser(response.data);
      setStatus('authenticated');
      return response.data;
    }
    throw new Error(response?.message || 'Registration failed');
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore logout errors and clean local auth state anyway
    } finally {
      setUser(null);
      setStatus('unauthenticated');
    }
  };

  return (
    <AuthContext.Provider value={{ user, status, login, register, logout, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
