import { useEffect, useState } from "react";
import "./AdminLayout.scss";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAppContext } from "../context/AppContext";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

export const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { title } = useAppContext();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="admin-layout">
      <aside
        className={`sidebar shadow-sm bg-white ${isSidebarOpen ? "open" : ""}`}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img src="/logo.png" alt="logo" style={{ width: "3rem" }} />
            <h4 className="d-none d-md-block mt-2">IQ Quiz</h4>
          </div>
          <IoMdClose
            className="d-md-none cursor-pointer"
            style={{ fontSize: "2rem" }}
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <Sidebar onMenuClick={() => setSidebarOpen(false)} />
      </aside>

      <div className="content">
        <nav className="navbar py-3 pe-5">
          <div className="container-fluid px-0">
            <div className="d-flex align-items-center">
              <CgMenuRight
                onClick={toggleSidebar}
                className="d-md-none ms-5 cursor-pointer"
                style={{ fontSize: "1.5rem" }}
              />
              <h2 className="ms-4 ms-md-5 text-grey">{title}</h2>
            </div>
            <div className="d-md-none">
              <img src="/logo.png" alt="logo" style={{ width: "3rem" }} />
            </div>
          </div>
        </nav>
        <main className="px-5 py-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
