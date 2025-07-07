require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const configureSocket = require('./socket');
const routes = require('./routes');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use('/api', routes);

configureSocket(io);

const PORT = process.env.PORT || 8014;
server.listen(PORT, () => {
  console.log(`🚀 Chat service running on port ${PORT}`);
});
