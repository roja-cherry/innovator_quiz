// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../utilities';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true
  });


  useEffect(() => {
    // Check for participant in localStorage on initial load
    const participant = localStorage.getItem('user');
    if (participant) {
      setAuthState({
        user: JSON.parse(participant),
        loading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const setUser = (userData) => {
    setAuthState({
      user: userData,
      loading: false
    });
    // For admin, token is already in localStorage
  };

  const logout = () => {
    if (authState.user?.role === USER_ROLES.ADMIN) {
      localStorage.removeItem('token');
    } else {
      localStorage.removeItem('user');
    }
    setAuthState({ user: null, loading: false });
    window.location.href="/login"
  };

  const isAuthenticated = () => {
    if (authState.user?.role === USER_ROLES.ADMIN) {
      return !!localStorage.getItem('token');
    }
    return !!authState.user;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUser,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);