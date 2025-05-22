import React, { useState } from "react";
import { getProfile, otpRequest, verifyOtp } from "../../api/apiService";
import { Spinner } from "../common/Spinner";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../../utilities";

export const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    // const companyEmailRegex = /^[a-zA-Z0-9._%+-]+@ibsplc\.com$/;
    // if (!companyEmailRegex.test(email)) {
    //     setError("Invalid email")
    //     return
    // }
    setLoading(true);
    try {
      const res = await otpRequest(email);
      toast.success(res?.data);
      setStep(2);
    } catch (err) {
      const errorMessage = err.response?.data?.message ?? err?.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4 || isNaN(otp)) {
      setError("Enter a valid 4-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({ email, code: otp });
      localStorage.setItem("token", res?.data);
      const userResponse = await getProfile();
      setUser(userResponse?.data);
      if (userResponse?.data?.role === USER_ROLES.ADMIN) {
        return navigate("/");
      } else {
        navigate("/userhome");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message ?? err?.message;
      setError(errorMessage);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4 rounded"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="mb-4 text-center">
          {step === 1 ? "Login with Email" : "Enter OTP"}
        </h4>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="text-danger">{error}</p>}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              <span className="me-3">Send OTP</span>
              {loading && <Spinner size="20px" />}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter 4-digit OTP
              </label>
              <input
                type="text"
                id="otp"
                className="form-control text-center fs-4"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/, "").slice(0, 4))
                }
                required
                maxLength={4}
                inputMode="numeric"
              />
              {error && <p className="text-danger">{error}</p>}
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              <span className="me-3">Verify OTP</span>
              {loading && <Spinner size="20px" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
