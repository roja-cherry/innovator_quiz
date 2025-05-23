import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";
import { useAuth } from "../context/AuthContext";

export const UserLayout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = () => {
      const userFromLocal = JSON.parse(localStorage.getItem("user"));
      if (userFromLocal?.email && userFromLocal?.userId) {
        setUser(userFromLocal);
      } else {
        navigate("/login");
      }
    };
    
    if (!user) {
      getProfile();
    }
  }, []);
  return (
    <>
      <UserNavbar />
      <main style={{ minHeight: "90vh", paddingTop: "6rem" }}>
        <Outlet />
      </main>
    </>
  );
};
