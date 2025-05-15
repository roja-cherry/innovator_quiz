import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { AppSidebar } from "../components/navbar/AppSidebar";

const Layout = () => {
  return (
    <AppSidebar>
      <main className="flex-1">
        {/* <Navbar /> */}
        <Outlet />
      </main>
    </AppSidebar>
  );
  return <></>;
};

export default Layout;
