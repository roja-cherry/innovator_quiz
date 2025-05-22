import React from "react";
import { Outlet } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";
import { AuthProvider } from "../hooks/useAuth";
import { USER_ROLES } from "../utilities";

export const UserLayout = () => {
  return (
    <AuthProvider role={USER_ROLES.PARTICIPANT}>
      <UserNavbar />
      <main style={{minHeight: "90vh"}}>
        <Outlet />
      </main>
    </AuthProvider>
  );
};
