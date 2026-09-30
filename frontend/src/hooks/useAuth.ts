import { useState, useEffect, useCallback } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('adminToken'));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('adminToken'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setToken(null);
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
}
