// LeaderboardTable.js
import React from "react";
import { formatToDateTimeString } from "../../utilities";

<<<<<<< HEAD:src/pages/user/Leaderboard.jsx
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scheduleId } = useParams();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await getLeaderBoard(scheduleId); // Added await here
        setLeaderboardData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [scheduleId]);

  if (loading) {
    return (
      <div className="leaderboard-status loading">Loading leaderboard...</div>
    );
  }

  // if (!leaderboardData || leaderboardData.length === 0) {
  //   return <div className="leaderboard-status">No data available</div>;
  // }
=======
export const LeaderboardTable = ({ data, title, updatedAt }) => {
  if (!data || data.length === 0) {
    return <div className="leaderboard-status">No data available</div>;
  }
>>>>>>> 8ff3955 (added leaderboard for all quizzes and also added top 10 leaderboard for each quizzes):src/components/common/LeaderboardTable.jsx

  return (
    <div className="container py-5" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h2 className="fw-light mb-1">{title}</h2>
            <div
              className="border-top border-3 border-primary mx-auto"
              style={{ width: "80px" }}
            ></div>
          </div>

          <div className="bg-white rounded-3 shadow-sm">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr className="border-bottom-0">
                    <th scope="col" className="ps-4 text-muted fw-normal">
                      Rank
                    </th>
                    <th scope="col" className="text-muted fw-normal">
                      Player
                    </th>
                    <th
                      scope="col"
                      className="pe-4 text-end text-muted fw-normal"
                    >
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
<<<<<<< HEAD:src/pages/user/Leaderboard.jsx
                  {leaderboardData.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                  {leaderboardData.map((user, index) => (
=======
                  {data.map((user, index) => (
>>>>>>> 8ff3955 (added leaderboard for all quizzes and also added top 10 leaderboard for each quizzes):src/components/common/LeaderboardTable.jsx
                    <tr
                      key={user.userId}
                      className={index < 3 ? "border-bottom-0" : ""}
                    >
                      <td className="ps-4 align-middle">
                        <span
                          className={`d-inline-flex align-items-center justify-content-center rounded-circle 
                            ${
                              index === 0
                                ? "bg-primary text-white"
                                : index === 1
                                ? "bg-secondary text-white"
                                : index === 2
                                ? "bg-success text-white"
                                : "bg-light"
                            } 
                            fw-medium`}
                          style={{ width: "32px", height: "32px" }}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <div className="fw-medium">{user.userName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="pe-4 text-end align-middle fw-medium">
                        {user.totalScore.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-4">
            <small className="text-muted">
              Updated {updatedAt || formatToDateTimeString(new Date())}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};