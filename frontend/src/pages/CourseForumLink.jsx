// src/pages/CourseForumLink.jsx
import React, { useState } from "react";
import { useCourseForumLinks } from "../hooks/useCourseForumLinks";
import { v4 as uuidv4 } from "uuid";

const CourseForumLink = () => {
  const { links, loading, addLink } = useCourseForumLinks();
  const [courseId, setCourseId] = useState("");
  const [forumId, setForumId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLink = {
      id_link: uuidv4(),
      course_id: courseId,
      forum_id: forumId,
    };
    addLink(newLink);
    setCourseId("");
    setForumId("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Course-Forum Link Manager</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Forum ID"
          value={forumId}
          onChange={(e) => setForumId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Link
        </button>
      </form>

      {loading ? (
        <p>Cargando enlaces...</p>
      ) : (
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.id_link}>
              📘 <b>{link.course_id}</b> 🔗 <b>{link.forum_id}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseForumLink;
