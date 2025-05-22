import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getProfile } from "../../api/apiService";
import toast from "react-hot-toast";
import { USER_ROLES } from "../../utilities";
import { LoadingScreen } from "../common/LoadingScreen";

export const PrivateRoute = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login")
      setIsCheckingAuth(false);
      return;
    }

    const authenticateUser = async () => {
      try {
        const response = await getProfile();
        const userData = response?.data;
        setUser(userData);
        if(userData?.role === USER_ROLES.ADMIN && location.pathname === "/userhome") {
          return navigate("/", {replace: true})
        } else if (userData?.role === USER_ROLES.PARTICIPANT && location.pathname === "/") {
          return navigate("/")
        }
      } catch (error) {
        toast.error(error.message || "Session expired. Please log in again.");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login")
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Only fetch if we don't already have a user
    if (!user) {
      authenticateUser();
    } 
  }, [user, setUser, navigate]);

  // if (isCheckingAuth) {
  //   return <LoadingScreen />;
  // }

  // if (!localStorage.getItem("token")) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // Additional protection for direct URL access
  // if (user) {
  //   if (user.role === USER_ROLES.ADMIN && !location.pathname === "/") {
  //     return <Navigate to="/" replace />;
  //   }
  //   if (user.role === USER_ROLES.PARTICIPANT && !location.pathname === "/userhome") {
  //     return <Navigate to="/userhome" replace />;
  //   }
  // }

  if(isCheckingAuth)
    return <LoadingScreen />

  if(!isCheckingAuth) 
    return <Outlet />;
};