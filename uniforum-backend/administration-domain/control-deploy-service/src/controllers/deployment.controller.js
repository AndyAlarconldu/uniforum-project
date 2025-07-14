const pool = require('../db');

exports.getDeployments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM deployments ORDER BY deployed_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching deployments:', error);
    res.status(500).json({ error: 'Error fetching deployments' });
  }
};

exports.createDeployment = async (req, res) => {
  const { version, deployed_by, status, description } = req.body;

  if (!version || !deployed_by || !status) {
    return res.status(400).json({ error: 'version, deployed_by and status are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO deployments (version, deployed_by, status, description)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [version, deployed_by, status, description || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating deployment:', error);
    res.status(500).json({ error: 'Error creating deployment' });
  }
};
