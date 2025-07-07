import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_BASE = "http://localhost:8010/enrollments";

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
  });
  const [filterStudentId, setFilterStudentId] = useState("");

  // Obtener matrículas desde la API
  const fetchEnrollments = async () => {
    try {
      const url = filterStudentId
        ? `${API_BASE}/student/${filterStudentId}`
        : `${API_BASE}/`;
      const res = await fetch(url);
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error("Error fetching enrollments", err);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [filterStudentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEnrollment = {
      id_enrollment: uuidv4(),
      ...formData,
    };
    try {
      const res = await fetch(`${API_BASE}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnrollment),
      });
      if (!res.ok) throw new Error("Error creating enrollment");
      setFormData({ student_id: "", course_id: "" });
      fetchEnrollments(); // recargar lista
    } catch (err) {
      console.error("Failed to create enrollment", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enrollments</h2>

      {/* Filtro por estudiante */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Student ID"
          value={filterStudentId}
          onChange={(e) => setFilterStudentId(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
      </div>

      {/* Formulario nueva matrícula */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="student_id"
          placeholder="Student ID"
          value={formData.student_id}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="course_id"
          placeholder="Course ID"
          value={formData.course_id}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enroll
        </button>
      </form>

      {/* Lista de matrículas */}
      <ul className="space-y-3">
        {Array.isArray(enrollments) && enrollments.length > 0 ? (
          enrollments.map((enr) => (
            <li
              key={enr.id_enrollment}
              className="border rounded p-3 shadow bg-white"
            >
              <p>
                <strong>Student ID:</strong> {enr.student_id}
              </p>
              <p>
                <strong>Course ID:</strong> {enr.course_id}
              </p>
              <p className="text-sm text-gray-500">
                Enrolled on: {new Date(enr.enrollment_date).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No enrollments found</li>
        )}
      </ul>
    </div>
  );
};

export default Enrollment;
