import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Discussion from "./pages/Discussion";
import Reply from './pages/Reply';
import Moderation from "./pages/Moderation";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow px-4 py-2 flex gap-4">
          <Link to="/" className="text-blue-600 font-semibold">Home</Link>
          <Link to="/discussion" className="text-blue-600 font-semibold">Academic Forum</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div className="p-4 text-center text-lg">Welcome to UniForum</div>} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/post/:postId/replies" element={<Reply />} />
          <Route path="/moderation" element={<Moderation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
