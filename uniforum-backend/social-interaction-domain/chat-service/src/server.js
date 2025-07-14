require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');
const chatRoutes = require('./routes');

const app = express();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rutas
app.use('/', chatRoutes);

// HTTP + WebSocket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// WebSocket handlers
require('./socket')(io);

// Conexión a la base de datos
connectDB();

// Iniciar servidor
const PORT = process.env.PORT || 8014;
server.listen(PORT, () => {
  console.log(`✅ Chat service running on port ${PORT}`);
});
