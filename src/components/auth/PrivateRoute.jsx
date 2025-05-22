import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { getProfile } from "../../api/apiService";
import toast from "react-hot-toast";
import { USER_ROLES } from "../../utilities";

export const PrivateRoute = ({ role = "" }) => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const authenticateUser = async () => {
      if (role === USER_ROLES.ADMIN) {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const response = await getProfile();
          setUser(response?.data);
        } catch (error) {
          toast.error("Failed to fetch admin details");
          localStorage.removeItem("token");
        }
      }
    };

    // Only fetch admin profile if no user exists and route requires admin
    if (!user && role === USER_ROLES.ADMIN) {
      authenticateUser();
    }
  }, [role, setUser, user]);

  // Get participant from localStorage if exists
  const participant = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // If route requires admin but no token exists
  if (role === USER_ROLES.ADMIN && !localStorage.getItem("token")) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // If route requires participant but no user in localStorage
  if (role === USER_ROLES.PARTICIPANT && !participant) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists but role doesn't match required role
  if (user?.role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // For participant routes, use the localStorage user if no user in context
  if (role === USER_ROLES.PARTICIPANT && !user && participant) {
    return <Outlet />;
  }

  // For all valid cases
  return <Outlet />;
};
