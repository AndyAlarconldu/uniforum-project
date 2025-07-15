import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const COURSE_API = "http://3.211.89.67";      // Ajusta si usas otra IP/puerto
const SCHEDULE_API = "http://3.211.89.67";    // Microservicio de horarios

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    university_id: "",
  });
  const [filterUniId, setFilterUniId] = useState("");
  const [schedulesMap, setSchedulesMap] = useState({});
  const [newSchedules, setNewSchedules] = useState({});
  const [editScheduleMap, setEditScheduleMap] = useState({});

  // 🔁 Obtener cursos y sus horarios
  const fetchCourses = async () => {
    try {
      const url = filterUniId
        ? `${COURSE_API}/university/${filterUniId}`
        : `${COURSE_API}/courses`;
      const res = await fetch(url);
      const data = await res.json();
      setCourses(data);

      const schedulesData = {};
      for (const course of data) {
        const schedules = await fetchSchedulesByCourse(course.id_course);
        schedulesData[course.id_course] = schedules;
      }
      setSchedulesMap(schedulesData);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  const fetchSchedulesByCourse = async (courseId) => {
    try {
      const res = await fetch(`${SCHEDULE_API}/api/schedules/by-course?course_id=${courseId}`);
      if (!res.ok) throw new Error("Error fetching schedules");
      return await res.json();
    } catch (err) {
      console.error("Error loading schedules", err);
      return [];
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filterUniId]);

  // 📝 Nuevo curso
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
      const res = await fetch(`${COURSE_API}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (!res.ok) throw new Error("Error creating course");
      setFormData({ name: "", description: "", university_id: "" });
      fetchCourses();
    } catch (err) {
      console.error("Failed to create course", err);
    }
  };

  // 🆕 Nuevo horario
  const handleScheduleChange = (e, courseId) => {
    const { name, value } = e.target;
    setNewSchedules((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [name]: value,
      },
    }));
  };

  const handleAddSchedule = async (e, courseId) => {
    e.preventDefault();
    const schedule = newSchedules[courseId];
    if (!schedule) return;

    const body = {
      ...schedule,
      course_id: courseId,
    };

    try {
      const res = await fetch(`${SCHEDULE_API}/api/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error adding schedule");

      const newEntry = await res.json();
      setSchedulesMap((prev) => ({
        ...prev,
        [courseId]: [...(prev[courseId] || []), newEntry],
      }));
      setNewSchedules((prev) => ({
        ...prev,
        [courseId]: { day: "", start_time: "", end_time: "", type: "" },
      }));
    } catch (err) {
      console.error("Failed to add schedule", err);
    }
  };

  // ✏️ Edición de horarios
  const startEdit = (scheduleId) => {
    setEditScheduleMap((prev) => ({ ...prev, [scheduleId]: true }));
  };

  const cancelEdit = (scheduleId) => {
    setEditScheduleMap((prev) => {
      const newMap = { ...prev };
      delete newMap[scheduleId];
      return newMap;
    });
  };

  const handleEditSubmit = async (e, scheduleId, courseId) => {
    e.preventDefault();
    const form = e.target;
    const body = {
      day: form.day.value,
      start_time: form.start_time.value,
      end_time: form.end_time.value,
      type: form.type.value,
      course_id: courseId,
    };

    try {
      const res = await fetch(`${SCHEDULE_API}/api/schedules/${scheduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error updating schedule");

      const updated = await res.json();
      setSchedulesMap((prev) => ({
        ...prev,
        [courseId]: prev[courseId].map((s) => (s.id === scheduleId ? updated : s)),
      }));
      cancelEdit(scheduleId);
    } catch (err) {
      console.error("Failed to update schedule", err);
    }
  };

  const handleDeleteSchedule = async (scheduleId, courseId) => {
    try {
      const res = await fetch(`${SCHEDULE_API}/api/schedules/${scheduleId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting schedule");

      setSchedulesMap((prev) => ({
        ...prev,
        [courseId]: prev[courseId].filter((s) => s.id !== scheduleId),
      }));
    } catch (err) {
      console.error("Failed to delete schedule", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      {/* Filtro por universidad */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by University ID"
          value={filterUniId}
          onChange={(e) => setFilterUniId(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
      </div>

      {/* Formulario para nuevo curso */}
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

      {/* Lista de cursos */}
      <ul className="space-y-5">
        {Array.isArray(courses) ? (
          courses.map((course) => (
            <li key={course.id_course} className="border rounded p-4 shadow bg-white">
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-sm text-gray-500">University ID: {course.university_id}</p>

              <div className="mt-3">
                <h4 className="font-semibold">Schedules:</h4>
                <ul className="list-disc list-inside text-sm mb-2 space-y-1">
                  {(schedulesMap[course.id_course] || []).map((s) => (
                    <li key={s.id} className="flex justify-between items-center gap-2">
                      {editScheduleMap[s.id] ? (
                        <form onSubmit={(e) => handleEditSubmit(e, s.id, course.id_course)} className="flex flex-wrap gap-1 w-full">
                          <input type="text" name="day" defaultValue={s.day} required className="border px-1 py-0.5 rounded w-24" />
                          <input type="time" name="start_time" defaultValue={s.start_time} required className="border px-1 py-0.5 rounded w-24" />
                          <input type="time" name="end_time" defaultValue={s.end_time} required className="border px-1 py-0.5 rounded w-24" />
                          <input type="text" name="type" defaultValue={s.type} required className="border px-1 py-0.5 rounded w-24" />
                          <button type="submit" className="bg-green-600 text-white px-2 rounded text-sm">Save</button>
                          <button type="button" onClick={() => cancelEdit(s.id)} className="text-sm text-gray-500">Cancel</button>
                        </form>
                      ) : (
                        <>
                          <span>{s.day} – {s.start_time} to {s.end_time} ({s.type})</span>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(s.id)} className="text-blue-600 text-sm">Edit</button>
                            <button onClick={() => handleDeleteSchedule(s.id, course.id_course)} className="text-red-500 text-sm">Delete</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Formulario nuevo horario */}
                <form onSubmit={(e) => handleAddSchedule(e, course.id_course)} className="flex flex-wrap gap-2 mt-2">
                  <input
                    type="text"
                    name="day"
                    placeholder="Day"
                    required
                    value={newSchedules[course.id_course]?.day || ""}
                    onChange={(e) => handleScheduleChange(e, course.id_course)}
                    className="border px-2 py-1 rounded w-24"
                  />
                  <input
                    type="time"
                    name="start_time"
                    required
                    value={newSchedules[course.id_course]?.start_time || ""}
                    onChange={(e) => handleScheduleChange(e, course.id_course)}
                    className="border px-2 py-1 rounded w-28"
                  />
                  <input
                    type="time"
                    name="end_time"
                    required
                    value={newSchedules[course.id_course]?.end_time || ""}
                    onChange={(e) => handleScheduleChange(e, course.id_course)}
                    className="border px-2 py-1 rounded w-28"
                  />
                  <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    required
                    value={newSchedules[course.id_course]?.type || ""}
                    onChange={(e) => handleScheduleChange(e, course.id_course)}
                    className="border px-2 py-1 rounded w-28"
                  />
                  <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Add
                  </button>
                </form>
              </div>
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
