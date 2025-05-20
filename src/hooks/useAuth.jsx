import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../utilities";

export const useAuth = (role = "ADMIN") => {
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
    if (role === USER_ROLES.ADMIN) {
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
    } else if (role === USER_ROLES.PARTICIPANT) {
      const user = JSON.parse(localStorage.getItem("user"));
      setAuthState({
        user: user,
        loading: false,
        error: false,
      });
    }
  }, []);

  return {
    ...authState,
    isAuthenticated,
    hasRole,
  };
};
