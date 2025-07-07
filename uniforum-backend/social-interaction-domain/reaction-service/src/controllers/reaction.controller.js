const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.createOrUpdateReaction = async (req, res) => {
  const { user_id, target_id, target_type, reaction } = req.body;

  try {
    const check = await pool.query(
      `SELECT * FROM reactions WHERE user_id = $1 AND target_id = $2 AND target_type = $3`,
      [user_id, target_id, target_type]
    );

    if (check.rows.length > 0) {
      const updated = await pool.query(
        `UPDATE reactions SET reaction = $1 WHERE user_id = $2 AND target_id = $3 AND target_type = $4 RETURNING *`,
        [reaction, user_id, target_id, target_type]
      );
      return res.json(updated.rows[0]);
    }

    const result = await pool.query(
      `INSERT INTO reactions (id, user_id, target_id, target_type, reaction, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [uuidv4(), user_id, target_id, target_type, reaction]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReaction = async (req, res) => {
  const { user_id, target_id } = req.query;

  try {
    await pool.query(
      `DELETE FROM reactions WHERE user_id = $1 AND target_id = $2`,
      [user_id, target_id]
    );
    res.json({ message: 'Reaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  const { target_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT reaction, COUNT(*) as count FROM reactions WHERE target_id = $1 GROUP BY reaction`,
      [target_id]
    );

    const summary = {};
    result.rows.forEach(r => {
      summary[r.reaction] = parseInt(r.count);
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
