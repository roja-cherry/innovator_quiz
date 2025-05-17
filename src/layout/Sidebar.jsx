import React from "react";
import { NavLink } from "react-router-dom";
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

export const Sidebar = ({onMenuClick = () => {}}) => {
  return (
    <>
      <ul className="nav flex-column mt-4">
        {adminUrls.map((url) => (
          <NavLink
            key={url?.path}
            to={url.path}
            className={({ isActive }) =>
              `nav-link d-block px-4 py-3 mt-1 text-nowrap rounded font-medium text-decoration-none ${
                isActive ? "bg-primary text-white" : "text-dark"
              }`
            }
            onClick={onMenuClick}
          >
            {url.text}
          </NavLink>
        ))}
      </ul>
    </>
  );
};
