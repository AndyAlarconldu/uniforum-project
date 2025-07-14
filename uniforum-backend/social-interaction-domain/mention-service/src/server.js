require('dotenv').config();
const express = require('express');
const mentionRoutes = require('./routes/mention.routes');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

connectDB();
app.use('/', mentionRoutes);

const PORT = process.env.PORT || 8018;
app.listen(PORT, () => {
  console.log(`🚀 Mention service running on port ${PORT}`);
});
