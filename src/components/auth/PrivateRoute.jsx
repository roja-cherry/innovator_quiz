import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../common/LoadingScreen";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/apiService";
import toast from "react-hot-toast";

export const PrivateRoute = ({ role = "" }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      try {
        const response = await getProfile();
        setUser(response?.data);
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    
    const token = localStorage.getItem("token");
    if (token) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <LoadingScreen />; 
  }

  if(!loading && user)
    return <Outlet />
};
