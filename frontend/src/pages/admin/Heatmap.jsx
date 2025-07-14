import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Heatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [error, setError] = useState(null);

  const fetchHeatmap = async () => {
    try {
      const res = await fetch("http://localhost:8023/activity/heatmap");
      if (!res.ok) throw new Error("Error al obtener la actividad");
      const data = await res.json();
      setHeatmapData(data);
    } catch (err) {
      console.error("❌ Error:", err.message);
      setError("No se pudo cargar el heatmap.");
    }
  };

  useEffect(() => {
    fetchHeatmap();
  }, []);

  if (error) return <div className="text-red-500 p-2">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Actividad diaria (Posts y Comentarios)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={heatmapData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="posts" stroke="#1f77b4" name="Posts" />
          <Line type="monotone" dataKey="comments" stroke="#ff7f0e" name="Comentarios" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Heatmap;
