const db = require("../db");

exports.findAll = () => db.query("SELECT * FROM schedules");

exports.findById = (id) =>
  db.query("SELECT * FROM schedules WHERE id = $1", [id]);

exports.create = ({ day, start_time, end_time, type, course_id }) =>
  db.query(
    "INSERT INTO schedules (day, start_time, end_time, type, course_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [day, start_time, end_time, type, course_id]
  );

exports.update = (id, { day, start_time, end_time, type, course_id }) =>
  db.query(
    "UPDATE schedules SET day = $1, start_time = $2, end_time = $3, type = $4, course_id = $5 WHERE id = $6 RETURNING *",
    [day, start_time, end_time, type, course_id, id]
  );

exports.remove = (id) =>
  db.query("DELETE FROM schedules WHERE id = $1", [id]);
