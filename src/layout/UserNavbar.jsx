import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { USER_ROLES } from "../utilities";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export const UserNavbar = () => {
  const { user,logout } = useAuth();
  const { title } = useAppContext();

  return (
    <nav className="navbar navbar-expand bg-white shadow-sm py-3 px-5 fixed-top">
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center w-100 gap-2 gap-md-0">
          <span className="navbar-brand fw-bold fs-4 me-md-4 mb-0">
            {title}
          </span>
          
        </div>

        <div className="dropdown">
          <button
            className="btn w-100 py-3 dropdown-toggle d-flex align-items-center justify-content-between text-decoration-none"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>
              <FaUserCircle className="me-2" size={20} />
              <span className="d-none d-sm-inline">{user?.username}</span>
            </span>
          </button>

          <ul
            className="dropdown-menu dropdown-menu-end shadow-sm w-100 px-2 mb-2"
            aria-labelledby="userDropdown"
          >
    
            <li>
              <button
                className="dropdown-item d-flex align-items-center text-danger"
                onClick={logout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
