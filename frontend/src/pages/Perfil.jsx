// src/pages/Perfil.jsx
import React, { useEffect, useState } from "react";

function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No autenticado");
        return;
      }
                                
      try {
        const res = await fetch("http://localhost:8000/perfil/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error al obtener el perfil");
        }

        const data = await res.json();
        setPerfil(data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener el perfil");
      }
    };

    fetchPerfil();
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!perfil) {
    return <div className="p-4">Cargando perfil...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Nombre:</strong> {perfil.first_name} {perfil.last_name}</p>
      <p><strong>Nombre:</strong> {perfil.first_name} {perfil.last_name}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      <p><strong>Fecha de registro:</strong> {new Date(perfil.registration_date).toLocaleDateString()}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Universidad</h3>
        <p><strong>ID:</strong> {perfil.university.id_university}</p>
        <p><strong>Nombre:</strong> {perfil.university.name}</p>
        <p><strong>Ciudad:</strong> {perfil.university.city}</p>
        <p><strong>Tipo:</strong> {perfil.university.type}</p>
      </div>
    </div>
  );
}

export default Perfil;
