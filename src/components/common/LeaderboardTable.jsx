// LeaderboardTable.js
import React from "react";
import { formatToDateTimeString } from "../../utilities";
import { useNavigate } from "react-router-dom";

export const LeaderboardTable = ({ title = "", data = [] }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="container py-5" style={{ marginTop: "6rem" }}>
        <div className="text-center">
          <h2 className="fw-light mb-1">{title}</h2>
          <div
            className="border-top border-3 border-primary mx-auto mb-4"
            style={{ width: "80px" }}
          ></div>
          <div className="leaderboard-status">No data available</div>
        </div>
      </div>
    );
  }

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
                  {data.map((user, index) => (
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
                        {user.totalScore != null
                          ? user.totalScore.toLocaleString()
                          : "0"}
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

          <div>
            <button
              className="btn btn-primary w-100 mt-4"
              onClick={() => navigate("/userhome")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
