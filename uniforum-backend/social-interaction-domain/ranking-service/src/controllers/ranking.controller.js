const pool = require('../db');

// Obtener top 10 por reputación
exports.getTopReputation = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_stats
      ORDER BY reputation DESC, post_count DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener top 10 por publicaciones
exports.getTopPosts = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_stats
      ORDER BY post_count DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener top 10 por likes
exports.getTopLikes = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_stats
      ORDER BY likes_received DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar stats por usuario
exports.updateStats = async (req, res) => {
  const { user_id } = req.params;
  const { post_count, reply_count, likes_received, reputation } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO user_stats (user_id, post_count, reply_count, likes_received, reputation)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id) DO UPDATE
       SET post_count = $2, reply_count = $3, likes_received = $4, reputation = $5,
           last_updated = CURRENT_TIMESTAMP
       RETURNING *`,
      [user_id, post_count, reply_count, likes_received, reputation]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
