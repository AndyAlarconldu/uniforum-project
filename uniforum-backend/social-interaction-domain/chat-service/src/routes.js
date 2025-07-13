const express = require('express');
const router = express.Router();
const Message = require('./models/message.model');
const axios = require('axios');

const USER_SERVICE_URL = 'http://localhost:8030/students'; // Ajusta si es diferente

async function getUser(id) {
  try {
    const res = await axios.get(`${USER_SERVICE_URL}/${id}`);
    return res.data;
  } catch {
    return { first_name: "Desconocido", last_name: "" };
  }
}

// GET /messages?sender_id=...&receiver_id=...
router.get('/messages', async (req, res) => {
  const { sender_id, receiver_id } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id }
      ]
    }).sort({ timestamp: 1 });

    // Enriquecer con nombres
    const enriched = await Promise.all(
      messages.map(async msg => {
        const sender = await getUser(msg.sender_id);
        const receiver = await getUser(msg.receiver_id);
        return {
          ...msg.toObject(),
          sender_name: `${sender.first_name} ${sender.last_name}`,
          receiver_name: `${receiver.first_name} ${receiver.last_name}`
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
