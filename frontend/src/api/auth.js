import axios from "axios";

const API_URL = "http://localhost:8082/auth"; // o IP real si ya está en EC2

// src/api/auth.js
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return await res.json(); // { token: "..." }
};

