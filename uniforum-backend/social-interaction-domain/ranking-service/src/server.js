require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const routes = require('./routes/ranking.routes');
const { createTable } = require('./models/stats.model');

app.use(express.json());
app.use('/', routes);

createTable().then(() => {
  const PORT = process.env.PORT || 8019;
  app.listen(PORT, () => console.log(`🏆 Ranking service running on port ${PORT}`));
});
