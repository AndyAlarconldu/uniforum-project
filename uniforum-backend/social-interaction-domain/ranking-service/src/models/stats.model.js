const pool = require('../db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_stats (
      user_id UUID PRIMARY KEY,
      post_count INT DEFAULT 0,
      reply_count INT DEFAULT 0,
      likes_received INT DEFAULT 0,
      reputation INT DEFAULT 0,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { createTable };
