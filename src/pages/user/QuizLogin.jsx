import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../components/common/Spinner";
import {
  getAttemptByUserIdAndScheduleId,
  getScheduleForParticipant,
  participantLogin,
} from "../../api/apiService";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import QuizAlreadyAttempted from "./QuizAlreadyAttempted";
import { useAuth } from "../../context/AuthContext";

export const QuizLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [schedule, setSchedule] = useState({});
  const [quizAttempted, setQuizAttempted] = useState(false);
  const { setUser } = useAuth();
  // const { setUser } = useAuth(USER_ROLES.PARTICIPANT);

  const validateFields = () => {
    const companyEmailRegex = /^[a-zA-Z0-9._%+-]+@ibsplc\.com$/;
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;

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

    if (!usernameRegex.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must contain only letters and numbers",
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
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
      const response = await participantLogin(id, { email, username });
      setUser(response?.data);
      localStorage.setItem("user", JSON.stringify(response?.data));
      if (id) {
        checkQuizAttemptedOrNot(response?.data);
      } else {
        navigate("/userhome");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message ?? err?.message;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const checkQuizAttemptedOrNot = async (user) => {
    try {
      const response = await getAttemptByUserIdAndScheduleId(user?.userId, id);
      if (response?.data) {
        setQuizAttempted(response?.data);
        toast.error("Already attempted quiz");
        return;
      }
      // navigate(`/start/${schedule?.id}`, { replace: true });
    } catch (error) {
      if (error?.status === 404) {
        // setUser(user);
        navigate(`/start/${id}`, { replace: true });
      }
      if (error?.status != 404) {
        const errorMessage = err.response?.data?.message ?? err?.message;
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getScheduleForParticipant(id)
        .then((res) => setSchedule(res?.data))
        .catch((err) => {
          const errorMessage = err.response?.data?.message ?? err?.message;
          toast.error(errorMessage);
        });
    }
  }, []);

  if (quizAttempted)
    return <QuizAlreadyAttempted attemptId={quizAttempted?.id} />;

  return (
    <div className="d-flex bg-light" style={{ height: "90vh" }}>
      <div className="m-auto" style={{ maxWidth: "35rem", width: "100%" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <h2 className="fw-bold text-primary m-0">
                {id ? schedule?.quiz?.quizName : "Login"}
              </h2>
              {id && (
                <p className="mt-2">
                  <span className="text-muted">
                    Duration: {schedule?.quiz?.timer} mins
                  </span>
                </p>
              )}
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
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors?.username && (
                  <p className="text-danger">{errors?.username}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center"
              >
                <span className="me-3">Login</span>
                {isLoading && <Spinner size="20px" />}
              </button>

              {!id && (
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link text-primary fw-semibold p-0"
                    onClick={() => navigate("/admin-login")}
                  >
                    Go to Admin Login
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
