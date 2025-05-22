// authContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from '../utilities';
import { getProfile } from '../api/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children, role = "ADMIN" }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
  });

  const isAuthenticated = useCallback(() => {
    return !!authState.user;
  }, [authState.user]);

  const hasRole = useCallback(
    (role) => {
      return authState.user?.role === role;
    },
    [authState.user]
  );

  useEffect(() => {
    const loadAuthData = async () => {
      const baseState = { loading: false };

      if (role === USER_ROLES.ADMIN) {
        const token = localStorage.getItem("token");
        if (!token) return setAuthState((prev) => ({ ...prev, ...baseState }));

        try {
          const user = await getUserProfile();
          return setAuthState({ user, ...baseState });
        } catch {
          return setAuthState((prev) => ({ ...prev, ...baseState }));
        }
      }

      if (role === USER_ROLES.PARTICIPANT) {
        const user = JSON.parse(localStorage.getItem("user"));
        return setAuthState({ user, ...baseState, error: false });
      }
    };

    loadAuthData();
  }, [role]);

  const getUserProfile = async () => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const setUser = (user) => {
    setAuthState(prev => ({
      ...prev,
      user,
      loading: false
    }));
  };

  const logout = () => {
    const isConfirmed = confirm("Are you sure to logout?");
    if (!isConfirmed) return;
    setAuthState({ user: null, loading: false });
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isAuthenticated,
        hasRole,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};