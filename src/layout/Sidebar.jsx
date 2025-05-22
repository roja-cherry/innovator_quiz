import React from "react";
import { LuCalendarClock } from "react-icons/lu";
import { RiListCheck3 } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { USER_ROLES } from "../utilities";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export const adminUrls = [
  {
    text: "Dashboard",
    path: "/",
    icon: RxDashboard,
  },
  {
    text: "Quiz Management",
    path: "/admin/quiz-management",
    icon: RiListCheck3,
  },
  {
    text: "Schedule",
    path: "/admin/schedule",
    icon: LuCalendarClock,
  },
];

export const Sidebar = ({ onMenuClick = () => {} }) => {
  const { user, logout } = useAuth(USER_ROLES.ADMIN);

  return (
    <div>
      <ul
        className="nav flex-column mt-4"
        style={{ height: "80vh", overflow: "scroll" }}
      >
        {adminUrls.map((url) => {
          const Icon = url.icon;
          return (
            <NavLink
              key={url?.path}
              to={url.path}
              className={({ isActive }) =>
                `nav-link fw-normal d-block px-4 py-3 mt-1 text-nowrap rounded font-medium text-decoration-none ${
                  isActive ? "active text-primary" : "text-dark"
                }`
              }
              onClick={onMenuClick}
            >
              <span className="me-3">
                {url?.icon && <Icon style={{ fontSize: "1.5rem" }} />}
              </span>
              <span>{url.text}</span>
            </NavLink>
          );
        })}
      </ul>

      <div className="dropdown">
        <button
          className="btn btn-primary w-100 py-3 dropdown-toggle d-flex align-items-center justify-content-between text-decoration-none"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span>
            <FaUserCircle className="me-2" size={20} />
            <span className="d-none d-sm-inline">{user?.username}</span>
          </span>
          <FiChevronDown className="ms-1" size={16} />
        </button>

        <ul
          className="dropdown-menu dropdown-menu-end shadow-sm w-100 px-2 mb-2"
          aria-labelledby="userDropdown"
        >
          <li className="px- py-2">
            <div className="d-flex align-items-center">
              <FaUserCircle className="me-2 text-primary" size={32} />
              <div>
                <h6 className="mb-0">{user?.username}</h6>
              </div>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider my-2" />
          </li>
          <li>
            <div>
              <small className="text-muted">Email</small> <br />
              <small className="text-primary fw-semibold">{user?.email}</small>
            </div>
            <div className="mt-2">
              <small className="text-muted">Role</small> <br />
              <small className="text-primary fw-semibold">
                {user?.roleText}
              </small>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider my-2" />
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={logout}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
