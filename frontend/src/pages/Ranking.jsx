import React, { useEffect, useState } from "react";

const RANKING_API_BASE = "http://localhost:8019";

const Ranking = () => {
  const [rankingType, setRankingType] = useState("reputation");
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRanking = async (type) => {
    setLoading(true);
    let url = `${RANKING_API_BASE}/rankings`;
    if (type === "posts") url += "/posts";
    else if (type === "likes") url += "/likes";

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRankingData(data);
    } catch (err) {
      console.error("Failed to fetch rankings:", err);
      setRankingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking(rankingType);
  }, [rankingType]);

  const renderTable = () => {
    if (rankingData.length === 0) return <p>No data available.</p>;

    return (
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Posts</th>
            <th className="px-4 py-2">Replies</th>
            <th className="px-4 py-2">Likes</th>
            <th className="px-4 py-2">Reputation</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((user, index) => (
            <tr key={user.user_id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.user_id}</td>
              <td className="px-4 py-2">{user.post_count}</td>
              <td className="px-4 py-2">{user.reply_count}</td>
              <td className="px-4 py-2">{user.likes_received}</td>
              <td className="px-4 py-2">{user.reputation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🏆 User Rankings</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setRankingType("reputation")}
          className={`px-4 py-2 rounded ${
            rankingType === "reputation" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Top Reputation
        </button>
        <button
          onClick={() => setRankingType("posts")}
          className={`px-4 py-2 rounded ${
            rankingType === "posts" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Top Posts
        </button>
        <button
          onClick={() => setRankingType("likes")}
          className={`px-4 py-2 rounded ${
            rankingType === "likes" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Top Likes
        </button>
      </div>

      {loading ? <p>Loading rankings...</p> : renderTable()}
    </div>
  );
};

export default Ranking;
