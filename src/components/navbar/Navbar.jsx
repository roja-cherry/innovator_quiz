import { useState } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { APP_URLS } from "../../utilities";

const Navbar = () => {
  const adminUrls = [
    {
      text: "Dashboard",
      path: "/",
    },
    {
      text: "Quiz Management",
      path: "/admin/quiz-management",
    },
    {
      text: APP_URLS['publish']?.text,
      path: APP_URLS['publish']?.url,
    },
  ];

  const [urls, setUrls] = useState(adminUrls);

  return (
    <nav className="navbar bg-body-tertiary_ bg-primary navbar-expand-lg">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {urls.map((url) => (
              <li className="nav-item" key={url?.text}>
                <NavLink
                  to={url?.path}
                  className="nav-link"
                  aria-current="page"
                >
                  {url?.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
