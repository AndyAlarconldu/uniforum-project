// src/pages/admin/ConfigManagement.jsx
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8022/config";

const ConfigManagement = () => {
  const [configs, setConfigs] = useState([]);
  const [newConfig, setNewConfig] = useState({ key: "", value: "" });
  const [editValues, setEditValues] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchConfigs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

     if (Array.isArray(data)) {
      setConfigs(data);
        } else {
      console.error("❌ No se obtuvo un array:", data);
      setConfigs([]); // o set a estado de error si tienes uno
    }
        } catch (err) {
        console.error("❌ Error al obtener configuraciones:", err);
        setConfigs([]); // previene más errores
  }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newConfig.key || !newConfig.value) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setNewConfig({ key: "", value: "" });
        fetchConfigs();
      }
    } catch (err) {
      console.error("❌ Error al crear configuración:", err);
    }
  };

  const handleUpdate = async (key) => {
    if (!editValues[key]) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: editValues[key], key }),
      });
      if (res.ok) {
        fetchConfigs();
        setEditValues((prev) => ({ ...prev, [key]: "" }));
      }
    } catch (err) {
      console.error("❌ Error al actualizar configuración:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Configuraciones del Sistema</h2>

      <form onSubmit={handleCreate} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Clave"
          value={newConfig.key}
          onChange={(e) => setNewConfig({ ...newConfig, key: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Valor"
          value={newConfig.value}
          onChange={(e) => setNewConfig({ ...newConfig, value: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear
        </button>
      </form>

      <div className="space-y-4">
        {configs.map((cfg) => (
          <div
            key={cfg.id_config}
            className="p-4 border rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          >
            <div>
              <p className="font-semibold">{cfg.key}</p>
              <p className="text-sm text-gray-500">
                Última modificación: {new Date(cfg.updated_at).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={editValues[cfg.key] ?? cfg.value}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, [cfg.key]: e.target.value }))
                }
                className="border p-2 rounded w-48"
              />
              <button
                onClick={() => handleUpdate(cfg.key)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                disabled={loading}
              >
                Guardar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigManagement;
