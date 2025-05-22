import { FaUserCircle } from "react-icons/fa";
import { USER_ROLES } from "../utilities";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

export const UserNavbar = () => {
  const { user } = useAuth();
  const { title } = useAppContext();

  return (
    <nav className="navbar navbar-expand bg-white shadow-sm py-3 px-5 fixed-top">
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center w-100 gap-2 gap-md-0">
          <span className="navbar-brand fw-bold fs-4 me-md-4 mb-0">
            {title}
          </span>
          {user?.email && (
            <div className="ms-md-auto d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <FaUserCircle className="text-primary" size={24} />
                <span className="ms-2 d-sm-inline">{user?.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
