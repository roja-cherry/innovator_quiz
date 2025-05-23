import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeaderBoard } from "../../api/apiService";
import { LeaderboardTable } from "../../components/common/LeaderboardTable";

export const ScheduleLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scheduleId } = useParams();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await getLeaderBoard(scheduleId);
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
    return <div className="leaderboard-status loading">Loading leaderboard...</div>;
  }

  return(
    <LeaderboardTable
    data={leaderboardData}
    title="Quiz Leaderboard"
    />
  )

};