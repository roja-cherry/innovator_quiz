import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingScreen } from "../common/LoadingScreen";
import { useAuth } from "../../context/AuthContext";

export const PrivateRoute = ({ role = "" }) => {
  const { user } = useAuth();
  const location = useLocation();

  // if (loading) {
  //   return <LoadingScreen /> // Show while checking auth state
  // }

  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  if (user && user?.role !== role) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location, requiredRole: role }}
        replace
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
