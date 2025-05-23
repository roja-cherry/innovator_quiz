import React, { useEffect, useState } from "react";
import { getAllLeaderboard } from "../../api/apiService"; // You'll need to create this API function
import { LeaderboardTable } from "../../components/common/LeaderboardTable";

export const GlobalLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await getAllLeaderboard(); // This would fetch all results
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
    return <div className="leaderboard-status loading">Loading leaderboard...</div>;
  }

  return (
    <LeaderboardTable 
      data={leaderboardData} 
      title="Global Leaderboard"
    />
  );
};