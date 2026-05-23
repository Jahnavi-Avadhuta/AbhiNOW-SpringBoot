import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole]   = useState(localStorage.getItem('role'));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            email: decoded.sub,
            name:  localStorage.getItem('name'),
            role:  localStorage.getItem('role'),
          });
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const loginUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name',  data.name);
    localStorage.setItem('role',  data.role);
    setToken(data.token);
    setRole(data.role);
    setUser({ email: data.email, name: data.name, role: data.role });
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setRole(null);
  };

  const updateRole = (newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
    setUser(prev => ({ ...prev, role: newRole }));
  };

  return (
    <AuthContext.Provider value={{
      user, token, role, loginUser, logout, updateRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);