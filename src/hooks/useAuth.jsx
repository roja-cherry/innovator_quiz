import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../utilities";
import { getProfile } from "../api/apiService";

export const useAuth = (role = "ADMIN") => {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState({
    user: null,
    loading: true, // Start with loading true
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
    const loadAuthData = async () => {
      const baseState = { loading: false };

      // Admin flow
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

      // Participant flow
      if (role === USER_ROLES.PARTICIPANT) {
        const user = JSON.parse(localStorage.getItem("user"));
        return setAuthState({ user, ...baseState, error: false });
      }
    };

    loadAuthData();
  }, [role]); // Add role as dependency

  const getUserProfile = async () => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    const isConfirmed = confirm("Are you sure to logout?");
    if (!isConfirmed) return;
    setAuthState({ user: null, loading: false });
    localStorage.clear();
    navigate("/login", {replace: true})
  };

  return {
    ...authState,
    isAuthenticated,
    hasRole,
    logout
  };
};
