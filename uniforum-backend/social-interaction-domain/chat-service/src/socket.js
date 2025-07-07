const pool = require('./db');

function configureSocket(io) {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', ({ senderId, receiverId }) => {
      const room = [senderId, receiverId].sort().join('-');
      socket.join(room);
      console.log(`📥 Joined room: ${room}`);
    });

    socket.on('message', async ({ senderId, receiverId, content }) => {
      const timestamp = new Date();
      const room = [senderId, receiverId].sort().join('-');

      // Save to DB
      await pool.query(
        'INSERT INTO messages (sender_id, receiver_id, content, timestamp) VALUES ($1, $2, $3, $4)',
        [senderId, receiverId, content, timestamp]
      );

      io.to(room).emit('message', {
        senderId,
        receiverId,
        content,
        timestamp
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = configureSocket;
