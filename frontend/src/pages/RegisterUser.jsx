import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function RegisterUser() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    universityId: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idStudent = uuidv4(); // Generamos el ID único

    const payload = {
      idStudent, // 🔑 obligatorio para el backend
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      university: {
        idUniversity: form.universityId
      }
    };

    try {
      await axios.post('http://localhost:8081/students', payload);
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" name="firstName" placeholder="Nombre" onChange={handleChange} />
        <input className="w-full border p-2" name="lastName" placeholder="Apellido" onChange={handleChange} />
        <input className="w-full border p-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="w-full border p-2" name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <input className="w-full border p-2" name="universityId" placeholder="ID Universidad" onChange={handleChange} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterUser;
