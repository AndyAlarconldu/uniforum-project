import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TopTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const res = await fetch("http://localhost:8021/top-tags");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error("❌ Error al obtener los top tags:", err);
      }
    };

    fetchTopTags();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Top 10 Most Used Tags</h2>
      {topics.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tag" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No tag data available</p>
      )}
    </div>
  );
};

export default TopTopics;
