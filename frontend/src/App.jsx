import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Discussion from "./pages/Discussion";
import Reply from './pages/Reply';
import Moderation from "./pages/Moderation";
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import { useAuth } from "./context/AuthContext";
import Perfil from "./pages/Perfil";
import RecoverPassword from "./pages/RecoverPassword";
import History from "./pages/History";
import Course from "./pages/Course";
import Enrollment from './pages/Enrollment';
function App() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // Redirige al login tras cerrar sesión
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow px-4 py-2 flex gap-4 items-center">
          <Link to="/" className="text-blue-600 font-semibold">Home</Link>
          <Link to="/discussion" className="text-blue-600 font-semibold">Academic Forum</Link>
          <Link to="/recover" className="text-blue-600 font-semibold">Recuperar contraseña</Link>
          <Link to="/courses" className="text-blue-600 font-semibold">
  Courses
</Link>
<Link to="/enrollments" className="text-blue-600 hover:underline">Enrollments</Link>
          {user && (
  <Link to="/perfil" className="text-blue-600 font-semibold">Mi Perfil</Link>
  
)}

          {user ? (
            <>
              <span className="ml-auto text-gray-600">Bienvenido, {user.sub || user.email || "Usuario"}</span>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="ml-auto text-blue-600 font-semibold">Register</Link>
              <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<div className="p-4 text-center text-lg">Welcome to UniForum</div>} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover" element={<RecoverPassword />} />
          {/* Rutas protegidas */}
          <Route path="/discussion" element={
            <PrivateRoute>
              <Discussion />
            </PrivateRoute>
          } />
          <Route path="/post/:postId/replies" element={
            <PrivateRoute>
              <Reply />
            </PrivateRoute>
          } />
          <Route path="/moderation" element={
            <PrivateRoute>
              <Moderation />
            </PrivateRoute>
          } />
          <Route path="/perfil" element={
          <PrivateRoute>
             <Perfil />
          </PrivateRoute>
          } />
          <Route path="/post/:postId/history" element={
  <PrivateRoute>
    <History />
  </PrivateRoute>
} />
<Route path="/courses" element={
  <PrivateRoute>
    <Course />
  </PrivateRoute>
} />
<Route path="/enrollments" element={<PrivateRoute><Enrollment /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
