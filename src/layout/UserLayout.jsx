import React, { useEffect } from "react";
import { Outlet, replace, useNavigate } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";
import { useAuth } from "../context/AuthContext";
import { USER_ROLES } from "../utilities";

export const UserLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user?.role !== USER_ROLES.PARTICIPANT)
      return navigate("/", { replace: true });
  }, [user?.role]);

  if(user?.role === USER_ROLES.PARTICIPANT)
  return (
    <>
      <UserNavbar />
      <main style={{ minHeight: "90vh" }}>
        <Outlet />
      </main>
    </>
  );
};
