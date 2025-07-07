// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function History() {
  const { postId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:8008/history/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Error cargando historial", err);
      }
    };

    fetchHistory();
  }, [postId]);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Historial de Ediciones</h2>
      {history.length === 0 ? (
        <p>No hay historial para este post.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Título</th>
              <th className="border px-2 py-1">Contenido</th>
              <th className="border px-2 py-1">Editado por</th>
              <th className="border px-2 py-1">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id_history}>
                <td className="border px-2 py-1">{item.title}</td>
                <td className="border px-2 py-1">{item.content}</td>
                <td className="border px-2 py-1">{item.edited_by}</td>
                <td className="border px-2 py-1">{new Date(item.edited_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
