import React, { useEffect, useState } from "react";

const SyncLogs = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    lms_name: "",
    status: "success",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:8042/sync");
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Error loading sync logs", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8042/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al registrar la sincronización");

      setMessage("✅ Sincronización registrada correctamente");
      setFormData({ lms_name: "", status: "success", details: "" });
      fetchLogs();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error al registrar sincronización");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">LMS Sync Logs</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 mb-6 rounded space-y-4">
        <div>
          <label className="block font-medium">LMS Name</label>
          <input
            type="text"
            name="lms_name"
            value={formData.lms_name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="e.g. Moodle"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            rows={3}
            placeholder="Detalles de la sincronización"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar Sincronización"}
        </button>

        {message && <div className="mt-2 text-sm">{message}</div>}
      </form>

      <h3 className="text-xl font-semibold mb-2">Historial</h3>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">LMS</th>
            <th className="text-left px-4 py-2">Estado</th>
            <th className="text-left px-4 py-2">Fecha</th>
            <th className="text-left px-4 py-2">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.id}</td>
              <td className="px-4 py-2">{log.lms_name}</td>
              <td className={`px-4 py-2 ${log.status === "success" ? "text-green-600" : "text-red-600"}`}>
                {log.status}
              </td>
              <td className="px-4 py-2">{new Date(log.synced_at).toLocaleString()}</td>
              <td className="px-4 py-2">{log.details || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SyncLogs;
