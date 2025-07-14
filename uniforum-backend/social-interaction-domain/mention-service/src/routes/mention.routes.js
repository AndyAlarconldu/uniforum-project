const express = require('express');
const router = express.Router();
const mentionController = require('../controllers/mention.controller');
const Mention = require('../models/mention.model');

// Obtener menciones de un usuario
router.get('/mentions/:user_id', async (req, res) => {
  try {
    const mentions = await Mention.find({ mentioned_user_id: req.params.user_id }).sort({ timestamp: -1 });
    res.json(mentions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manejar menciones nuevas (y notificar)
router.post('/mentions', mentionController.handleMentions); // ✅ CORREGIDO

module.exports = router;
