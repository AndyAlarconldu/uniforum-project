const express = require('express');
require('dotenv').config();

const deploymentRoutes = require('./routes/deployment.routes');

const app = express();
app.use(express.json());

app.use('/', deploymentRoutes);

const port = process.env.PORT || 8040;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
