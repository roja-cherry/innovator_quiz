import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { formatToDateTimeString } from "../../utilities";
import { getGlobalLeaderBoard } from "../../api/apiService"; // Add this API call

const GlobalLeaderboard = () => {
=======
import { LeaderboardTable } from "../../components/common/LeaderboardTable";
import { getAllLeaderboard } from "../../api/apiService";

export const GlobalLeaderboard = () => {
>>>>>>> 8ff3955 (added leaderboard for all quizzes and also added top 10 leaderboard for each quizzes)
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
<<<<<<< HEAD
        const response = await getGlobalLeaderBoard(); // Call global leaderboard API
=======
        const response = await getAllLeaderboard() // This would fetch all results
>>>>>>> 8ff3955 (added leaderboard for all quizzes and also added top 10 leaderboard for each quizzes)
        setLeaderboardData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
<<<<<<< HEAD
    return (
      <div className="leaderboard-status loading">Loading leaderboard...</div>
    );
  }

  return (
    <div className="container py-5" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h2 className="fw-light mb-1">Global Leaderboard</h2>
            <div
              className="border-top border-3 border-primary mx-auto"
              style={{ width: "100px" }}
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
                  {leaderboardData.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                  {leaderboardData.map((user, index) => (
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
              Updated {formatToDateTimeString(new Date())}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
=======
    return <div className="leaderboard-status loading">Loading leaderboard...</div>;
  }

  return (
    <LeaderboardTable 
      data={leaderboardData} 
      title="Global Leaderboard"
    />
  );
};
>>>>>>> 8ff3955 (added leaderboard for all quizzes and also added top 10 leaderboard for each quizzes)
