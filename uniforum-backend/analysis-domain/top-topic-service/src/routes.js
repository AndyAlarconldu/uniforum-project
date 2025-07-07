import express from 'express';
import { pool } from './db.js';

const router = express.Router();

router.get('/top-tags', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.name AS tag, COUNT(pt.id_post) AS count
      FROM tag t
      JOIN post_tag pt ON t.id_tag = pt.id_tag
      GROUP BY t.name
      ORDER BY count DESC
      LIMIT 10;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al consultar top-tags:', error);
    res.status(500).json({ error: 'Error al obtener los tópicos' });
  }
});

export default router;
