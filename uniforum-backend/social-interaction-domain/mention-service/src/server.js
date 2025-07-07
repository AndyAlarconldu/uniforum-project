require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const notificationRoutes = require('./routes/notification.routes');

const app = express();
app.use(express.json());

app.use('/', notificationRoutes);

connectDB();

const PORT = process.env.PORT || 8018;
app.listen(PORT, () => {
  console.log(`🚀 Notification service running on port ${PORT}`);
});
