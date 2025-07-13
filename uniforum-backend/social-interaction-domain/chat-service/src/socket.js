const Message = require('./models/message.model');
const redis = require('redis');

// Cliente Redis
const redisClient = redis.createClient({
  url: 'redis://host.docker.internal:6379'
});

redisClient.connect()
  .then(() => console.log("Redis connected"))
  .catch(err => console.error("Redis connection error:", err));

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const userId = socket.handshake.query.user_id;
    console.log(`Client connected: ${userId}`);

    if (userId) {
      await redisClient.sAdd("online_users", userId);
      await redisClient.set(`socket:${userId}`, socket.id);
    }

    socket.on('send_message', async (data) => {
      const { sender_id, receiver_id, text } = data;

      // 1. Guardar en MongoDB
      const newMsg = new Message({ sender_id, receiver_id, text });
      await newMsg.save();

      // 2. Guardar en Redis cache (opcional)
      await redisClient.lPush(`chat:${sender_id}:${receiver_id}`, JSON.stringify(newMsg));

      // 3. Enviar solo al receptor si está online
      const receiverSocketId = await redisClient.get(`socket:${receiver_id}`);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_message', newMsg);
      }

      // 4. Emitir también al que envió (para actualizar vista)
      socket.emit('receive_message', newMsg);
    });

    socket.on('disconnect', async () => {
      console.log(`Client disconnected: ${userId}`);
      if (userId) {
        await redisClient.sRem("online_users", userId);
        await redisClient.del(`socket:${userId}`);
      }
    });
  });
};
