// src/admin/Metrics.jsx
import React, { useEffect, useState } from "react";

const Metrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("http://localhost:8020/metrics/summary");
        if (!res.ok) throw new Error("Error fetching metrics");
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("❌ Failed to load metrics:", err);
        setError("Error loading metrics.");
      }
    };

    fetchMetrics();
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!metrics) {
    return <div className="p-4">Loading metrics...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Platform Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-2xl text-center">
          <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.total_posts}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl text-center">
          <h3 className="text-lg font-semibold mb-2">Total Replies</h3>
          <p className="text-3xl font-bold text-green-600">{metrics.total_replies}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl text-center">
          <h3 className="text-lg font-semibold mb-2">Total Reactions</h3>
          <p className="text-3xl font-bold text-purple-600">{metrics.total_reactions}</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
