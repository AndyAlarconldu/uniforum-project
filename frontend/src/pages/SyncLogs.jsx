import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:8042"; // Ajusta si cambia el puerto/IP

const SyncLogs = () => {
  const [syncs, setSyncs] = useState([]);
  const [formData, setFormData] = useState({
    lms_name: "",
    status: "success",
    details: "",
  });

  const fetchSyncs = async () => {
    try {
      const res = await fetch(`${API_BASE}/sync`);
      const data = await res.json();
      setSyncs(data);
    } catch (err) {
      console.error("Error fetching syncs", err);
    }
  };

  useEffect(() => {
    fetchSyncs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error creating sync log");
      setFormData({ lms_name: "", status: "success", details: "" });
      fetchSyncs(); // Refresh
    } catch (err) {
      console.error("Failed to log sync", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">LMS Sync Logs</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="lms_name"
          value={formData.lms_name}
          onChange={handleChange}
          placeholder="LMS Name (e.g., Moodle)"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Optional sync details..."
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Log Sync
        </button>
      </form>

      {/* Historial */}
      <h3 className="text-xl font-semibold mb-2">Historial de sincronizaciones</h3>
      <ul className="space-y-3">
        {syncs.map((s) => (
          <li
            key={s.id}
            className="border rounded p-3 shadow bg-white flex justify-between items-start"
          >
            <div>
              <p className="font-medium">LMS: {s.lms_name}</p>
              <p className={`text-sm ${s.status === "success" ? "text-green-600" : "text-red-600"}`}>
                Estado: {s.status}
              </p>
              <p className="text-gray-700 text-sm">Detalles: {s.details || "Sin detalles"}</p>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(s.synced_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SyncLogs;
