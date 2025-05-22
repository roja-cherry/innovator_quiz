import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingScreen } from "../common/LoadingScreen";
import {useAuth} from '../../hooks/useAuth'

export const PrivateRoute = ({ roles = [] }) => {
  const { loading, isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen /> // Show while checking auth state
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.some(hasRole)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location, requiredRoles: roles }}
        replace
      />
    );
  }

  return <Outlet />;
};
