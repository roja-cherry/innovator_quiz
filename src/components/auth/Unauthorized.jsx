import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaArrowLeft, FaHome, FaShieldAlt } from "react-icons/fa";

export const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const requiredRole = location.state?.requiredRole || "";
  const attemptedPath = location.state?.from?.pathname || " this page";

  return (
    <div className="d-flex min-vh-100 bg-light">
      <div className="m-auto p-4 w-md-50 w-sm-100">
        <div className="card border-0 shadow-sm overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-danger bg-gradient bg-opacity-10 p-4 border-bottom">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <FaLock className="text-danger" size={28} />
              <h1 className="h4 mb-0 text-dark fw-bold">
                Authorization Required
              </h1>
            </div>
          </div>

          <div className="card-body p-4 p-md-5">
            <div className="alert alert-light border mb-4">
              <div className="d-flex gap-2">
                <div className="text-danger">
                  <FaShieldAlt size={20} />
                </div>
                <div>
                  <p className="mb-1 small text-muted">Attempted to access:</p>
                  <code className="d-block text-dark fw-bold bg-white p-2 rounded">
                    {window.location.origin}
                    {attemptedPath}
                  </code>
                </div>
              </div>
            </div>


            {/* Action buttons */}
            <div className="d-grid gap-3 mt-4">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2"
              >
                <FaArrowLeft /> Back to Safety
              </button>
              <button
                onClick={() => navigate("/")}
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2"
              >
                <FaHome /> Go Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="small text-center text-muted mt-4 mb-0">
          Need elevated access? Contact your system administrator.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
