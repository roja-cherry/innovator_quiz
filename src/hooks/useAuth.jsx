import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true, // Start with loading true
    error: null,
  });

  // Simplified check for token
  const isAuthenticated = useCallback(() => {
    return !!authState.user;
  }, [authState.user]);

  const hasRole = useCallback(
    (role) => {
      return authState.user?.role === role;
    },
    [authState.user]
  );

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate token validation
      setTimeout(() => {
        setAuthState({
          user: {
            id: "123",
            username: "Admin User",
            role: "ADMIN",
            token: token,
          },
          loading: false,
          error: null,
        });
      }, 500);
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return {
    ...authState,
    isAuthenticated,
    hasRole,
  };
};
