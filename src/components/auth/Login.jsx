import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/common/Spinner";
import { login } from "../../api/apiService";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const companyEmailRegex = /^[a-zA-Z0-9._%+-]+@ibsplc\.com$/;
    let isValid = true;
    if (!companyEmailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid comapany email address",
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateFields()) {
      return;
    }

    try {
      setLoading(true);
      const response = await login({ email, password });
      localStorage.setItem("token", response.data);
      navigate("/", {replace: true})
    } catch (err) {
      const errorMessage = err.response?.data?.message ?? err?.message;
      setErrors((prev) => ({ ...prev, loginError: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex bg-light" style={{ height: "90vh" }}>
      <div className="m-auto" style={{ maxWidth: "35rem", width: "100%" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <h2 className="fw-bold text-primary m-0">Login</h2>
              <p className="text-muted mt-1">Welcome Back!</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  IBS Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@ibsplc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors?.email && (
                  <p className="text-danger">{errors?.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors?.username && (
                  <p className="text-danger">{errors?.username}</p>
                )}
              </div>

              {errors?.loginError && (
                <p className="text-danger">{errors?.loginError}</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center"
              >
                <span className="me-3">Login</span>
                {isLoading && <Spinner size="20px" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
