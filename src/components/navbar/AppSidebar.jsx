import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";

export const adminUrls = [
  {
    text: "Dashboard",
    path: "/",
  },
  {
    text: "Quiz Management",
    path: "/admin/quiz-management",
  },
  {
    text: "Schedule",
    path: "/admin/schedule",
  },
];

export function AppSidebar({ children }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const { title } = useAppContext();

  useEffect(() => {
    console.log(title);
    
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex overflow-hidden">
      <div
        className={`sidebar ${isOpen ? "open" : "closed"} d-flex flex-column`}
      >
        <div className="p-3 border-bottom d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="logo"
              style={{ width: "3rem" }}
            />
          </Link>
          <h3 className="m-0 ms-3">IQ Quiz</h3>
        </div>
        <nav className="nav flex-column p-2 mt-4">
          {adminUrls.map((url) => (
            <NavLink
              to={url.path}
              className={({ isActive }) =>
                `d-block px-4 py-3 text-nowrap rounded font-medium text-decoration-none ${
                  isActive ? "bg-primary text-white" : "text-dark"
                }`
              }
            >
              {url.text}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content flex-grow-1_ flex-1 w-100">
        <div
          className="d-flex align-items-center bg-light p-3 shadow-sm"
          style={{ height: "5rem" }}
        >
          <button
            className="btn btn-outline-primary d-md-none ms-4"
            onClick={toggleSidebar}
          >
            <RxHamburgerMenu />
          </button>
          <h4 className="m-0 ms-4">{title}</h4>
        </div>

        {/* Body */}
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
