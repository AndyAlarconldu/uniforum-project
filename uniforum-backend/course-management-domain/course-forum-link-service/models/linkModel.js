const pool = require("../config/db");

const createLink = async (id, course_id, forum_id) => {
  const result = await pool.query(
    "INSERT INTO course_forum_link (id_link, course_id, forum_id) VALUES ($1, $2, $3) RETURNING *",
    [id, course_id, forum_id]
  );
  return result.rows[0];
};

const getAllLinks = async () => {
  const result = await pool.query("SELECT * FROM course_forum_link");
  return result.rows;
};

module.exports = { createLink, getAllLinks };
