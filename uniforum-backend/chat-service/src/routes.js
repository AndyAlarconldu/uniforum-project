const express = require('express');
const pool = require('./db');
const router = express.Router();

router.get('/messages/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  const result = await pool.query(`
    SELECT * FROM messages 
    WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY timestamp ASC
  `, [user1, user2]);

  res.json(result.rows);
});

module.exports = router;
