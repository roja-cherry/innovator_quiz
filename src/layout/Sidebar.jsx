import React from "react";
import { LuCalendarClock } from "react-icons/lu";
import { RiListCheck3 } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";

export const adminUrls = [
  {
    text: "Dashboard",
    path: "/",
    icon: RxDashboard,
  },
  {
    text: "Quiz Management",
    path: "/admin/quiz-management",
    icon: RiListCheck3
  },
  {
    text: "Schedule",
    path: "/admin/schedule",
    icon: LuCalendarClock
  },
];

export const Sidebar = ({ onMenuClick = () => {} }) => {
  return (
    <>
      <ul className="nav flex-column mt-4">
        {adminUrls.map((url) => {
          const Icon = url.icon
          return (
            <NavLink
              key={url?.path}
              to={url.path}
              className={({ isActive }) =>
                `nav-link fw-normal d-block px-4 py-3 mt-1 text-nowrap rounded font-medium text-decoration-none ${
                  isActive
                    ? "active text-primary"
                    : "text-dark"
                }`
              }
              onClick={onMenuClick}
            >
              <span className="me-3">{url?.icon && <Icon style={{fontSize: "1.5rem"}} />}</span>
              <span>{url.text}</span>
            </NavLink>
          );
        })}
      </ul>
    </>
  );
};
