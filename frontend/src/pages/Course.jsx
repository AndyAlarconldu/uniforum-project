import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_BASE = "http://localhost:8009"; // ← Ajusta IP/p. si aplica

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    university_id: "",
  });
  const [filterUniId, setFilterUniId] = useState("");

  const fetchCourses = async () => {
    try {
      const url = filterUniId
        ? `${API_BASE}/university/${filterUniId}`
        : `${API_BASE}/courses`;
      const res = await fetch(url);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filterUniId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = {
      id_course: uuidv4(),
      ...formData,
    };
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (!res.ok) throw new Error("Error creating course");
      setFormData({ name: "", description: "", university_id: "" });
      fetchCourses(); // reload list
    } catch (err) {
      console.error("Failed to create course", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      {/* Filter by University */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by University ID"
          value={filterUniId}
          onChange={(e) => setFilterUniId(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
      </div>

      {/* New Course Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="university_id"
          placeholder="University ID"
          value={formData.university_id}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>

      {/* Course List */}
      <ul className="space-y-3">
        {Array.isArray(courses) ? (
  courses.map((course) => (
    <li key={course.id_course} className="border rounded p-3 shadow bg-white">
      <h3 className="text-lg font-semibold">{course.name}</h3>
      <p className="text-gray-700">{course.description}</p>
      <p className="text-sm text-gray-500">
        University ID: {course.university_id}
      </p>
    </li>
  ))
) : (
  <p className="text-red-500">Error loading courses</p>
)}
      </ul>
    </div>
  );
};

export default Course;
