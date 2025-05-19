import { useNavigate } from "react-router-dom";
import "./NotFound.scss";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-not-found-container">
      <div className="admin-not-found-content">
        <div className="error-header">
          <div className="error-icon">
            <FiAlertTriangle />
          </div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </div>

        <p className="error-description">
          The requested page is unavailable - it may have been moved or you
          don't have access.
        </p>

        <div className="error-actions">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Go Back
          </button>
        </div>

        <div className="error-illustration">
          <div className="file-cabinet">
            <div className="drawer"></div>
            <div className="drawer"></div>
            <div className="drawer"></div>
            <div className="missing-file">
              <div className="file-tab"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
