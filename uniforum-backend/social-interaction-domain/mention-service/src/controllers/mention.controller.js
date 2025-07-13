const axios = require('axios');
const Mention = require('../models/mention.model');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8030/students';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8001';

exports.handleMentions = async (req, res) => {
  const { origin_user_id, text, target_id } = req.body;

  if (!origin_user_id || !text || !target_id) {
    return res.status(400).json({ error: 'origin_user_id, text y target_id son requeridos.' });
  }

  try {
    // 1. Obtener todos los usuarios
    const userRes = await axios.get(USER_SERVICE_URL);
    const students = userRes.data;

    // 2. Buscar menciones del tipo @nombreapellido
    const mentionRegex = /@([a-zA-Z0-9._]+)/g;
    const mentioned = new Set();
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      const username = match[1].toLowerCase();
      const user = students.find(
        u =>
          `${u.first_name.toLowerCase()}${u.last_name.toLowerCase()}` === username
      );
      if (user) mentioned.add(user.id_student);
    }

    // 3. Enviar notificaciones por cada mención
    const promises = [...mentioned].map(recipient => {
      return axios.post(`${NOTIFICATION_SERVICE_URL}/notifications`, {
        recipient,
        subject: "mention",
        message: `You were mentioned in a post`
      });
    });

    await Promise.all(promises);

    // 4. Guardar las menciones en MongoDB
    for (const mentioned_user_id of mentioned) {
      await Mention.create({
        origin_user_id,
        mentioned_user_id,
        target_id,
        text
      });
    }

    res.status(201).json({
      mentioned: [...mentioned],
      message: 'Mentions processed, notifications sent, and stored in MongoDB.'
    });

  } catch (err) {
    console.error("❌ Error handling mentions:", err.message);
    res.status(500).json({ error: 'Error processing mentions' });
  }
};
