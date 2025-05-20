import React from "react";
import { Outlet } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";

export const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <main style={{minHeight: "90vh"}}>
        <Outlet />
      </main>
    </>
  );
};
