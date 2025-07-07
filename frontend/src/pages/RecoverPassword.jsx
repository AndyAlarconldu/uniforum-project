import React, { useState } from "react";
import axios from "axios";

function RecoverPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8002/password/recover", { email }); // Cambia IP si aplica
      alert("Correo de recuperación enviado");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error al enviar correo");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Enviar correo
        </button>
      </form>
    </div>
  );
}

export default RecoverPassword;
