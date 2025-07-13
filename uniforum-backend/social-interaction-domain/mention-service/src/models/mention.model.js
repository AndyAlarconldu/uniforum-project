const mongoose = require('mongoose');

const mentionSchema = new mongoose.Schema({
  origin_user_id: { type: String, required: true },
  mentioned_user_id: { type: String, required: true },
  target_id: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mention', mentionSchema);
